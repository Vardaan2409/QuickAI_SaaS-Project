import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import FormData from "form-data";
import fs from "fs";
import pdf from "pdf-parse/lib/pdf-parse.js";

import { callGrok } from "../utils/grok.js";
import { debugLog } from "../utils/logger.js";

// 🔹 Generate Article
export const generateArticle = async (req, res) => {
    debugLog("ARTICLE", "generateArticle triggered", { body: req.body });

    try {
        const authData = typeof req.auth === "function" ? await req.auth() : req.auth;
        const { userId } = authData;
        debugLog("ARTICLE", "Auth data resolved", { userId });

        const { prompt } = req.body;
        const plan = req.plan || 'free';
        const free_usage = req.free_usage || 0;
        
        debugLog("ARTICLE", "Request data", { plan, free_usage, promptLength: prompt?.length });

        if (!prompt) {
            return res.status(400).json({ success: false, message: "Prompt is required" });
        }

        if (plan !== "premium" && free_usage >= 10) {
            return res.status(403).json({ success: false, message: "Limit reached" });
        }

        const content = await callGrok(prompt, {
            temperature: 0.7,
            max_tokens: 2000,
        });
        
        debugLog("ARTICLE", "AI response received", { contentLength: content?.length });

        if (!content) {
            debugLog("ARTICLE", "AI Call returned NULL content");
            return res.status(500).json({ success: false, message: "AI failed" });
        }

        await sql`
        INSERT INTO creations (user_id, prompt, content, type)
        VALUES (${userId}, ${prompt}, ${content}, 'article')
        `;

        if (plan !== "premium") {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: { free_usage: free_usage + 1 },
            });
        }

        res.status(200).json({ success: true, content });

    } catch (error) {
        console.error("Article Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// 🔹 Generate Blog Title
export const generateBlogTitle = async (req, res) => {
    try {
        const { userId } = typeof req.auth === "function" ? await req.auth() : req.auth;
        const { prompt } = req.body;
        const plan = req.plan || 'free';
        const free_usage = req.free_usage || 0;

        if (!prompt) {
            return res.status(400).json({ success: false, message: "Prompt is required" });
        }

        if (plan !== "premium" && free_usage >= 10) {
            return res.status(403).json({ success: false, message: "Limit reached" });
        }

        const content = await callGrok(prompt, {
            temperature: 0.7,
            max_tokens: 200,
        });

        if (!content) {
            return res.status(500).json({ success: false, message: "AI failed" });
        }

        await sql`
        INSERT INTO creations (user_id, prompt, content, type)
        VALUES (${userId}, ${prompt}, ${content}, 'blog-title')
        `;

        if (plan !== "premium") {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: { free_usage: free_usage + 1 },
            });
        }

        res.status(200).json({ success: true, content });

    } catch (error) {
        console.error("Blog Title Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// 🔹 Generate Image (Clipdrop)
export const generateImage = async (req, res) => {
    try {
        const { userId } = typeof req.auth === "function" ? await req.auth() : req.auth;
        const { prompt, publish } = req.body;
        const plan = req.plan || 'free';

        if (!prompt) {
            return res.status(400).json({ success: false, message: "Prompt is required" });
        }

        if (plan !== "premium") {
            return res.status(403).json({ success: false, message: "Premium only" });
        }

        const formData = new FormData();
        formData.append("prompt", prompt);

        const { data } = await axios.post(
            "https://clipdrop-api.co/text-to-image/v1",
            formData,
            {
                headers: { "x-api-key": process.env.CLIPDROP_API_KEY },
                responseType: "arraybuffer",
            }
        );

        const base64Image = `data:image/png;base64,${Buffer.from(data).toString("base64")}`;
        const { secure_url } = await cloudinary.uploader.upload(base64Image);

        await sql`
        INSERT INTO creations (user_id, prompt, content, type, publish)
        VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false})
        `;

        res.status(200).json({ success: true, content: secure_url });

    } catch (error) {
        console.error("Image Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// 🔹 Remove Background
export const removeImageBackground = async (req, res) => {
    try {
        const { userId } = typeof req.auth === "function" ? await req.auth() : req.auth;
        const image = req.file;
        const plan = req.plan || 'free';

        if (plan !== "premium") {
            return res.status(403).json({
                success: false,
                message: "This feature is only available for premium subscription"
            });
        }

        const { secure_url } = await cloudinary.uploader.upload(image.path, {
            transformation: [{ effect: "background_removal" }],
        });

        await sql`
        INSERT INTO creations (user_id, prompt, content, type)
        VALUES (${userId}, 'Remove background', ${secure_url}, 'image')
        `;

        res.status(200).json({ success: true, content: secure_url });

    } catch (error) {
        console.error("BG Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// 🔹 Remove Object
export const removeImageObject = async (req, res) => {
    try {
        const {userId} = typeof req.auth === 'function' ? await req.auth() : req.auth;
        const { object } = req.body;
        const image = req.file;
        const plan = req.plan || 'free';

        if (plan !== "premium") {
            return res.status(403).json({
                success: false,
                message: "This feature is only available for premium subscription"
            });
        }

        const { public_id } = await cloudinary.uploader.upload(image.path);

        const image_url = cloudinary.url(public_id, {
            transformation: [{ effect: `gen_remove:${object}` }],
        });

        await sql`
        INSERT INTO creations (user_id, prompt, content, type)
        VALUES (${userId}, ${`Remove ${object}`}, ${image_url}, 'image')
        `;

        res.status(200).json({ success: true, content: image_url });

    } catch (error) {
        console.error("Object Remove Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// 🔹 Resume Review
export const resumeReview = async (req, res) => {
    try {
        const { userId } = typeof req.auth === "function" ? await req.auth() : req.auth;
        const resume = req.file;

        const dataBuffer = fs.readFileSync(resume.path);
        const pdfData = await pdf(dataBuffer);

        const prompt = `Review this resume:\n${pdfData.text}`;

        const content = await callGrok(prompt, {
            temperature: 0.7,
            max_tokens: 2000,
        });

        if (!content) {
            return res.status(500).json({ success: false, message: "AI failed" });
        }

        await sql`
        INSERT INTO creations (user_id, prompt, content, type)
        VALUES (${userId}, 'Resume Review', ${content}, 'resume-review')
        `;

        res.status(200).json({ success: true, content });

    } catch (error) {
        console.error("Groq Resume Review Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
};
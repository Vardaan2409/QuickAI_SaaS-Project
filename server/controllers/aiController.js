import { GoogleGenerativeAI } from "@google/generative-ai";
import sql from "../configs/db.js";
import { clerkClient } from "@clerk/express";
import axios from "axios";
import { v2 as cloudinary } from "cloudinary";
import FormData from 'form-data';
import fs from "fs";
import pdf from "pdf-parse/lib/pdf-parse.js";

// Instantiate Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

//Generate Article
export const generateArticle = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { prompt, length } = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        if (!prompt) {
            return res.status(400).json({
                success: false,
                message: "Prompt is required",
            });
        }

        if (plan !== "premium" && free_usage >= 10) {
            return res.status(403).json({
                success: false,
                message: "Limit reached. Upgrade to continue.",
            });
        }

        // Use Gemini model
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash", generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1000,
            },
        });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const content = response.text();

        if (!content) {
            return res.status(500).json({
                success: false,
                message: "AI did not return any content. Try again.",
            });
        }

        // Save in DB
        await sql`
        INSERT INTO creations (user_id, prompt, content, type)
        VALUES (${userId}, ${prompt}, ${content}, 'article')
    `;

        // Track usage
        if (plan !== "premium") {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1,
                },
            });
        }

        res.status(200).json({ success: true, content });

    } catch (error) {
        console.error("Gemini Error:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
};

//Generate Blog Title
export const generateBlogTitle = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { prompt } = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;

        if (!prompt) {
            return res.status(400).json({
                success: false,
                message: "Prompt is required",
            });
        }

        if (plan !== "premium" && free_usage >= 10) {
            return res.status(403).json({
                success: false,
                message: "Limit reached. Upgrade to continue.",
            });
        }

        // Use Gemini model
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash", generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 100,
            },
        });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const content = response.text();

        if (!content) {
            return res.status(500).json({
                success: false,
                message: "AI did not return any content. Try again.",
            });
        }

        // Save in DB
        await sql`
        INSERT INTO creations (user_id, prompt, content, type)
        VALUES (${userId}, ${prompt}, ${content}, 'blog-title')
    `;

        // Track usage
        if (plan !== "premium") {
            await clerkClient.users.updateUserMetadata(userId, {
                privateMetadata: {
                    free_usage: free_usage + 1,
                },
            });
        }

        res.status(200).json({ success: true, content });

    } catch (error) {
        console.error("Gemini Error:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
};

//Generate Image
export const generateImage = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { prompt, publish } = req.body;
        const plan = req.plan;

        if (!prompt) {
            return res.status(400).json({
                success: false,
                message: "Prompt is required",
            });
        }

        if (plan !== "premium") {
            return res.status(403).json({
                success: false,
                message: "This feature is only available for premium subscription"
            });
        }

        // Use Clipdrop
        const formData = new FormData()
        formData.append('prompt', prompt)
        const { data } = await axios.post("https://clipdrop-api.co/text-to-image/v1", formData, {
            headers: { 'x-api-key': process.env.CLIPDROP_API_KEY, },
            responseType: "arraybuffer",
        })

        const base64Image = `data:image/png;base64,${Buffer.from(data, 'binary').
            toString('base64')}`;

        const { secure_url } = await cloudinary.uploader.upload(base64Image);

        // Save in DB
        await sql`
        INSERT INTO creations (user_id, prompt, content, type, publish)
        VALUES (${userId}, ${prompt}, ${secure_url}, 'image', ${publish ?? false})
    `;

        res.status(200).json({ success: true, content: secure_url });

    } catch (error) {
        console.error("Gemini Error:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
};

//Image Background Remover
export const removeImageBackground = async (req, res) => {
    try {
        const { userId } = req.auth();
        const image = req.file;
        const plan = req.plan;

        if (plan !== "premium") {
            return res.status(403).json({
                success: false,
                message: "This feature is only available for premium subscription"
            });
        }

        const { secure_url } = await cloudinary.uploader.upload(image.path, {
            transformation: [
                {
                    effect: 'background_removal',
                    background_removal: 'remove_the_background'
                }
            ]
        });

        // Save in DB
        await sql`
        INSERT INTO creations (user_id, prompt, content, type)
        VALUES (${userId}, 'Remove background from image', ${secure_url}, 'image')
    `;

        res.status(200).json({ success: true, content: secure_url });

    } catch (error) {
        console.error("Gemini Error:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
};

//Object Remover
export const removeImageObject = async (req, res) => {
    try {
        const { userId } = req.auth();
        const { object } = req.body;
        const image = req.file;
        const plan = req.plan;

        if (plan !== "premium") {
            return res.status(403).json({
                success: false,
                message: "This feature is only available for premium subscription"
            });
        }

        const { public_id } = await cloudinary.uploader.upload(image.path);

        // const image_url = cloudinary.url(public_id, {
        //     transformation: [{ effect: `gen_remove: ${object}` }],
        //     resource_type: 'image'
        // })
        const image_url = cloudinary.url(public_id, {
            transformation: [
                { effect: `gen_remove:${object}` },
                { width: 800, crop: "scale" }
            ],
            resource_type: "image"
        });

        // Save in DB
        await sql`
        INSERT INTO creations (user_id, prompt, content, type)
        VALUES (${userId}, ${`Remove ${object} from image`}, ${image_url}, 'image')
    `;

        res.status(200).json({ success: true, content: image_url });

    } catch (error) {
        console.error("Gemini Error:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
};

//Resume Review
export const resumeReview = async (req, res) => {
    try {
        const { userId } = req.auth();
        const resume = req.file;
        const plan = req.plan;

        if (plan !== "premium") {
            return res.status(403).json({
                success: false,
                message: "This feature is only available for premium subscription"
            });
        }

        if (resume.size > 5 * 1024 * 1024) {
            return res.json({ success: false, message: "Resume file size exceeds allowed size (5MB)." })
        }

        const dataBuffer = fs.readFileSync(resume.path);
        const pdfData = await pdf(dataBuffer);

        const prompt = `Review the following resume and provide constructive feedback 
        on its strengths, weaknesses, and areas for improvement. Resume 
        Content:\n\n${pdfData.text}`

        // Use Gemini model
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash", generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 1000,
            },
        });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const content = response.text();

        if (!content) {
            return res.status(500).json({
                success: false,
                message: "AI did not return any content. Try again.",
            });
        }

        // Save in DB
        await sql`
        INSERT INTO creations (user_id, prompt, content, type)
        VALUES (${userId}, Review the uploaded resume, ${content}, 'resume-review')
    `;

        res.status(200).json({ success: true, content });

    } catch (error) {
        console.error("Gemini Error:", error.message);
        res.status(500).json({
            success: false,
            message: "Internal server error: " + error.message,
        });
    }
};

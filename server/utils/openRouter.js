import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

/**
 * Sends a request to OpenRouter API.
 * @param {string} prompt - The user prompt.
 * @param {Object} options - Additional options for the API call.
 * @returns {Promise<string>} - The AI generated content.
 */
export const callOpenRouter = async (prompt, options = {}) => {
    try {
        const apiKey = process.env.OPENROUTER_API_KEY;
        const model = process.env.OPENROUTER_MODEL || "google/gemini-2.0-flash-001";

        if (!apiKey) {
            throw new Error("OPENROUTER_API_KEY is missing in .env file");
        }

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: model,
                messages: [
                    {
                        role: "user",
                        content: prompt,
                    },
                ],
                ...options,
            },
            {
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                    "HTTP-Referer": "http://localhost:3000", // Optional: your site URL
                    "X-Title": "QuickAI SaaS", // Optional: your site name
                },
            }
        );

        if (response.data && response.data.choices && response.data.choices.length > 0) {
            return response.data.choices[0].message.content;
        } else {
            throw new Error("Invalid response from OpenRouter API");
        }
    } catch (error) {
        console.error("OpenRouter API Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.error?.message || error.message);
    }
};

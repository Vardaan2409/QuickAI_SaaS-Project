import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

/**
 * Sends a request to xAI's Grok API (OpenAI compatible).
 * If an OpenRouter key is detected, it automatically routes through OpenRouter.
 * 
 * @param {string} prompt - The user prompt.
 * @param {Object} options - Additional options for the API call.
 * @returns {Promise<string>} - The AI generated content.
 */
export const callGrok = async (prompt, options = {}) => {
    try {
        const apiKey = process.env.XAI_API_KEY;
        const model = process.env.AI_MODEL || "x-ai/grok-4";

        if (!apiKey) {
            console.error("XAI_API_KEY is missing in .env file");
            return null;
        }

        // Detect if it's an OpenRouter key or a native xAI key
        const isOpenRouter = apiKey.startsWith("sk-or-v1-");
        const baseURL = isOpenRouter 
            ? "https://openrouter.ai/api/v1" 
            : "https://api.x.ai/v1";

        console.log(`>>> Calling Grok API (${isOpenRouter ? 'via OpenRouter' : 'Native'}) with model: ${model}`);

        const client = new OpenAI({
            apiKey: apiKey,
            baseURL: baseURL,
        });

        const response = await client.chat.completions.create({
            model: model,
            messages: [
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: options.temperature || 0.7,
            max_tokens: options.max_tokens || 2000,
            ...options,
        });

        if (response.choices && response.choices.length > 0) {
            return response.choices[0].message.content;
        } else {
            console.error("Invalid response from Grok API");
            return null;
        }
    } catch (error) {
        console.error("Grok API Error:", error.response?.data || error.message);
        return null;
    }
};

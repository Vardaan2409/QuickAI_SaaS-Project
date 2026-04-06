import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

/**
 * Sends a request to Groq API (OpenAI compatible).
 * @param {string} prompt - The user prompt.
 * @param {Object} options - Additional options for the API call.
 * @returns {Promise<string>} - The AI generated content.
 */
export const callGroq = async (prompt, options = {}) => {
    try {
        const apiKey = process.env.GROQ_API_KEY;
        const model = process.env.GROQ_MODEL || "llama-3.3-70b-versatile";

        if (!apiKey) {
            console.error("GROQ_API_KEY is missing in .env file");
            return null;
        }

        console.log(`>>> Calling Groq API with model: ${model}`);

        const response = await axios.post(
            "https://api.groq.com/openai/v1/chat/completions",
            {
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
            },
            {
                headers: {
                    "Authorization": `Bearer ${apiKey}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (response.data && response.data.choices && response.data.choices.length > 0) {
            return response.data.choices[0].message.content;
        } else {
            console.error("Invalid response from Groq API");
            return null;
        }
    } catch (error) {
        console.error("Groq API Error:", error.response?.data || error.message);
        return null;
    }
};

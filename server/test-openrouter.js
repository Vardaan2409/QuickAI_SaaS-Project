import { callOpenRouter } from "./utils/openRouter.js";

const testOpenRouter = async () => {
    try {
        console.log("Testing OpenRouter API...");
        const prompt = "Say 'Hello from OpenRouter!'";
        const response = await callOpenRouter(prompt);
        console.log("Response:", response);
    } catch (error) {
        console.error("Test failed:", error.message);
    }
};

testOpenRouter();

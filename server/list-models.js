import { GoogleGenerativeAI } from "@google/generative-ai";
import "dotenv/config";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function listModels() {
    try {
        console.log("Listing models...");
        // Note: listModels is not on the genAI object directly in some versions, 
        // it might need an authenticated client or a different approach if using the SDK.
        // Actually, the SDK doesn't always have listModels easily accessible without a project.
        // But let's try a different common model name.
        
        const models = ["gemini-1.5-flash", "gemini-1.5-flash-latest", "gemini-1.5-pro", "gemini-pro"];
        for (const m of models) {
            try {
                console.log(`Testing model: ${m}`);
                const model = genAI.getGenerativeModel({ model: m });
                const result = await model.generateContent("Hi");
                const response = await result.response;
                console.log(`Model ${m} works!`);
                break;
            } catch (e) {
                console.log(`Model ${m} failed: ${e.message}`);
            }
        }
    } catch (error) {
        console.error("Error:", error);
    }
}

listModels();

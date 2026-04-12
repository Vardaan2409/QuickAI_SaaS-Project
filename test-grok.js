import { callGrok } from "./server/utils/grok.js";
import dotenv from "dotenv";

dotenv.config({ path: "./server/.env" });

const testGrok = async () => {
    console.log("Testing Grok Integration...");
    console.log("XAI_API_KEY present:", !!process.env.XAI_API_KEY);
    
    const prompt = "Say 'Grok is ready' if you can hear me.";
    
    try {
        const result = await callGrok(prompt);
        if (result) {
            console.log("SUCCESS! Response from Grok:", result);
        } else {
            console.log("FAILED! No response from Grok.");
        }
    } catch (error) {
        console.error("ERROR during test:", error.message);
    }
};

testGrok();

import { callOpenRouter } from "./utils/openRouter.js";
import sql from "./configs/db.js";
import dotenv from "dotenv";

dotenv.config();

const testFullFlow = async () => {
    try {
        console.log("1. Testing OpenRouter...");
        const content = await callOpenRouter("Write a short sentence about testing.");
        console.log("OpenRouter Content:", content);

        console.log("\n2. Testing Database Insertion...");
        const userId = "test_user_123";
        const prompt = "Test prompt";
        const type = "article";

        await sql`
            INSERT INTO creations (user_id, prompt, content, type)
            VALUES (${userId}, ${prompt}, ${content}, ${type})
        `;
        console.log("Database insertion successful!");

        const result = await sql`SELECT * FROM creations WHERE user_id = ${userId} ORDER BY created_at DESC LIMIT 1`;
        console.log("Inserted row:", result[0]);

    } catch (error) {
        console.error("Diagnostic failed:", error);
    } finally {
        process.exit();
    }
};

testFullFlow();

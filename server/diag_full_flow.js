import { callGrok } from './utils/grok.js';
import dotenv from 'dotenv';
import { neon } from '@neondatabase/serverless';

dotenv.config();

const runFullTest = async () => {
    console.log("Starting Full Flow Test...");
    
    // 1. Check Env
    console.log("XAI_API_KEY present:", !!process.env.XAI_API_KEY);
    console.log("DATABASE_URL present:", !!process.env.DATABASE_URL);
    
    if (!process.env.DATABASE_URL) {
        console.error("CRITICAL: DATABASE_URL is missing!");
        return;
    }

    const sql = neon(process.env.DATABASE_URL);

    try {
        // 2. Test AI
        console.log("Testing AI Call...");
        const content = await callGrok("Say 'Integration Test Success'");
        if (!content) {
            console.error("AI Call FAILED!");
        } else {
            console.log("AI Call SUCCESS:", content);
            
            // 3. Test DB Insert (Mock user)
            console.log("Testing DB Insert...");
            const mockUserId = "test_user_123";
            await sql`INSERT INTO creations (user_id, prompt, content, type) VALUES (${mockUserId}, 'Test Prompt', ${content}, 'article')`;
            console.log("DB Insert SUCCESS!");
            
            // Cleanup
            await sql`DELETE FROM creations WHERE user_id = ${mockUserId}`;
            console.log("Cleanup SUCCESS!");
        }
    } catch (e) {
        console.error("FLOW FAILED:", e.message);
        if (e.response) console.error("Response data:", e.response.data);
    }
};

runFullTest();

import dotenv from 'dotenv';
import { resolve } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const result = dotenv.config({ path: resolve(__dirname, '.env') });
console.log("Dotenv result:", result.parsed ? "Success" : "Failed");
console.log("Keys found:", result.parsed ? Object.keys(result.parsed) : "None");

if (result.error) {
    console.error("Dotenv Error:", result.error);
}

import sql from './configs/db.js';

async function checkDB() {
    try {
        console.log("Checking database connection...");
        const tables = await sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`;
        console.log("Tables in database:", tables.map(t => t.table_name));
    } catch (error) {
        console.error("Database Error:", error);
    } finally {
        process.exit();
    }
}

checkDB();

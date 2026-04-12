import { neon } from "@neondatabase/serverless";
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '.env') });

const url = process.env.DATABASE_URL;
console.log("DATABASE_URL found:", url ? "YES (starts with " + url.substring(0, 10) + ")" : "NO");

if (!url) {
    process.exit(1);
}

const sql = neon(url);

async function run() {
    try {
        const tables = await sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`;
        console.log("Tables:", tables.map(t => t.table_name));

        const tableName = 'creations';
        if (tables.some(t => t.table_name === tableName)) {
            const countRes = await sql`SELECT COUNT(*) as count FROM creations`;
            const count = countRes[0].count;
            console.log(`Table '${tableName}' has ${count} rows.`);
        } else {
            console.log(`Table '${tableName}' does not exist.`);
        }
    } catch (e) {
        console.error("Query Error:", e);
    } finally {
        process.exit();
    }
}

run();

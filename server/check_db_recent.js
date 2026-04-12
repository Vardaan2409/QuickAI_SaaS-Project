import { neon } from '@neondatabase/serverless';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: resolve(__dirname, '.env') });

async function check() {
    try {
        const sql = neon(process.env.DATABASE_URL);
        const results = await sql`SELECT id, type, created_at FROM creations ORDER BY created_at DESC LIMIT 5`;
        console.log("Recent Creations:");
        console.log(JSON.stringify(results, null, 2));
    } catch (err) {
        console.error("DB Check Failed:", err.message);
    }
}

check();

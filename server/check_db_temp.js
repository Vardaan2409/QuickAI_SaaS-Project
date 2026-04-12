import sql from './configs/db.js';
import 'dotenv/config';

async function checkDB() {
    try {
        console.log("Checking database connection...");
        const tables = await sql`SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'`;
        console.log("Tables in database:", tables.map(t => t.table_name));

        const tableName = 'creations';
        if (tables.some(t => t.table_name === tableName)) {
            const count = await sql`SELECT COUNT(*) as count FROM creations`;
            console.log(`Total rows in '${tableName}' table:`, count[0].count);
        } else {
            console.log(`Table '${tableName}' does NOT exist!`);
        }
    } catch (error) {
        console.error("Database Error:", error);
    } finally {
        process.exit();
    }
}

checkDB();

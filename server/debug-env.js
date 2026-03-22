import "dotenv/config";
import fs from "fs";

console.log("--- .env File Content (Raw) ---");
try {
    const rawContent = fs.readFileSync(".env", "utf8");
    console.log(rawContent);
} catch (err) {
    console.log("Error reading .env:", err.message);
}

console.log("\n--- process.env Search ---");
const openRouterKeys = Object.keys(process.env).filter(key => key.includes("OPENROUTER"));
if (openRouterKeys.length === 0) {
    console.log("No keys found containing 'OPENROUTER'");
} else {
    openRouterKeys.forEach(key => {
        console.log(`${key}: ${process.env[key] ? (key.includes("KEY") ? "MASKED_VALUE" : process.env[key]) : "UNDEFINED"}`);
    });
}

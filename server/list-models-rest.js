import axios from 'axios';
import "dotenv/config";

const key = process.env.GEMINI_API_KEY;

async function listModels() {
    try {
        console.log("Fetching models via REST...");
        const response = await axios.get(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
        console.log("Authorized models:");
        response.data.models.forEach(m => console.log(`- ${m.name}`));
    } catch (error) {
        console.error("REST Error:", error.response ? error.response.status : error.message);
        if (error.response && error.response.data) {
            console.error("Details:", JSON.stringify(error.response.data, null, 2));
        }
    }
}

listModels();

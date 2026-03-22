import axios from 'axios';
import "dotenv/config";

const key = process.env.GEMINI_API_KEY;

async function listModels() {
    try {
        console.log("Fetching models via REST...");
        const response = await axios.get(`https://generativelanguage.googleapis.com/v1beta/models?key=${key}`);
        console.log("Full model list:");
        response.data.models.forEach(m => {
            console.log(`- ${m.name} (${m.displayName})`);
            console.log(`  Supported actions: ${m.supportedGenerationMethods.join(', ')}`);
        });
    } catch (error) {
        console.error("REST Error:", error.response ? error.response.status : error.message);
    }
}

listModels();

const axios = require('axios');

async function testBackend() {
    try {
        console.log("Sending POST /api/ai/generate-article without token...");
        const response = await axios.post('http://localhost:3000/api/ai/generate-article', {
            prompt: "Test",
            length: 800
        });
        console.log("Response:", response.status, response.data);
    } catch (error) {
        if (error.response) {
            console.log("Error Response:", error.response.status, error.response.data);
        } else {
            console.log("Error:", error.message);
        }
    }
}

testBackend();

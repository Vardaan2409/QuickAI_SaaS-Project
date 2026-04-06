import express from 'express';
import cors from "cors";
import "dotenv/config";
import { clerkMiddleware, requireAuth } from '@clerk/express'
import aiRouter from './routes/aiRoutes.js';
import connectCloudinary from './configs/cloudinary.js';
import userRouter from './routes/userRoutes.js';

const app = express();

// Verify Env Vars
const requiredEnvVars = ['CLERK_SECRET_KEY', 'CLERK_PUBLISHABLE_KEY', 'DATABASE_URL', 'OPENROUTER_API_KEY', 'GROQ_API_KEY'];
requiredEnvVars.forEach(varName => {
    if (!process.env[varName]) {
        console.warn(`>>> WARNING: Missing sensitive environment variable: ${varName}`);
    } else {
        console.log(`>>> SUCCESS: Found environment variable: ${varName} (length: ${process.env[varName].length})`);
    }
});

await connectCloudinary();

app.use(cors());
app.use(express.json());
app.use(clerkMiddleware());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get("/", (req, res)=>res.send("Server is Live!"));

app.use((req, res, next) => {
    console.log(">>> Before requireAuth()");
    next();
});

app.use(requireAuth());

app.use((req, res, next) => {
    console.log(">>> After requireAuth()");
    next();
});

app.use("/api/ai", aiRouter);
app.use("/api/user", userRouter);

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(">>> Global Error Handler Caught:", err.message);
    res.status(500).json({ success: false, message: "Global error: " + err.message });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log("Server is running on port", PORT);
})
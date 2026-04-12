# QuickAI SaaS Platform

A modern, full-stack AI platform that offers premium AI tools including Article Generation, Blog Title Generation, Resume Analysis, Image Generation,. and Image Editing (Background & Object Removal).

## 🚀 Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (Neon Database)
- **Authentication**: Clerk
- **AI Integration**: xAI (Grok) for text processing, Clipdrop for image generation, Cloudinary for image editing
- **Styling**: Tailwind CSS with custom Glassmorphism and modern UI elements

---

## ⚙️ Prerequisites

Make sure you have the following installed on your local machine:
- [Node.js](https://nodejs.org/en/) (v16.0 or higher)
- [Git](https://git-scm.com/)

---

## 🛠️ Installation & Setup

This project uses a split client/server architecture. You will need to start both concurrently.

### 1. Clone the repository
```bash
git clone https://github.com/Vardaan2409/QuickAI_SaaS-Project.git
cd QuickAI_SaaS-Project
```

### 2. Setup the Server (Backend)

Navigate to the `server` directory and install the necessary dependencies:

```bash
cd server
npm install
```

**Environment Variables**
Create a `.env` file in the `server` directory (`server/.env`) and add the following keys:

```ini
# Database Connection
DATABASE_URL=your_neon_postgres_url

# Clerk Authentication
CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# Image Generation & Processing
CLIPDROP_API_KEY=your_clipdrop_api_key
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_secret

# AI Text Generation
XAI_API_KEY=your_xai_grok_api_key
AI_MODEL=x-ai/grok-4  # or grok-2-1212 depending on your subscription
```

**Start the Server**:
```bash
npm run dev
# or manually:
nodemon server.js
```
The server will start running on `http://localhost:3000`.

### 3. Setup the Client (Frontend)

Open a new terminal window, navigate to the `client` directory, and install the dependencies:

```bash
cd client
npm install
```

**Environment Variables**
Create a `.env` file in the `client` directory (`client/.env`) and add the following:

```ini
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_BASE_URL=http://localhost:3000
```

**Start the Client**:
```bash
npm run dev
```
The React frontend will typically start at `http://localhost:5173`.

---

## 🔥 Features Summary

1. **Dashboard & Auth**: Secure login via Clerk. Tracks user generation quotas (Free vs Premium Pro).
2. **AI Article Writer**: Long-form article generation powered by Grok.
3. **Blog Title Generator**: Creative title suggestions tailored by category & keyword.
4. **Resume Reviewer**: PDF parsing and AI-driven feedback for resumes.
5. **Image Generator**: High-quality text-to-image creation utilizing Clipdrop.
6. **Object & Background Removal**: Intelligent image manipulation via Cloudinary.

## 📝 Usage Notes
- Free-tier users are uniquely restricted to 10 free generations. Adding a "Premium Pro" subscription via Clerk elevates usage blocks entirely.
- By default, ad-blockers may intercept typical article generation routes. The internal backend endpoint utilizes `/api/ai/ai-write` to seamlessly bypass aggressive browser ad-blocking rules.

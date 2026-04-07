# QuickAI - AI Powered SaaS Platform

QuickAI is a comprehensive SaaS platform built with the MERN stack (PostgreSQL via Neon, Express, React, Node.js) that provides users with a suite of AI-driven tools for content creation, image manipulation, and career development.

## 🚀 Features

- **AI Article Writer**: Generate high-quality, engaging articles on any topic.
- **Blog Title Generator**: Find catchy and effective titles for your blog posts.
- **AI Image Generation**: Create stunning visuals using advanced AI models.
- **Background Removal**: Effortlessly remove backgrounds from images.
- **Object Removal**: Seamlessly remove unwanted objects from your photos.
- **Resume Reviewer**: Get AI-powered feedback on your resume to boost your career prospects.
- **User Dashboard**: Track your creations and manage your account.
- **Authentication**: Secure login and sign-up powered by Clerk.

## 🛠️ Tech Stack

- **Frontend**: React.js, Vite, Tailwind CSS (or Vanilla CSS), Lucide React Icons.
- **Backend**: Node.js, Express.js.
- **Database**: PostgreSQL (Neon DB).
- **Authentication**: Clerk.
- **File Storage**: Cloudinary.
- **AI Models**: Groq (Llama), Google Gemini, ClipDrop.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16.0.0 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## 🔧 Installation & Setup

Follow these steps to get the project running locally:

### 1. Clone the repository
```bash
git clone <repository-url>
cd Saas_Project
```

### 2. Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `server` folder and add your credentials:
   ```env
   DATABASE_URL=your_postgresql_url
   CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   CLERK_SECRET_KEY=your_clerk_secret_key
   CLIPDROP_API_KEY=your_clipdrop_api_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   GROQ_API_KEY=your_groq_api_key
   GROQ_MODEL=llama-3.3-70b-versatile
   ```
4. Start the server:
   ```bash
   npm run server
   ```

### 3. Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd ../client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the `client` folder:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
   VITE_BASE_URL=http://localhost:3000
   ```
4. Start the frontend:
   ```bash
   npm run dev
   ```

## 🌐 Usage

1. Open your browser and go to `http://localhost:5173` (or the port specified by Vite).
2. Sign up or log in using the Clerk authentication interface.
3. Access various AI tools from the dashboard.
4. View your previous creations in the "Community" or "Dashboard" section.

## 📄 License

This project is licensed under the ISC License.

# 🚀 Vercel Deployment Guide - Price Tag Generator

This guide will walk you through deploying your Price Tag Generator application to Vercel with both frontend (React + Vite) and backend (Express.js + PDF generation).

## 📋 Table of Contents
1. [Prerequisites](#prerequisites)
2. [Project Structure Overview](#project-structure-overview)
3. [Backend Configuration](#backend-configuration)
4. [Frontend Configuration](#frontend-configuration)
5. [Deploy to Vercel](#deploy-to-vercel)
6. [Environment Variables](#environment-variables)
7. [Testing Your Deployment](#testing-your-deployment)
8. [Troubleshooting](#troubleshooting)

---

## Prerequisites

Before you begin, make sure you have:

- ✅ A [Vercel account](https://vercel.com/signup) (free tier works great!)
- ✅ [Vercel CLI](https://vercel.com/docs/cli) installed (optional but recommended)
- ✅ Git repository with your project code
- ✅ Node.js and npm installed locally

### Install Vercel CLI (optional)
```bash
npm install -g vercel
```

---

## 📁 Project Structure Overview

Your current project structure:
```
Price Tag Generator/
├── src/                    # Frontend React app
├── server/                 # Backend Express API
│   ├── fonts/              # Custom TTF fonts
│   ├── templates/          # PDF templates
│   └── index.js            # Express server
├── package.json            # Frontend dependencies
└── vite.config.js          # Vite configuration
```

For Vercel, we'll need to restructure to use **Serverless Functions**.

---

## 🔧 Backend Configuration

### Step 1: Create Vercel Serverless Function

Vercel doesn't support traditional Express servers directly. We'll convert the backend to a serverless function.

**Create `api/generate-pdf.js`:**

This file will handle PDF generation as a Vercel serverless function. The code will be adapted from your current `server/index.js`.

**Create `api/health.js`:**

This file will handle the health check endpoint.

### Step 2: Move Assets to Public API Folder

Vercel needs to access fonts and templates. We'll include them alongside the serverless functions or move them to the public directory.

---

## 🎨 Frontend Configuration

### Step 1: Update API Calls

Since Vercel will host both frontend and backend on the same domain, you can use relative URLs. Your current code already uses `/api/generate-pdf`, which is perfect!

**Your `src/App.jsx` already uses the correct endpoint:**
```javascript
const response = await fetch('/api/generate-pdf', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
})
```

✅ No changes needed!

### Step 2: Update Vite Config for Production

Remove the proxy configuration since Vercel will handle routing:

**Update `vite.config.js`:**
```javascript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
  }
})
```

---

## 📦 Create Vercel Configuration Files

### 1. Create `vercel.json`

This tells Vercel how to build and deploy your app:

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist"
      }
    }
  ],
  "routes": [
    {
      "src": "/api/(.*)",
      "dest": "/api/$1"
    },
    {
      "src": "/(.*)",
      "dest": "/$1"
    }
  ]
}
```

### 2. Update Root `package.json`

Add a build script for Vercel:

```json
{
  "name": "pdf-generator",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "vercel-build": "npm run build"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "@pdf-lib/fontkit": "^1.1.1",
    "pdf-lib": "^1.17.1"
  },
  "devDependencies": {
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "@vitejs/plugin-react": "^4.2.1",
    "autoprefixer": "^10.4.16",
    "postcss": "^8.4.32",
    "tailwindcss": "^3.4.0",
    "vite": "^5.0.8"
  }
}
```

**Important:** Move `@pdf-lib/fontkit` and `pdf-lib` from `server/package.json` to the root `package.json` dependencies!

---

## 🚀 Deploy to Vercel

### Option 1: Deploy via Vercel Dashboard (Recommended for First Time)

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Configure for Vercel deployment"
   git push origin main
   ```

2. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**

3. **Click "Add New Project"**

4. **Import your Git repository**

5. **Configure the project:**
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`

6. **Click "Deploy"**

Vercel will automatically:
- Install dependencies
- Build your frontend
- Deploy your serverless functions
- Give you a live URL!

### Option 2: Deploy via CLI

```bash
# Navigate to your project directory
cd "c:\Users\ardij\OneDrive\Desktop\Projects\Price Tag Generator"

# Login to Vercel
vercel login

# Deploy
vercel

# Follow the prompts:
# - Set up and deploy? Yes
# - Which scope? Select your account
# - Link to existing project? No
# - What's your project's name? price-tag-generator
# - In which directory is your code located? ./
# - Want to override settings? No

# For production deployment
vercel --prod
```

---

## 🌍 Environment Variables

If you need any environment variables in the future:

1. Go to your project on Vercel Dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add your variables (e.g., `API_KEY`, `DATABASE_URL`)
4. Redeploy your application

---

## ✅ Testing Your Deployment

Once deployed, Vercel will give you a URL like: `https://price-tag-generator.vercel.app`

### Test the following:

1. **Frontend loads:**
   - Visit your deployment URL
   - Verify the form is visible and styled correctly

2. **Health check endpoint:**
   - Visit: `https://your-app.vercel.app/api/health`
   - Should return: `{"status":"OK","message":"Price Tag Generator Server is running"}`

3. **PDF generation:**
   - Fill out the form with test data:
     - Discount: `40%`
     - Product: `ЌЕБЕ СО ДЕЗЕН`
     - Original Price: `800,-`
     - Discounted Price: `480,-`
     - Product Code: `246403`
     - Dimensions: `Димензии: 200 cm x 230 cm`
   - Click "Generate Price Tag PDF"
   - Verify PDF downloads correctly

---

## 🐛 Troubleshooting

### Issue: "Module not found" errors
**Solution:** Make sure all dependencies from `server/package.json` are moved to root `package.json`

### Issue: Fonts not loading
**Solution:** Ensure fonts are in the correct directory and paths are updated in the serverless function

### Issue: API routes not working
**Solution:** Check `vercel.json` routing configuration and ensure serverless functions are in the `api/` directory

### Issue: Build fails
**Solution:** 
- Check build logs in Vercel Dashboard
- Ensure `npm run build` works locally
- Verify all dependencies are in `package.json`

### Issue: PDF generation timeout
**Solution:** Vercel serverless functions have a 10-second timeout on free tier. Consider upgrading if needed, or optimize PDF generation.

### Issue: CORS errors
**Solution:** CORS is usually not needed when frontend and backend are on the same domain (Vercel handles this)

---

## 📚 Additional Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Serverless Functions](https://vercel.com/docs/functions/serverless-functions)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html#vercel)
- [PDF-lib Documentation](https://pdf-lib.js.org/)

---

## 🎉 Success!

Your Price Tag Generator is now live on Vercel! 

**Share your deployed URL with your team and start generating beautiful price tags!**

### Next Steps:
- Set up a custom domain (Vercel Settings → Domains)
- Enable automatic deployments from Git
- Set up preview deployments for branches
- Monitor usage in Vercel Analytics

---

**Need help?** Feel free to check Vercel's excellent documentation or their community Discord!


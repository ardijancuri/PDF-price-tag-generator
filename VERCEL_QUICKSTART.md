# 🚀 Vercel Quick Start Guide

This is a condensed guide to get your Price Tag Generator deployed on Vercel in minutes!

## ✅ Pre-Deployment Checklist

Before deploying, make sure these files exist in your project:

- ✅ `vercel.json` - Vercel configuration
- ✅ `api/generate-pdf.js` - Serverless function for PDF generation
- ✅ `api/health.js` - Health check endpoint
- ✅ Updated `package.json` with PDF dependencies
- ✅ Updated `vite.config.js` with build config
- ✅ `server/fonts/` - Font files must be present
- ✅ `server/templates/base.pdf` - PDF template must be present

## 📦 Step 1: Install Dependencies

```bash
npm install
```

This will install both frontend and backend dependencies in the root `package.json`.

## 🧪 Step 2: Test Locally (Optional but Recommended)

### Test Frontend Build:
```bash
npm run build
```

If successful, you'll see a `dist/` folder created.

### Test Backend Server (for local dev):
```bash
cd server
npm install
npm start
```

In another terminal:
```bash
npm run dev
```

Visit `http://localhost:5173` and test the PDF generation.

## 🌐 Step 3: Deploy to Vercel

### Option A: Via Vercel Dashboard (Easiest)

1. **Push your code to GitHub:**
   ```bash
   git add .
   git commit -m "Configure for Vercel deployment"
   git push origin main
   ```

2. **Go to [vercel.com](https://vercel.com) and sign in**

3. **Click "Add New..." → "Project"**

4. **Import your repository**

5. **Configure:**
   - Framework Preset: **Vite**
   - Build Command: `npm run build` (should be auto-detected)
   - Output Directory: `dist` (should be auto-detected)
   - Install Command: `npm install` (should be auto-detected)

6. **Click "Deploy"**

7. **Wait 1-2 minutes** ⏳

8. **Your app is live!** 🎉

### Option B: Via Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (this will be a preview deployment)
vercel

# Deploy to production
vercel --prod
```

## 🧪 Step 4: Test Your Deployment

Once deployed, you'll get a URL like: `https://price-tag-generator-xyz.vercel.app`

### Test the endpoints:

1. **Health Check:**
   ```
   https://your-app.vercel.app/api/health
   ```
   Should return:
   ```json
   {
     "status": "OK",
     "message": "Price Tag Generator Server is running",
     "timestamp": "2025-11-30T...",
     "environment": "production"
   }
   ```

2. **Frontend:**
   - Visit your deployment URL
   - Fill out the form with sample data:
     - Discount: `40%`
     - Product: `ЌЕБЕ СО ДЕЗЕН`
     - Original Price: `800,-`
     - Discounted Price: `480,-`
     - Product Code: `246403`
     - Dimensions: `Димензии: 200 cm x 230 cm`
   - Click "Generate Price Tag PDF"
   - PDF should download automatically!

## 🔄 Continuous Deployment

Once connected to Git:
- **Every push to `main`** → Automatic production deployment
- **Every push to other branches** → Preview deployment
- **Every pull request** → Preview deployment with unique URL

## 🎯 Common Issues & Solutions

### ❌ "Module not found: pdf-lib or @pdf-lib/fontkit"
**Solution:** Make sure you ran `npm install` in the root directory after updating `package.json`

### ❌ "Fonts not loading"
**Solution:** Ensure `server/fonts/` directory is committed to git and not ignored

### ❌ "Template not found"
**Solution:** Ensure `server/templates/base.pdf` is committed to git

### ❌ Build fails with "Could not resolve import"
**Solution:** Clear cache and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### ❌ API returns 404
**Solution:** Make sure `api/` folder is in the root directory, not inside `server/`

## 📊 Vercel Limits (Free Tier)

- ✅ Bandwidth: 100 GB/month
- ✅ Serverless Function Execution: 100 GB-Hours/month
- ✅ Serverless Function Duration: 10 seconds max
- ✅ Deployments: Unlimited

Your PDF generation should complete in < 2 seconds, well within limits!

## 🎨 Custom Domain (Optional)

1. Go to your project in Vercel Dashboard
2. Click **Settings** → **Domains**
3. Add your custom domain (e.g., `price-tags.yourcompany.com`)
4. Follow DNS configuration instructions
5. SSL certificate is automatically provisioned!

## 📈 Monitor Your App

Vercel provides built-in analytics:
- Go to your project dashboard
- Click **Analytics** to see:
  - Page views
  - Top pages
  - Devices & browsers
  - Performance metrics

## 🎉 Success!

Your Price Tag Generator is now live and accessible worldwide!

**Share your deployment URL and start generating price tags!**

---

## 🆘 Need Help?

- [Vercel Documentation](https://vercel.com/docs)
- [Vercel Support](https://vercel.com/support)
- [Vercel Community Discord](https://vercel.com/discord)

## 📝 Next Steps

1. ⭐ Set up a custom domain
2. 📊 Enable Vercel Analytics
3. 🔔 Set up deployment notifications
4. 🔒 Add authentication (if needed)
5. 📱 Test on mobile devices


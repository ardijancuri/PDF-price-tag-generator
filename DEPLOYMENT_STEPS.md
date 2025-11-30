# 🚀 Deployment Steps - Quick Reference

## ⚡ Fastest Way to Deploy (5 Minutes)

### 1. Push to GitHub
```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

### 2. Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click **"Add New..." → "Project"**
3. Import your GitHub repository
4. Click **"Deploy"** (Vercel auto-detects Vite config)
5. Wait ~2 minutes
6. **Done!** You'll get a live URL

### 3. Test Your App
Visit your URL: `https://your-project.vercel.app`

Test the form:
- Fill in all 6 fields
- Click "Generate Price Tag PDF"
- PDF should download!

---

## 📋 Files Added for Deployment

These files have been created/updated for Vercel deployment:

### ✅ Configuration Files
- `vercel.json` - Vercel deployment configuration
- `.vercelignore` - Files to exclude from deployment
- `vite.config.js` - Updated with build config

### ✅ Serverless Functions
- `api/generate-pdf.js` - Main PDF generation endpoint
- `api/health.js` - Health check endpoint
- `api/package.json` - Module type configuration

### ✅ Dependencies
- `package.json` - Updated with PDF generation libraries

### ✅ Documentation
- `DEPLOYMENT_GUIDE.md` - Comprehensive deployment guide
- `VERCEL_QUICKSTART.md` - Quick start guide
- `DEPLOYMENT_STEPS.md` - This file!

---

## 🏗️ Project Structure for Vercel

```
Price Tag Generator/
├── api/                          # 🚀 Serverless functions (backend)
│   ├── generate-pdf.js           # PDF generation API
│   ├── health.js                 # Health check API
│   └── package.json              # Module configuration
├── server/                       # 📦 Backend assets
│   ├── fonts/                    # ✅ Required for deployment
│   │   ├── FuturaCyrillicBold.ttf
│   │   ├── FuturaCyrillicBook.ttf
│   │   ├── FuturaCyrillicDemi.ttf
│   │   └── FuturaCyrillicHeavy.ttf
│   └── templates/                # ✅ Required for deployment
│       └── base.pdf
├── src/                          # ⚛️ Frontend React app
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── vercel.json                   # ⚙️ Vercel configuration
├── package.json                  # 📦 Dependencies (frontend + backend)
└── vite.config.js               # ⚡ Vite build config
```

---

## 🔍 How It Works

### Local Development
- Frontend runs on `http://localhost:5173` (Vite)
- Backend runs on `http://localhost:3000` (Express)
- Vite proxy forwards `/api/*` requests to Express

### Production (Vercel)
- Frontend served as static files from `dist/`
- Backend runs as serverless functions in `api/`
- Both on same domain, no proxy needed
- `/api/*` routes automatically handled by Vercel

---

## ✅ Deployment Checklist

Before deploying, verify:

- [ ] All changes committed to Git
- [ ] `npm install` runs without errors
- [ ] `npm run build` completes successfully
- [ ] `server/fonts/` folder has 4 TTF files
- [ ] `server/templates/base.pdf` exists
- [ ] `api/` folder has 3 files (2 JS + 1 JSON)
- [ ] `vercel.json` exists in root

---

## 🎯 Expected Results

### After Deployment:

**Homepage:**
- URL: `https://your-app.vercel.app/`
- Shows: Price tag form with 6 fields
- Beautiful gradient header
- Responsive design

**Health Check:**
- URL: `https://your-app.vercel.app/api/health`
- Returns: `{"status":"OK","message":"Price Tag Generator Server is running"}`

**PDF Generation:**
- Fill form → Click generate → PDF downloads
- Processing time: ~1-2 seconds
- File name: `generated.pdf`
- Opens in any PDF viewer

---

## 🐛 Troubleshooting

### Build Fails
```bash
# Clear cache and rebuild locally first
rm -rf node_modules dist
npm install
npm run build
```

### Fonts Not Loading
- Ensure `server/fonts/` is committed to Git
- Check `.gitignore` doesn't exclude fonts
- Verify fonts exist in repository

### API 404 Error
- Ensure `api/` folder is in project root
- Check `vercel.json` exists and is valid
- Redeploy the project

### Serverless Function Timeout
- Vercel free tier: 10 second limit
- PDF generation should take < 2 seconds
- If timeout occurs, check PDF template size

---

## 🎨 Customization After Deployment

### Custom Domain
1. Vercel Dashboard → Your Project → Settings → Domains
2. Add domain (e.g., `tags.mycompany.com`)
3. Update DNS records as shown
4. SSL auto-configured!

### Environment Variables
1. Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add variables (e.g., `API_KEY`, `DATABASE_URL`)
3. Redeploy for changes to take effect

### Analytics
1. Vercel Dashboard → Your Project → Analytics
2. View real-time metrics
3. See top pages, devices, performance

---

## 📞 Support

**Vercel Resources:**
- [Documentation](https://vercel.com/docs)
- [Discord Community](https://vercel.com/discord)
- [Status Page](https://www.vercel-status.com/)

**Project-Specific:**
- Check `DEPLOYMENT_GUIDE.md` for detailed information
- Check `VERCEL_QUICKSTART.md` for step-by-step guide

---

## 🎉 You're All Set!

Your Price Tag Generator is ready for deployment. Just follow the 3 steps at the top and you'll be live in minutes!

**Happy deploying! 🚀**


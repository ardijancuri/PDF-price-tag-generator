# ✅ Pre-Deployment Checklist

Use this checklist before deploying to Vercel to ensure everything is configured correctly.

---

## 📋 Required Files Checklist

### ✅ Configuration Files
- [ ] `vercel.json` exists in root directory
- [ ] `.vercelignore` exists in root directory
- [ ] `package.json` in root has pdf-lib dependencies
- [ ] `vite.config.js` has build configuration

### ✅ Serverless Functions (api/ folder)
- [ ] `api/generate-pdf.js` exists
- [ ] `api/health.js` exists
- [ ] `api/package.json` exists

### ✅ Backend Assets (server/ folder)
- [ ] `server/fonts/FuturaCyrillicBold.ttf` exists
- [ ] `server/fonts/FuturaCyrillicBook.ttf` exists
- [ ] `server/fonts/FuturaCyrillicDemi.ttf` exists
- [ ] `server/fonts/FuturaCyrillicHeavy.ttf` exists
- [ ] `server/templates/base.pdf` exists

### ✅ Frontend Files (src/ folder)
- [ ] `src/App.jsx` exists
- [ ] `src/main.jsx` exists
- [ ] `src/index.css` exists
- [ ] `index.html` exists

### ✅ Documentation
- [ ] `DEPLOY.md` exists (command reference)
- [ ] `DEPLOYMENT_STEPS.md` exists (quick guide)
- [ ] `DEPLOYMENT_GUIDE.md` exists (detailed guide)
- [ ] `VERCEL_QUICKSTART.md` exists (fast start)
- [ ] `README_DEPLOYMENT.md` exists (overview)

---

## 🧪 Local Testing Checklist

### ✅ Dependencies
```bash
# Run this command and verify it completes without errors
npm install
```
- [ ] Installation completes successfully
- [ ] No error messages displayed
- [ ] `node_modules/` folder created

### ✅ Build Test
```bash
# Run this command and verify build succeeds
npm run build
```
- [ ] Build completes successfully
- [ ] `dist/` folder is created
- [ ] No error messages
- [ ] Build output shows bundle sizes

### ✅ Frontend Files Generated
- [ ] `dist/index.html` exists
- [ ] `dist/assets/` folder exists
- [ ] `dist/assets/` contains JS files
- [ ] `dist/assets/` contains CSS files

---

## 🔍 File Content Verification

### ✅ package.json (Root)
Open `package.json` and verify:
- [ ] Has `"@pdf-lib/fontkit": "^1.1.1"` in dependencies
- [ ] Has `"pdf-lib": "^1.17.1"` in dependencies
- [ ] Has `"vercel-build": "npm run build"` in scripts
- [ ] `"type": "module"` is present

### ✅ vercel.json
Open `vercel.json` and verify:
- [ ] Has `"version": 2`
- [ ] Has builds configuration
- [ ] Has routes configuration
- [ ] Has functions configuration

### ✅ api/generate-pdf.js
Open `api/generate-pdf.js` and verify:
- [ ] Imports pdf-lib correctly
- [ ] Imports fontkit correctly
- [ ] Exports default handler function
- [ ] Has path to `server/fonts/`
- [ ] Has path to `server/templates/`

### ✅ src/App.jsx
Open `src/App.jsx` and verify:
- [ ] Uses `/api/generate-pdf` endpoint (relative URL)
- [ ] Has all 6 form fields
- [ ] Has form submission handler

---

## 📦 Git Repository Checklist

### ✅ Files Committed
```bash
# Run this command to check git status
git status
```

Ensure these are tracked (not ignored):
- [ ] `api/` folder and all files inside
- [ ] `server/fonts/` folder and all TTF files
- [ ] `server/templates/base.pdf`
- [ ] `vercel.json`
- [ ] `.vercelignore`
- [ ] `package.json` (root)
- [ ] `vite.config.js`

### ✅ Files That Should Be Ignored
These should NOT be committed:
- [ ] `node_modules/` (ignored ✓)
- [ ] `dist/` (ignored ✓)
- [ ] `.env.local` (ignored ✓)

### ✅ Remote Repository
- [ ] Code is pushed to GitHub/GitLab/Bitbucket
- [ ] Repository is accessible
- [ ] Main branch is up to date

---

## 🌐 Vercel Account Checklist

### ✅ Account Setup
- [ ] Vercel account created (https://vercel.com/signup)
- [ ] Email verified
- [ ] Git provider connected (GitHub/GitLab/Bitbucket)

### ✅ Repository Access
- [ ] Vercel has access to your repository
- [ ] Repository appears in Vercel's import list

---

## 🧮 Dependency Verification

Run these commands to verify dependencies:

### ✅ Check pdf-lib
```bash
npm list pdf-lib
```
- [ ] Shows `pdf-lib@1.17.1` (or higher)

### ✅ Check fontkit
```bash
npm list @pdf-lib/fontkit
```
- [ ] Shows `@pdf-lib/fontkit@1.1.1` (or higher)

### ✅ Check React
```bash
npm list react
```
- [ ] Shows `react@18.2.0` (or higher)

---

## 🎨 Font Files Verification

### ✅ Check Font Files Exist
```bash
ls server/fonts/
```

Should show:
- [ ] `FuturaCyrillicBold.ttf`
- [ ] `FuturaCyrillicBook.ttf`
- [ ] `FuturaCyrillicDemi.ttf`
- [ ] `FuturaCyrillicHeavy.ttf`

### ✅ Check File Sizes
Font files should be > 0 bytes:
```bash
# Windows PowerShell
Get-ChildItem server/fonts/*.ttf | Select Name, Length

# Linux/Mac
ls -lh server/fonts/*.ttf
```
- [ ] All fonts have reasonable file sizes (50KB - 200KB)

---

## 📄 Template File Verification

### ✅ Check Template Exists
```bash
ls server/templates/
```
- [ ] `base.pdf` exists

### ✅ Check Template Size
```bash
# Windows PowerShell
(Get-Item server/templates/base.pdf).Length

# Linux/Mac
ls -lh server/templates/base.pdf
```
- [ ] File size is > 0 bytes
- [ ] File size is reasonable (typically 10KB - 5MB)

---

## 🧪 Final Local Test

### ✅ Test Full Application Locally

**Terminal 1:**
```bash
cd server
npm install
npm start
```
- [ ] Server starts without errors
- [ ] Shows: "Server running on http://localhost:3000"

**Terminal 2:**
```bash
npm run dev
```
- [ ] Frontend starts without errors
- [ ] Shows: "Local: http://localhost:5173"

**Browser Test:**
- [ ] Open http://localhost:5173
- [ ] Form displays correctly
- [ ] Fill in all 6 fields with test data
- [ ] Click "Generate Price Tag PDF"
- [ ] PDF downloads successfully
- [ ] PDF opens and displays correctly
- [ ] Cyrillic characters display properly

---

## 🚀 Ready to Deploy?

### All Checks Passed? ✅

If all items above are checked, you're ready to deploy!

**Next Steps:**
1. Go to [DEPLOY.md](DEPLOY.md) for deployment commands
2. Or follow [DEPLOYMENT_STEPS.md](DEPLOYMENT_STEPS.md) for step-by-step guide

### Some Checks Failed? ❌

**Common Issues:**

| Issue | Solution |
|-------|----------|
| Missing dependencies | Run `npm install` in root directory |
| Build fails | Check `package.json` has correct dependencies |
| Fonts missing | Ensure `server/fonts/` is not in `.gitignore` |
| Template missing | Ensure `server/templates/base.pdf` exists |
| API files missing | Create `api/` folder with serverless functions |

**Need detailed help?** See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

---

## 📊 Checklist Summary

Total items to check: **~50**

### Quick Count
- [ ] Configuration files (4)
- [ ] API files (3)
- [ ] Font files (4)
- [ ] Template file (1)
- [ ] Frontend files (4)
- [ ] Documentation (5)
- [ ] Build tests (2)
- [ ] Git checks (3)
- [ ] Dependency checks (3)
- [ ] Local functionality test (1)

**Once all are checked, you're good to go!** 🎉

---

## 🆘 Getting Help

If you encounter issues:

1. **Quick answers:** [DEPLOYMENT_STEPS.md](DEPLOYMENT_STEPS.md)
2. **Detailed guide:** [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)
3. **Commands:** [DEPLOY.md](DEPLOY.md)
4. **Vercel docs:** https://vercel.com/docs

---

**Good luck with your deployment!** 🚀


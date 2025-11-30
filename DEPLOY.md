# ⚡ Deploy to Vercel - Command Reference

Quick copy-paste commands to deploy your Price Tag Generator!

---

## 🚀 Option 1: Deploy via GitHub + Vercel Dashboard (Recommended)

### Step 1: Push to GitHub
```bash
# Add all files
git add .

# Commit changes
git commit -m "Configure for Vercel deployment"

# Push to GitHub
git push origin main
```

### Step 2: Deploy on Vercel
1. Visit: https://vercel.com/new
2. Click "Import Project"
3. Select your repository
4. Click "Deploy"
5. Done! ✅

---

## 🚀 Option 2: Deploy via Vercel CLI

### One-Time Setup
```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login
```

### Deploy (Preview)
```bash
# Navigate to project directory
cd "c:\Users\ardij\OneDrive\Desktop\Projects\Price Tag Generator"

# Deploy to preview
vercel
```

### Deploy (Production)
```bash
# Deploy to production
vercel --prod
```

---

## 🧪 Test Before Deploying (Optional)

### Install Dependencies
```bash
# Install root dependencies (includes PDF libs)
npm install
```

### Test Frontend Build
```bash
# Build frontend
npm run build

# Preview build locally
npm run preview
```

### Test Full Stack Locally
```bash
# Terminal 1: Start backend server
cd server
npm install
npm start

# Terminal 2: Start frontend
cd ..
npm run dev
```

Visit: http://localhost:5173

---

## 🔄 Update Deployment

### After Making Changes
```bash
# Commit and push
git add .
git commit -m "Update: description of changes"
git push origin main
```

✨ **Vercel automatically redeploys!**

Or via CLI:
```bash
vercel --prod
```

---

## 🌐 Get Deployment URL

### Via Dashboard
1. Go to: https://vercel.com/dashboard
2. Click your project
3. Copy URL from dashboard

### Via CLI
```bash
# After deploying, look for:
# ✅ Production: https://your-project.vercel.app
```

---

## 🧪 Test Deployment

### Health Check
```bash
# Replace with your actual URL
curl https://your-project.vercel.app/api/health
```

Expected output:
```json
{
  "status": "OK",
  "message": "Price Tag Generator Server is running",
  "timestamp": "2025-11-30T...",
  "environment": "production"
}
```

### Web Test
```bash
# Open in browser (Windows)
start https://your-project.vercel.app

# Open in browser (Mac)
open https://your-project.vercel.app

# Open in browser (Linux)
xdg-open https://your-project.vercel.app
```

---

## 📊 View Logs

### Via Dashboard
1. Go to: https://vercel.com/dashboard
2. Click your project
3. Click "Deployments"
4. Click latest deployment
5. Click "View Function Logs"

### Via CLI
```bash
# View deployment logs
vercel logs

# View specific deployment
vercel logs [deployment-url]
```

---

## 🎨 Custom Domain

### Add Domain
```bash
# Via CLI
vercel domains add yourdomain.com

# Then follow DNS instructions
```

### Via Dashboard
1. Project → Settings → Domains
2. Add domain
3. Configure DNS
4. SSL auto-configured!

---

## 🔧 Environment Variables (if needed)

### Via CLI
```bash
# Add environment variable
vercel env add API_KEY

# Pull environment variables locally
vercel env pull
```

### Via Dashboard
1. Project → Settings → Environment Variables
2. Add variable
3. Redeploy for changes to apply

---

## 🗑️ Remove Deployment

### Remove Project
```bash
# Via CLI
vercel remove your-project-name
```

### Via Dashboard
1. Project → Settings
2. Scroll to "Delete Project"
3. Confirm deletion

---

## 🐛 Troubleshooting Commands

### Clear Cache & Reinstall
```bash
# Remove node_modules and cache
rm -rf node_modules package-lock.json dist

# Reinstall dependencies
npm install

# Rebuild
npm run build
```

### Force Redeploy
```bash
# Make a small change and push
git commit --allow-empty -m "Force redeploy"
git push origin main
```

### Check Vercel Status
```bash
# Check if Vercel is having issues
curl https://www.vercel-status.com/api/v2/status.json
```

### Verify Files Exist
```bash
# Check API folder
ls api/

# Check fonts
ls server/fonts/

# Check template
ls server/templates/
```

---

## 📦 Project Info

### Check Vercel Project Info
```bash
# Get project details
vercel inspect

# List all projects
vercel list
```

### Check Build Output
```bash
# Check if dist folder was created
ls dist/

# Check dist contents
ls dist/assets/
```

---

## 🔄 Rollback Deployment

### Via Dashboard
1. Project → Deployments
2. Find previous successful deployment
3. Click "⋯" menu → "Promote to Production"

### Via CLI
```bash
# List deployments
vercel ls

# Rollback to specific deployment
vercel rollback [deployment-url]
```

---

## 📝 Quick Reference

| Command | Description |
|---------|-------------|
| `vercel` | Deploy to preview |
| `vercel --prod` | Deploy to production |
| `vercel login` | Login to Vercel |
| `vercel logout` | Logout from Vercel |
| `vercel ls` | List deployments |
| `vercel logs` | View logs |
| `vercel inspect` | Project details |
| `vercel domains` | Manage domains |
| `vercel env` | Manage environment variables |
| `vercel remove` | Remove project |

---

## 🎉 That's It!

Choose your method:
- **Easy:** Push to GitHub → Deploy via Dashboard
- **Pro:** Use Vercel CLI commands

**Your app will be live in ~2 minutes!** 🚀

---

## 📚 More Help?

- **Quick Guide:** `DEPLOYMENT_STEPS.md`
- **Detailed Guide:** `DEPLOYMENT_GUIDE.md`
- **Fast Start:** `VERCEL_QUICKSTART.md`
- **Overview:** `README_DEPLOYMENT.md`

---

**Happy Deploying! ⚡**


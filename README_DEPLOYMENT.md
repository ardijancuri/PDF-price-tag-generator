# 📦 Price Tag Generator - Vercel Deployment

> Generate beautiful discount price tags with Cyrillic support, deployed on Vercel!

## 🌟 What's This Project?

A full-stack web application that generates professional discount price tags in PDF format:
- **Frontend:** React + Vite + Tailwind CSS
- **Backend:** Node.js Serverless Functions (Vercel)
- **PDF Engine:** pdf-lib with Cyrillic font support

---

## 🚀 Deploy in 3 Steps

### Step 1: Commit Your Code
```bash
git add .
git commit -m "Configure for Vercel deployment"
git push origin main
```

### Step 2: Deploy on Vercel
1. Visit [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..." → "Project"**
3. Import your GitHub repository
4. Click **"Deploy"**
5. ☕ Wait 2 minutes

### Step 3: Test & Enjoy!
Visit your live URL: `https://your-project.vercel.app` 🎉

---

## 📚 Documentation Files

We've prepared comprehensive guides for you:

| File | Purpose | When to Use |
|------|---------|-------------|
| **DEPLOYMENT_STEPS.md** | Quick reference checklist | Quick lookup |
| **VERCEL_QUICKSTART.md** | Fast deployment guide | First-time deployment |
| **DEPLOYMENT_GUIDE.md** | Complete detailed guide | Deep dive & troubleshooting |
| **README_DEPLOYMENT.md** | This file - Overview | Start here! |

---

## 📁 Project Structure (Vercel-Ready)

```
Price Tag Generator/
│
├── 🎨 FRONTEND (React + Vite)
│   ├── src/
│   │   ├── App.jsx              # Main form component
│   │   ├── main.jsx             # React entry point
│   │   └── index.css            # Tailwind styles
│   ├── index.html               # HTML template
│   ├── vite.config.js           # Vite configuration
│   └── tailwind.config.js       # Tailwind configuration
│
├── ⚡ BACKEND (Serverless Functions)
│   ├── api/
│   │   ├── generate-pdf.js      # PDF generation endpoint
│   │   ├── health.js            # Health check endpoint
│   │   └── package.json         # Module configuration
│   │
│   └── server/                  # Backend assets
│       ├── fonts/               # Cyrillic fonts (4 TTF files)
│       └── templates/           # base.pdf template
│
├── ⚙️ CONFIGURATION
│   ├── vercel.json              # Vercel deployment config
│   ├── .vercelignore            # Files to exclude
│   ├── package.json             # Dependencies (merged)
│   └── .gitignore               # Git ignore rules
│
└── 📖 DOCUMENTATION
    ├── README_DEPLOYMENT.md     # This file
    ├── DEPLOYMENT_GUIDE.md      # Comprehensive guide
    ├── VERCEL_QUICKSTART.md     # Quick start guide
    └── DEPLOYMENT_STEPS.md      # Step-by-step checklist
```

---

## 🔧 What Changed for Deployment?

### ✅ Files Created
- `api/generate-pdf.js` - Serverless function (replaces Express route)
- `api/health.js` - Health check serverless function
- `api/package.json` - Module type configuration
- `vercel.json` - Vercel configuration
- `.vercelignore` - Deployment exclusions

### ✅ Files Modified
- `package.json` - Added pdf-lib dependencies
- `vite.config.js` - Added build configuration

### ✅ No Changes Needed
- ✨ `src/App.jsx` - Already uses `/api/generate-pdf`
- ✨ Frontend code - Works as-is!
- ✨ Fonts & templates - Stay in same location!

---

## 🎯 How It Works

### Development Environment
```
User Browser ──────> Vite Dev Server (localhost:5173)
                     │
                     └──> Proxy /api/* ──> Express Server (localhost:3000)
```

### Production Environment (Vercel)
```
User Browser ──────> Vercel CDN
                     │
                     ├──> Static Files (Frontend) ─────> React App
                     │
                     └──> /api/* routes ────> Serverless Functions
                          │
                          └──> PDF Generation
                               ├── Load fonts from server/fonts/
                               ├── Load template from server/templates/
                               └── Generate & return PDF
```

---

## 🎨 Features

### Frontend
- ✅ Beautiful gradient UI
- ✅ 6-field form for price tag data
- ✅ Real-time validation
- ✅ Loading states
- ✅ Success/error notifications
- ✅ Responsive design
- ✅ Tailwind CSS styling

### Backend
- ✅ PDF generation with pdf-lib
- ✅ Custom Futura Cyrillic fonts
- ✅ Cyrillic character support
- ✅ Template-based generation
- ✅ Configurable text positioning
- ✅ Health check endpoint
- ✅ Error handling

---

## 📊 Vercel Free Tier Limits

Your project easily fits within free tier:

| Resource | Free Limit | Your Usage |
|----------|-----------|------------|
| Bandwidth | 100 GB/month | ~1 MB per PDF |
| Serverless Execution | 100 GB-Hours | ~2 sec per PDF |
| Function Duration | 10 seconds max | ~1-2 seconds |
| Deployments | Unlimited | ✅ Unlimited |
| Team Members | 1 | ✅ Just you |

**Estimated capacity:** ~100,000 PDFs/month on free tier! 🚀

---

## 🧪 Testing Checklist

After deployment, test these:

### ✅ Homepage
- [ ] Loads without errors
- [ ] Form displays correctly
- [ ] Styling looks good
- [ ] Responsive on mobile

### ✅ Health Check
- [ ] Visit `/api/health`
- [ ] Returns OK status
- [ ] Shows timestamp
- [ ] Environment = "production"

### ✅ PDF Generation
- [ ] Fill all 6 fields
- [ ] Click generate button
- [ ] Loading state shows
- [ ] PDF downloads automatically
- [ ] PDF opens correctly
- [ ] All text positioned correctly
- [ ] Cyrillic characters display correctly

### Test Data
```
Discount: 40%
Product: ЌЕБЕ СО ДЕЗЕН
Original Price: 800,-
Discounted Price: 480,-
Product Code: 246403
Dimensions: Димензии: 200 cm x 230 cm
```

---

## 🎓 Learn More

### About Vercel
- [Vercel Documentation](https://vercel.com/docs)
- [Serverless Functions Guide](https://vercel.com/docs/functions/serverless-functions)
- [Deploying Vite Apps](https://vercel.com/guides/deploying-vite-with-vercel)

### About the Technologies
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [pdf-lib Documentation](https://pdf-lib.js.org/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 🔒 Security Best Practices

### Current Setup (Good for MVP)
- ✅ No sensitive data in code
- ✅ No API keys required
- ✅ No database connections
- ✅ CORS handled by Vercel
- ✅ HTTPS automatic on Vercel

### Future Enhancements (Optional)
- Add rate limiting to prevent abuse
- Add authentication for restricted access
- Add input validation/sanitization
- Add logging and monitoring
- Add PDF watermarks

---

## 🚦 Deployment Status

Check your deployment status:

| Component | Status |
|-----------|--------|
| Frontend Build | ✅ Configured |
| Backend Functions | ✅ Ready |
| Fonts | ✅ Included |
| Templates | ✅ Included |
| Dependencies | ✅ Merged |
| Configuration | ✅ Complete |
| Documentation | ✅ Complete |

**🟢 You're ready to deploy!**

---

## 💡 Pro Tips

### 🚀 Faster Deployments
- Vercel auto-deploys on every push to `main`
- Use branches for preview deployments
- PRs get automatic preview URLs

### 📊 Monitor Your App
- Enable Vercel Analytics in dashboard
- Check function logs in real-time
- Set up Slack/Discord notifications

### 🎨 Customization
- Add your logo to the form
- Customize colors in `tailwind.config.js`
- Modify PDF layout in `api/generate-pdf.js`

### 🌐 Custom Domain
- Free SSL certificate
- Automatic renewal
- DNS configuration help included

---

## 🤝 Support

Need help? Choose your path:

| Issue Type | Where to Go |
|------------|-------------|
| Deployment questions | `DEPLOYMENT_GUIDE.md` |
| Quick answers | `DEPLOYMENT_STEPS.md` |
| Vercel-specific | [Vercel Support](https://vercel.com/support) |
| PDF generation | [pdf-lib docs](https://pdf-lib.js.org/) |
| General questions | [Vercel Discord](https://vercel.com/discord) |

---

## 🎉 Ready to Deploy?

You have everything you need! Choose your guide:

1. **Super Quick?** → `DEPLOYMENT_STEPS.md` (5 minutes)
2. **First Time?** → `VERCEL_QUICKSTART.md` (10 minutes)
3. **Want Details?** → `DEPLOYMENT_GUIDE.md` (20 minutes)

---

## 📝 License

This project is configured for deployment on Vercel. Make sure your license permits commercial use if deploying for business purposes.

---

## 🌟 Built With

- [React](https://react.dev/) - UI Framework
- [Vite](https://vitejs.dev/) - Build Tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [pdf-lib](https://pdf-lib.js.org/) - PDF Generation
- [Vercel](https://vercel.com/) - Hosting Platform

---

**Made with ❤️ for generating awesome price tags!**

*Questions? Check the other documentation files or reach out to Vercel support!*


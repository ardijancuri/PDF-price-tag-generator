# Discount Price Tag Generator

A full-stack web application that generates discount price tag PDFs by overlaying product information onto a base PDF template with "ПОПУСТ / ZBRITJE" (Discount) header.

## 🚀 Features

- **6-Field Input Form**: Clean, modern React form for discount price tags
- **PDF Generation**: Backend service that overlays text on a base PDF template
- **Instant Download**: Generated PDFs download automatically to your browser
- **Helvetica Font**: Clean sans-serif font similar to Futura
- **Premium UI**: Beautiful, responsive design with Tailwind CSS
- **Easy Customization**: Well-documented code for adjusting field positions

## 📁 Project Structure

```
Price Tag Generator/
├── src/                      # Frontend React application
│   ├── App.jsx              # Main form component
│   ├── main.jsx             # React entry point
│   └── index.css            # Global styles with Tailwind
├── server/                   # Backend Express server
│   ├── index.js             # Server with PDF generation logic
│   ├── package.json         # Backend dependencies
│   ├── fonts/               # Custom fonts directory (place .ttf or .otf files here)
│   └── templates/           # PDF templates directory
│       └── base.pdf         # Base PDF template
├── index.html               # HTML entry point
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind CSS configuration
├── postcss.config.js        # PostCSS configuration
└── package.json             # Frontend dependencies
```

## 🛠️ Tech Stack

### Frontend
- **React** - UI library
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework

### Backend
- **Node.js** - Runtime environment
- **Express** - Web server framework
- **pdf-lib** - PDF manipulation library with Helvetica font support

## 📦 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Setup Steps

1. **Install Frontend Dependencies**
   ```bash
   npm install
   ```

2. **Install Backend Dependencies**
   ```bash
   cd server
   npm install
   cd ..
   ```

3. **Verify PDF Template**
   - Ensure `base.pdf` is in the `server/templates/` directory
   - The setup script should have already copied it there

## 🚀 Running the Application

You need to run both the frontend and backend servers:

### Terminal 1 - Backend Server
```bash
cd server
npm start
```
The backend will run on `http://localhost:3000`

### Terminal 2 - Frontend Dev Server
```bash
npm run dev
```
The frontend will run on `http://localhost:5173`

### Access the Application
Open your browser and navigate to `http://localhost:5173`

## 📝 Usage

1. Fill in the 6 fields with your product information:
   - **Field 1**: Discount percentage (e.g., "40%")
   - **Field 2**: Product name (e.g., "ЌЕБЕ СО ДЕЗЕН")
   - **Field 3**: Original price (e.g., "800,-")
   - **Field 4**: Discounted price (e.g., "480,-")
   - **Field 5**: Product code (e.g., "246403")
   - **Field 6**: Dimensions (e.g., "Димензии: 200 cm x 230 cm")
2. Click the "Generate Price Tag PDF" button
3. The PDF will automatically download as `generated.pdf`
4. Open the PDF to verify the output

## 🎨 Customizing Field Positions

The field positions are configured in `server/index.js`. To adjust them:

1. Open `server/index.js`
2. Find the `fieldPositions` array (around line 67)
3. Adjust the `x`, `y`, and `fontSize` values for each field:

```javascript
const fieldPositions = [
  // Field 1
  { x: 50, y: height - 100, fontSize: 12 },
  // ... more fields
]
```

### Understanding PDF Coordinates

- **Origin (0, 0)**: Bottom-left corner of the page
- **X-axis**: Increases from left to right
- **Y-axis**: Increases from bottom to top
- **height - Y**: Converts from top-down positioning

### Finding the Right Positions

1. Generate a test PDF with sample data
2. Compare it with `final-pdf.pdf`
3. Adjust coordinates in `server/index.js`
4. Restart the backend server: `cd server && npm start`
5. Test again until positions match perfectly

### Additional Customization Options

In `server/index.js`, you can also customize:
- **Font**: Currently uses `StandardFonts.Helvetica` and `StandardFonts.HelveticaBold`
- **Text Color**: Modify the `rgb(0, 0, 0)` values
- **Font Size**: Adjust `fontSize` per field
- **Footer Text**: Change "COMEO" text at the bottom
- **Text Alignment**: Add alignment options to the `drawText` method


## 🔧 Development

### Frontend Development
- Hot reload is enabled via Vite
- Changes to React components will update automatically
- Edit `src/App.jsx` to modify the form
- Edit `src/index.css` to change styles

### Backend Development
- Use `npm run dev` in the server directory for auto-restart on changes
- The server uses Node's `--watch` flag for hot reloading

## 📄 API Endpoints

### POST `/api/generate-pdf`
Generates a discount price tag PDF with the provided field values.

**Request Body:**
```json
{
  "field1": "40%",
  "field2": "ЌЕБЕ СО ДЕЗЕН",
  "field3": "800,-",
  "field4": "480,-",
  "field5": "246403",
  "field6": "Димензии: 200 cm x 230 cm"
}
```

**Response:**
- Content-Type: `application/pdf`
- Binary PDF data

### GET `/api/health`
Health check endpoint.

**Response:**
```json
{
  "status": "OK",
  "message": "Price Tag Generator Server is running"
}
```

## 🐛 Troubleshooting

### PDF Not Generating
- Check that both servers are running
- Verify `base.pdf` exists in `server/templates/`
- Check browser console for errors
- Check server terminal for error messages

### Field Positions Don't Match
- Compare generated PDF with `final-pdf.pdf`
- Adjust coordinates in `server/index.js`
- Remember: PDF coordinates start from bottom-left (A4: 841.89 x 1190.55 points)
- Restart the backend server after changes

### Port Already in Use
- Frontend (5173): Change in `vite.config.js`
- Backend (3000): Change `PORT` in `server/index.js`

## 🌐 Deployment

This project is **ready to deploy to Vercel**! We've included comprehensive deployment guides:

### 📖 Deployment Documentation

| Guide | Purpose | Time |
|-------|---------|------|
| **[DEPLOY.md](DEPLOY.md)** | Quick command reference | 2 min |
| **[DEPLOYMENT_STEPS.md](DEPLOYMENT_STEPS.md)** | Step-by-step checklist | 5 min |
| **[VERCEL_QUICKSTART.md](VERCEL_QUICKSTART.md)** | Fast start guide | 10 min |
| **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** | Complete detailed guide | 20 min |
| **[README_DEPLOYMENT.md](README_DEPLOYMENT.md)** | Overview & architecture | 15 min |

### ⚡ Quick Deploy

```bash
# 1. Commit your code
git add .
git commit -m "Ready for deployment"
git push origin main

# 2. Deploy to Vercel
# Visit https://vercel.com/new
# Import your repository
# Click "Deploy"
# Done! ✅
```

### 🎯 What's Included

- ✅ Serverless functions for PDF generation
- ✅ Optimized build configuration
- ✅ All dependencies merged
- ✅ Fonts and templates included
- ✅ Environment configuration
- ✅ Health check endpoint
- ✅ Production-ready setup

**Your app will be live on Vercel in ~2 minutes!** 🚀

See **[DEPLOY.md](DEPLOY.md)** for copy-paste commands.

## 📚 Additional Resources

- [pdf-lib Documentation](https://pdf-lib.js.org/)
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Vercel Documentation](https://vercel.com/docs)

## 📝 License

This project is provided as-is for your use.

---

**Need Help?**
- **Local Development:** Check comments in `server/index.js`
- **Deployment:** See `DEPLOY.md` or `DEPLOYMENT_STEPS.md`
- **Troubleshooting:** See `DEPLOYMENT_GUIDE.md`

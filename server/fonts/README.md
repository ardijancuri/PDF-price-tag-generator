# Avenir LT Pro Font Integration

## ✅ Fonts Loaded

The PDF generator now uses the **Avenir LT Pro** font family for all generated PDFs. The following font weights are available:

### Available Fonts

1. **avenirLight** - `AvenirLTProLight.otf`
   - Lightest weight
   - Use for: Subtle text, captions

2. **avenirBook** - `AvenirLTProBook.otf`
   - Book weight
   - Use for: Body text, descriptions

3. **avenirRoman** - `AvenirLTProRoman.otf` ⭐ **DEFAULT**
   - Regular/Roman weight
   - Use for: Standard text, default choice

4. **avenirMedium** - `AvenirLTProMedium.otf`
   - Medium weight
   - Use for: Emphasized text, subheadings

5. **avenirHeavy** - `AvenirLTProHeavy.otf`
   - Heavy weight
   - Use for: Strong emphasis, important text

6. **avenirBlack** - `AvenirLTProBlack.otf` ⭐ **BOLD DEFAULT**
   - Heaviest/boldest weight
   - Use for: Headings, very bold text

## Current Configuration

- **Default font**: `avenirRoman` (regular weight)
- **Bold font**: `avenirBlack` (heaviest weight)

All text fields in the generated PDF will use Avenir Roman by default.

## Customizing Font Per Field

You can specify different fonts for individual fields by adding a `font` property to the field position configuration in `server/index.js`:

```javascript
const fieldPositions = [
  // Field 1 - Using default font (Avenir Roman)
  { x: 50, y: height - 100, fontSize: 12 },
  
  // Field 2 - Using Avenir Black for bold text
  { x: 50, y: height - 140, fontSize: 14, font: avenirBlack },
  
  // Field 3 - Using Avenir Light for subtle text
  { x: 50, y: height - 180, fontSize: 10, font: avenirLight },
  
  // Field 4 - Using Avenir Medium
  { x: 50, y: height - 220, fontSize: 12, font: avenirMedium },
  
  // ... etc
]
```

## Testing

To verify the fonts are working:

1. Go to http://localhost:5173
2. Fill in the form fields
3. Generate a PDF
4. Open the PDF and verify the text uses Avenir LT Pro font family

The generated PDFs will now have a professional, consistent look using your custom Avenir fonts!

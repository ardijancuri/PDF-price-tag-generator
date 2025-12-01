import express from 'express'
import cors from 'cors'
import { readFile } from 'fs/promises'
import { PDFDocument, rgb } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()
const PORT = 3000

// Middleware
app.use(cors())
app.use(express.json())

/**
 * PDF Generation Endpoint
 * 
 * This endpoint receives form data with 6 fields and generates a discount price tag PDF
 * by overlaying the text on the base.pdf template.
 * 
 * Fields:
 * 1. Discount percentage (e.g., "40%")
 * 2. Product name (e.g., "КЕБЕ СО ДЕЗЕН")
 * 3. Original price (e.g., "800,-")
 * 4. Discounted price (e.g., "480,-")
 * 5. Product code (e.g., "246403")
 * 6. Dimensions (e.g., "Димензии: 200 cm x 230 cm")
 */
app.post('/api/generate-pdf', async (req, res) => {
    try {
        const formData = req.body
        const selectedTemplate = formData.template || 'base' // Default to 'base' if no template selected

        console.log('📝 Received form data:', formData)
        console.log('🎨 Selected template:', selectedTemplate)

        // Load the selected base PDF template
        const templatePath = join(__dirname, 'templates', `${selectedTemplate}.pdf`)
        console.log('📄 Loading template from:', templatePath)
        const existingPdfBytes = await readFile(templatePath)

        // Load the PDF document
        const pdfDoc = await PDFDocument.load(existingPdfBytes)

        // Register fontkit to enable custom font embedding
        pdfDoc.registerFontkit(fontkit)

        // Load Futura Cyrillic fonts (better support for Cyrillic characters)
        const futuraBookPath = join(__dirname, 'fonts', 'FuturaCyrillicBook.ttf')
        const futuraBoldPath = join(__dirname, 'fonts', 'FuturaCyrillicBold.ttf')
        const futuraDemiPath = join(__dirname, 'fonts', 'FuturaCyrillicDemi.ttf')

        const futuraBookBytes = await readFile(futuraBookPath)
        const futuraBoldBytes = await readFile(futuraBoldPath)
        const futuraDemiBytes = await readFile(futuraDemiPath)

        const regularFont = await pdfDoc.embedFont(futuraBookBytes)
        const boldFont = await pdfDoc.embedFont(futuraBoldBytes)
        const mediumFont = await pdfDoc.embedFont(futuraDemiBytes)

        // Get the first page
        const pages = pdfDoc.getPages()
        const firstPage = pages[0]
        const { width, height } = firstPage.getSize()

        console.log(`PDF dimensions: ${width} x ${height} points`)

        /**
         * FIELD POSITIONS CONFIGURATION FOR EACH TEMPLATE
         * 
         * PDF dimensions: A4 (841.89 x 1190.55 points)
         * Each template has different layout and requires different positioning
         */
        const textColor = rgb(55 / 255, 52 / 255, 53 / 255) // #373435
        
        // Define field positions for each template
        const templateConfigs = {
            // Template 1 (base) - Orange "40% ПОПУСТ" 
            base: [
                { x: 80, y: height - 250, fontSize: 260, font: boldFont, color: rgb(1, 1, 1) },
                { x: 80, y: height - 520, fontSize: 70, font: mediumFont, color: textColor },
                { x: 80, y: height - 650, fontSize: 120, font: boldFont, color: textColor },
                { x: 80, y: height - 840, fontSize: 230, font: boldFont, color: textColor },
                { x: 80, y: 260, fontSize: 50, font: mediumFont, color: textColor },
                { x: 80, y: 200, fontSize: 40, font: regularFont, color: textColor },
            ],
            
            // Template 2 (base1) - White/Orange "40% ПОПУСТ"
            base1: [
                { x: 80, y: height - 250, fontSize: 260, font: boldFont, color: rgb(1, 1, 1) },
                { x: 80, y: height - 560, fontSize: 70, font: mediumFont, color: textColor }, // Product name moved lower
                { x: 80, y: height - 650, fontSize: 120, font: boldFont, color: textColor }, // Original price (not used but kept for consistency)
                { x: 80, y: height - 760, fontSize: 230, font: boldFont, color: textColor }, // Discounted price moved up
                { x: 80, y: 340, fontSize: 64, font: mediumFont, color: textColor }, // Product code moved up
                { x: 80, y: 280, fontSize: 48, font: regularFont, color: textColor }, // Dimensions moved up
            ],
            
            // Template 3 (base2) - Yellow "BEST PRICE"
            base2: [
                { x: 80, y: height - 250, fontSize: 260, font: boldFont, color: rgb(1, 1, 1) },
                { x: 80, y: height - 620, fontSize: 70, font: mediumFont, color: textColor }, // Product name moved lower
                { x: 80, y: height - 660, fontSize: 120, font: boldFont, color: textColor }, // Original price (not used but kept for consistency)
                { x: 80, y: height - 810, fontSize: 230, font: boldFont, color: textColor }, // Discounted price moved up
                { x: 80, y: 300, fontSize: 64, font: mediumFont, color: textColor }, // Product code moved up
                { x: 80, y: 240, fontSize: 48, font: regularFont, color: textColor }, // Dimensions moved up
            ],
            
            // Template 4 (base3) - Yellow/White "BEST PRICE"
            base3: [
                { x: 80, y: height - 220, fontSize: 260, font: boldFont, color: rgb(1, 1, 1) }, // Moved up
                { x: 80, y: height - 460, fontSize: 100, font: mediumFont, color: rgb(1, 1, 1) }, // Moved up, white
                { x: 80, y: height - 600, fontSize: 120, font: boldFont, color: rgb(1, 1, 1) }, // Moved up, white
                { x: 80, y: height - 810, fontSize: 230, font: boldFont, color: rgb(1, 1, 1) }, // Moved up, white
                { x: 80, y: 300, fontSize: 50, font: mediumFont, color: rgb(1, 1, 1) }, // Moved up, white
                { x: 80, y: 240, fontSize: 40, font: regularFont, color: rgb(1, 1, 1) }, // Moved up, white
            ],
            
            // Template 5 (base4) - Orange "40% ПОПУСТ" (alt layout)
            base4: [
                { x: 80, y: height - 220, fontSize: 260, font: boldFont, color: rgb(1, 1, 1) }, // Moved up
                { x: 80, y: height - 530, fontSize: 70, font: mediumFont, color: textColor }, // Product name moved up
                { x: 80, y: height - 620, fontSize: 120, font: boldFont, color: textColor }, // Original price moved up (not used but kept for consistency)
                { x: 80, y: height - 730, fontSize: 230, font: boldFont, color: textColor }, // Discounted price moved up
                { x: 80, y: 340, fontSize: 90, font: mediumFont, color: textColor }, // Product code moved up
                { x: 80, y: 280, fontSize: 48, font: regularFont, color: textColor }, // Dimensions moved up
            ],
            
            // Template 6 (base5) - Green "TOP PRODUCT" (same as Template 8, with white text)
            base5: [
                { x: 170, y: height - 220, fontSize: 260, font: boldFont, color: rgb(1, 1, 1) }, // Moved up, white
                { x: 170, y: height - 530, fontSize: 70, font: mediumFont, color: rgb(1, 1, 1) }, // Product name moved up, white
                { x: 170, y: height - 620, fontSize: 120, font: boldFont, color: rgb(1, 1, 1) }, // Original price moved up, white (not used but kept for consistency)
                { x: 170, y: height - 680, fontSize: 180, font: boldFont, color: rgb(1, 1, 1) }, // Discounted price moved up, white
                { x: 170, y: 410, fontSize: 90, font: mediumFont, color: rgb(1, 1, 1) }, // Product code moved up, white
                { x: 170, y: 350, fontSize: 48, font: regularFont, color: rgb(1, 1, 1) }, // Dimensions moved up, white
            ],
            
            // Template 7 (base6) - Green/White "TOP PRODUCT" (same as Template 5)
            base6: [
                { x: 80, y: height - 220, fontSize: 260, font: boldFont, color: rgb(1, 1, 1) }, // Moved up
                { x: 80, y: height - 530, fontSize: 70, font: mediumFont, color: textColor }, // Product name moved up
                { x: 80, y: height - 620, fontSize: 120, font: boldFont, color: textColor }, // Original price moved up (not used but kept for consistency)
                { x: 80, y: height - 730, fontSize: 230, font: boldFont, color: textColor }, // Discounted price moved up
                { x: 80, y: 340, fontSize: 90, font: mediumFont, color: textColor }, // Product code moved up
                { x: 80, y: 280, fontSize: 48, font: regularFont, color: textColor }, // Dimensions moved up
            ],
            
            // Template 8 (base7) - Pink "СУПЕР COMBO" (same as Template 7, but with white text)
            base7: [
                { x: 80, y: height - 220, fontSize: 260, font: boldFont, color: rgb(1, 1, 1) }, // Moved up, white
                { x: 80, y: height - 530, fontSize: 70, font: mediumFont, color: rgb(1, 1, 1) }, // Product name moved up, white
                { x: 80, y: height - 620, fontSize: 120, font: boldFont, color: rgb(1, 1, 1) }, // Original price moved up, white (not used but kept for consistency)
                { x: 80, y: height - 730, fontSize: 230, font: boldFont, color: rgb(1, 1, 1) }, // Discounted price moved up, white
                { x: 80, y: 340, fontSize: 90, font: mediumFont, color: rgb(1, 1, 1) }, // Product code moved up, white
                { x: 80, y: 280, fontSize: 48, font: regularFont, color: rgb(1, 1, 1) }, // Dimensions moved up, white
            ],
        }

        // Get the field positions for the selected template
        const fieldPositions = templateConfigs[selectedTemplate] || templateConfigs.base

        // Draw each field on the PDF
        for (let i = 1; i <= 6; i++) {
            // Skip Field 1 (Discount Percentage) and Field 3 (Original Price) for Template 2 (base1), Template 3 (base2), Template 5 (base4), Template 6 (base5), Template 7 (base6), and Template 8 (base7)
            if ((i === 1 || i === 3) && (selectedTemplate === 'base1' || selectedTemplate === 'base2' || selectedTemplate === 'base4' || selectedTemplate === 'base5' || selectedTemplate === 'base6' || selectedTemplate === 'base7')) {
                continue
            }

            const fieldValue = formData[`field${i}`] || ''
            const position = fieldPositions[i - 1]

            if (fieldValue) {
                firstPage.drawText(fieldValue, {
                    x: position.x,
                    y: position.y,
                    size: position.fontSize,
                    font: position.font,
                    color: position.color, // Use custom color per field
                })

                // Add "МКД / MKD" label to the bottom right of price fields (3 and 4)
                if (i === 3 || i === 4) {
                    // Calculate approximate text width based on font size
                    // Rough estimate: fontSize * 0.6 for average character width
                    // For "800,-" or "480,-" with fontSize 120-230, width is approximately 300-600 points
                    const estimatedTextWidth = position.fontSize * fieldValue.length * 0.5
                    
                    // Position label at the right edge of the price text, moved more to the left
                    const labelX = position.x + estimatedTextWidth - 40
                    
                    // Position slightly below the price text (bottom right), moved more up
                    // Adjust based on font size - larger prices need more offset
                    const labelY = position.y - (position.fontSize * 0.1) + 15
                    
                    // Field 4 (discounted price) gets bigger font size than Field 3 (original price)
                    const labelFontSize = i === 4 ? 30 : 14
                    
                    // Use white color for Template 4 (base3), Template 6 (base5), and Template 8 (base7), otherwise use textColor
                    const labelColor = (selectedTemplate === 'base3' || selectedTemplate === 'base5' || selectedTemplate === 'base7') ? rgb(1, 1, 1) : textColor
                    
                    firstPage.drawText('МКД / MKD', {
                        x: labelX,
                        y: labelY,
                        size: labelFontSize,
                        font: boldFont, // Use bold font weight
                        color: labelColor,
                    })
                }
            }
        }

        // Serialize the PDF to bytes
        const pdfBytes = await pdfDoc.save()

        // Send the PDF as a response
        res.setHeader('Content-Type', 'application/pdf')
        res.setHeader('Content-Disposition', 'attachment; filename=generated.pdf')
        res.send(Buffer.from(pdfBytes))

        console.log('✓ PDF price tag generated successfully')

    } catch (error) {
        console.error('Error generating PDF:', error)
        res.status(500).json({
            error: 'Failed to generate PDF',
            message: error.message
        })
    }
})

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'Price Tag Generator Server is running' })
})

// Start the server
app.listen(PORT, () => {
    console.log(`🚀 Price Tag Generator Server running on http://localhost:${PORT}`)
    console.log(`📄 Ready to generate discount price tag PDFs`)
    console.log(`\nEndpoints:`)
    console.log(`  POST /api/generate-pdf - Generate price tag PDF from form data`)
    console.log(`  GET  /api/health - Health check`)
})

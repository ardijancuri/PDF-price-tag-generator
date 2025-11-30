import { readFile } from 'fs/promises'
import { PDFDocument, rgb } from 'pdf-lib'
import fontkit from '@pdf-lib/fontkit'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/**
 * Vercel Serverless Function for PDF Generation
 * 
 * This function receives form data with 6 fields and generates a discount price tag PDF
 * by overlaying the text on the base.pdf template.
 */
export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' })
    }

    try {
        const formData = req.body

        // Load the base PDF template
        const templatePath = join(__dirname, '..', 'server', 'templates', 'base.pdf')
        const existingPdfBytes = await readFile(templatePath)

        // Load the PDF document
        const pdfDoc = await PDFDocument.load(existingPdfBytes)

        // Register fontkit to enable custom font embedding
        pdfDoc.registerFontkit(fontkit)

        // Load Futura Cyrillic fonts (better support for Cyrillic characters)
        const futuraBookPath = join(__dirname, '..', 'server', 'fonts', 'FuturaCyrillicBook.ttf')
        const futuraBoldPath = join(__dirname, '..', 'server', 'fonts', 'FuturaCyrillicBold.ttf')
        const futuraDemiPath = join(__dirname, '..', 'server', 'fonts', 'FuturaCyrillicDemi.ttf')

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
         * FIELD POSITIONS CONFIGURATION
         * 
         * PDF dimensions: A4 (841.89 x 1190.55 points)
         * Positions configured to match final-pdf.pdf layout exactly
         */
        // Convert hex color #373435 to RGB (55, 52, 53)
        const textColor = rgb(55 / 255, 52 / 255, 53 / 255) // #373435

        const fieldPositions = [
            // Field 1 - Discount "40%" - HUGE bold WHITE text, top center of page
            { x: 80, y: height - 250, fontSize: 260, font: boldFont, color: rgb(1, 1, 1) }, // White text

            // Field 2 - Product name "КЕБЕ СО ДЕЗЕН" - Bold, large, centered
            { x: 80, y: height - 520, fontSize: 70, font: mediumFont, color: textColor },

            // Field 3 - Original price "800,-" - Bold, right side after МКД label
            { x: 80, y: height - 650, fontSize: 120, font: boldFont, color: textColor },

            // Field 4 - Discounted price "480,-" - Bold, right side after МКД label
            { x: 80, y: height - 840, fontSize: 230, font: boldFont, color: textColor },

            // Field 5 - Product code "246403" - Regular weight, bottom left
            { x: 80, y: 260, fontSize: 50, font: mediumFont, color: textColor },

            // Field 6 - Dimensions - Regular weight, below product code
            { x: 80, y: 200, fontSize: 40, font: regularFont, color: textColor },
        ]

        // Draw each field on the PDF
        for (let i = 1; i <= 6; i++) {
            const fieldValue = formData[`field${i}`] || ''
            const position = fieldPositions[i - 1]

            if (fieldValue) {
                firstPage.drawText(fieldValue, {
                    x: position.x,
                    y: position.y,
                    size: position.fontSize,
                    font: position.font,
                    color: position.color,
                })

                // Add "МКД / MKD" label to the bottom right of price fields (3 and 4)
                if (i === 3 || i === 4) {
                    const estimatedTextWidth = position.fontSize * fieldValue.length * 0.5
                    const labelX = position.x + estimatedTextWidth - 40
                    const labelY = position.y - (position.fontSize * 0.1) + 15
                    const labelFontSize = i === 4 ? 30 : 14
                    
                    firstPage.drawText('МКД / MKD', {
                        x: labelX,
                        y: labelY,
                        size: labelFontSize,
                        font: boldFont,
                        color: textColor,
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
}


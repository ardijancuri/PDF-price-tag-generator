/**
 * Health check endpoint for Vercel serverless function
 */
export default function handler(req, res) {
    res.status(200).json({ 
        status: 'OK', 
        message: 'Price Tag Generator Server is running',
        timestamp: new Date().toISOString(),
        environment: process.env.VERCEL_ENV || 'development'
    })
}


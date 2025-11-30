import { useState } from 'react'

function App() {
    // State for all 6 form fields
    const [formData, setFormData] = useState({
        field1: '', // Discount percentage
        field2: '', // Product name
        field3: '', // Original price
        field4: '', // Discounted price
        field5: '', // Product code
        field6: ''  // Dimensions
    })

    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [success, setSuccess] = useState(false)

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError(null)
        setSuccess(false)

        try {
            // Send form data to backend
            const response = await fetch('/api/generate-pdf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })

            if (!response.ok) {
                throw new Error('Failed to generate PDF')
            }

            // Get the PDF blob
            const blob = await response.blob()

            // Create a download link and trigger download
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = 'generated.pdf'
            document.body.appendChild(a)
            a.click()

            // Cleanup
            window.URL.revokeObjectURL(url)
            document.body.removeChild(a)

            setSuccess(true)
            setTimeout(() => setSuccess(false), 3000)
        } catch (err) {
            setError(err.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent mb-4">
                        Discount Price Tag Generator
                    </h1>
                    <p className="text-slate-600 text-lg">
                        Fill in the product details to generate a discount price tag PDF
                    </p>
                </div>

                {/* Main Form Card */}
                <div className="card">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Field 1 - Discount Percentage */}
                        <div className="group">
                            <label htmlFor="field1" className="block text-sm font-semibold text-slate-700 mb-2 group-hover:text-purple-600 transition-colors">
                                Discount Percentage 🏷️
                            </label>
                            <input
                                type="text"
                                id="field1"
                                name="field1"
                                value={formData.field1}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="e.g., 40%"
                            />
                        </div>

                        {/* Field 2 - Product Name */}
                        <div className="group">
                            <label htmlFor="field2" className="block text-sm font-semibold text-slate-700 mb-2 group-hover:text-purple-600 transition-colors">
                                Product Name
                            </label>
                            <input
                                type="text"
                                id="field2"
                                name="field2"
                                value={formData.field2}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="e.g., ЌЕБЕ СО ДЕЗЕН"
                            />
                        </div>

                        {/* Field 3 - Original Price */}
                        <div className="group">
                            <label htmlFor="field3" className="block text-sm font-semibold text-slate-700 mb-2 group-hover:text-purple-600 transition-colors">
                                Original Price (MKD) 💰
                            </label>
                            <input
                                type="text"
                                id="field3"
                                name="field3"
                                value={formData.field3}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="e.g., 800,-"
                            />
                        </div>

                        {/* Field 4 - Discounted Price */}
                        <div className="group">
                            <label htmlFor="field4" className="block text-sm font-semibold text-slate-700 mb-2 group-hover:text-purple-600 transition-colors">
                                Discounted Price (MKD) 🎉
                            </label>
                            <input
                                type="text"
                                id="field4"
                                name="field4"
                                value={formData.field4}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="e.g., 480,-"
                            />
                        </div>

                        {/* Field 5 - Product Code */}
                        <div className="group">
                            <label htmlFor="field5" className="block text-sm font-semibold text-slate-700 mb-2 group-hover:text-purple-600 transition-colors">
                                Product Code
                            </label>
                            <input
                                type="text"
                                id="field5"
                                name="field5"
                                value={formData.field5}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="e.g., 246403"
                            />
                        </div>

                        {/* Field 6 - Dimensions */}
                        <div className="group">
                            <label htmlFor="field6" className="block text-sm font-semibold text-slate-700 mb-2 group-hover:text-purple-600 transition-colors">
                                Dimensions 📏
                            </label>
                            <input
                                type="text"
                                id="field6"
                                name="field6"
                                value={formData.field6}
                                onChange={handleChange}
                                className="input-field"
                                placeholder="e.g., Димензии: 200 cm x 230 cm"
                            />
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg animate-pulse">
                                <p className="font-semibold">Error: {error}</p>
                            </div>
                        )}

                        {/* Success Message */}
                        {success && (
                            <div className="bg-green-50 border-2 border-green-200 text-green-700 px-4 py-3 rounded-lg animate-pulse">
                                <p className="font-semibold">✓ PDF generated successfully!</p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="pt-4">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="btn-primary w-full"
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Generating PDF...
                                    </span>
                                ) : (
                                    '📄 Generate Price Tag PDF'
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Footer Info */}
                <div className="mt-8 text-center text-sm text-slate-500">
                    <p>Your discount price tag PDF will be generated with "ПОПУСТ / ZBRITJE" header</p>
                </div>
            </div>
        </div>
    )
}

export default App

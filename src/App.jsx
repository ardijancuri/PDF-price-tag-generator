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
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            <div className="max-w-5xl mx-auto w-full">
                {/* Header */}
                <div className="text-center mb-8 md:mb-12">
                    <h1 className="text-5xl font-bold text-blue-600 leading-tight md:leading-relaxed mb-4">
                        Discount Price Tag Generator
                    </h1>
                    <p className="text-slate-600 text-lg">
                        Fill in the product details to generate a discount price tag PDF
                    </p>
                </div>

                {/* Main Form Card */}
                <div className="card">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Two Column Grid Layout */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Left Column - Fields 1, 2, 3 */}
                            <div className="space-y-6">
                                {/* Field 1 - Discount Percentage */}
                                <div className="group">
                                    <label htmlFor="field1" className="block text-sm font-semibold text-slate-700 mb-2 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                                        <i className="fas fa-tag text-blue-600"></i>
                                        Discount Percentage
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
                                    <label htmlFor="field2" className="block text-sm font-semibold text-slate-700 mb-2 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                                        <i className="fas fa-box text-blue-600"></i>
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
                                    <label htmlFor="field3" className="block text-sm font-semibold text-slate-700 mb-2 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                                        <i className="fas fa-dollar-sign text-blue-600"></i>
                                        Original Price (MKD)
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
                            </div>

                            {/* Right Column - Fields 4, 5, 6 */}
                            <div className="space-y-6">
                                {/* Field 4 - Discounted Price */}
                                <div className="group">
                                    <label htmlFor="field4" className="block text-sm font-semibold text-slate-700 mb-2 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                                        <i className="fas fa-percent text-blue-600"></i>
                                        Discounted Price (MKD)
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
                                    <label htmlFor="field5" className="block text-sm font-semibold text-slate-700 mb-2 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                                        <i className="fas fa-barcode text-blue-600"></i>
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
                                    <label htmlFor="field6" className="block text-sm font-semibold text-slate-700 mb-2 group-hover:text-blue-600 transition-colors flex items-center gap-2">
                                        <i className="fas fa-ruler-combined text-blue-600"></i>
                                        Dimensions
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
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-50 border-2 border-red-200 text-red-700 px-4 py-3 rounded-lg animate-pulse text-center">
                                <p className="font-semibold flex items-center justify-center gap-2">
                                    <i className="fas fa-exclamation-circle"></i>
                                    Error: {error}
                                </p>
                            </div>
                        )}

                        {/* Success Message */}
                        {success && (
                            <div className="bg-green-50 border-2 border-green-200 text-green-700 px-4 py-3 rounded-lg animate-pulse text-center">
                                <p className="font-semibold flex items-center justify-center gap-2">
                                    <i className="fas fa-check-circle"></i>
                                    PDF generated successfully!
                                </p>
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="pt-4 flex justify-center">
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="btn-primary w-full md:w-auto px-12"
                            >
                                {isLoading ? (
                                    <span className="flex items-center justify-center gap-3">
                                        <i className="fas fa-spinner fa-spin"></i>
                                        Generating PDF...
                                    </span>
                                ) : (
                                    <span className="flex items-center justify-center gap-2">
                                        <i className="fas fa-file-pdf"></i>
                                        Generate Price Tag PDF
                                    </span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>

                {/* Footer Info */}
                <div className="mt-8 text-center text-sm text-slate-500">
                    <p>
                        Powered by{' '}
                        <a 
                            href="https://oninova.net" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-700 font-semibold transition-colors"
                        >
                            ONINOVA
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default App

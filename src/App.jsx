import { useState } from 'react'

// Import all template images
import baseImg from './images/base.jpg'
import base1Img from './images/base1.jpg'
import base2Img from './images/base2.jpg'
import base3Img from './images/base3.jpg'
import base4Img from './images/base4.jpg'
import base5Img from './images/base5.jpg'
import base6Img from './images/base6.jpg'
import base7Img from './images/base7.jpg'
import comboLogo from './images/combo-logo.svg'

function App() {
    // Template definitions - Ordered for dashboard layout:
    // Row 1: 1, 2, 5, 7
    // Row 2: 4, 3, 6, 8
    const templates = [
        { id: 'base', name: 'Template 1 - Discount', image: baseImg },
        { id: 'base1', name: 'Template 2 - Best Price', image: base1Img },
        { id: 'base4', name: 'Template 3 - Top Product', image: base4Img },
        { id: 'base6', name: 'Template 4 - Super Combo', image: base6Img },
        { id: 'base3', name: 'Template 5 - Discount Alt', image: base3Img },
        { id: 'base2', name: 'Template 6 - Best Price Alt', image: base2Img },
        { id: 'base5', name: 'Template 7 - Top Product Alt', image: base5Img },
        { id: 'base7', name: 'Template 8 - Super Combo Alt', image: base7Img },
    ]

    // State for template selection
    const [selectedTemplate, setSelectedTemplate] = useState(null)
    const [step, setStep] = useState('select') // 'select' or 'form'

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

    // Handle template selection
    const handleTemplateSelect = (templateId) => {
        setSelectedTemplate(templateId)
        setStep('form')
    }

    // Handle back to template selection
    const handleBackToSelection = () => {
        setStep('select')
        setSelectedTemplate(null)
    }

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
            // Send form data to backend with selected template
            console.log('Sending to backend:', { ...formData, template: selectedTemplate })
            
            const response = await fetch('/api/generate-pdf', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    ...formData,
                    template: selectedTemplate
                }),
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
            <div className="max-w-7xl mx-auto w-full">
                {/* Header */}
                <div className="text-center mb-4 md:mb-12">
                    {step === 'select' ? (
                        <div className="mb-4 flex justify-center">
                            <img 
                                src={comboLogo} 
                                alt="COMBO Logo" 
                                className="h-10 md:h-14 w-auto"
                            />
                        </div>
                    ) : (
                        <h1 className="text-3xl md:text-5xl font-bold leading-snug md:leading-relaxed mb-4" style={{ color: '#E63425' }}>
                            Discount Price Tag Generator
                        </h1>
                    )}
                    <p className="text-slate-600 text-lg">
                        {step === 'select' 
                            ? 'Choose a template design for your price tag'
                            : 'Fill in the product details to generate a discount price tag PDF'
                        }
                    </p>
                </div>

                {/* Step 1: Template Selection */}
                {step === 'select' && (
                    <div className="space-y-8">
                        {/* Template Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {templates.map((template) => (
                                <div
                                    key={template.id}
                                    onClick={() => handleTemplateSelect(template.id)}
                                    className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
                                >
                                    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-slate-200 hover:shadow-2xl transition-all" onMouseEnter={(e) => e.currentTarget.style.borderColor = '#E63425'} onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgb(226 232 240)'}>
                                        {/* Template Image */}
                                        <div className="aspect-[3/4] overflow-hidden bg-slate-100">
                                            <img
                                                src={template.image}
                                                alt={template.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        {/* Template Name */}
                                        <div className="p-4 text-center bg-gradient-to-br from-slate-50 to-slate-50 transition-colors" onMouseEnter={(e) => { e.currentTarget.style.background = 'linear-gradient(to bottom right, rgba(230, 52, 37, 0.1), rgba(230, 52, 37, 0.05))' }} onMouseLeave={(e) => { e.currentTarget.style.background = 'linear-gradient(to bottom right, rgb(248 250 252), rgb(248 250 252))' }}>
                                            <h3 className="font-semibold text-slate-800 text-sm md:text-base">
                                                {template.name}
                                            </h3>
                                            <p className="text-xs text-slate-600 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                                Click to select
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 2: Form Input */}
                {step === 'form' && (
                    <>
                        {/* Back Button */}
                        <div className="mb-6">
                            <button
                                onClick={handleBackToSelection}
                                className="flex items-center gap-2 text-slate-600 transition-colors font-medium"
                                onMouseEnter={(e) => e.currentTarget.style.color = '#E63425'}
                                onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(71 85 105)'}
                            >
                                <i className="fas fa-arrow-left"></i>
                                Back to Template Selection
                            </button>
                        </div>

                        {/* Main Form Card */}
                        <div className="card">
                            {/* Selected Template Preview */}
                            <div className="mb-6 p-4 rounded-xl border-2" style={{ backgroundColor: 'rgba(230, 52, 37, 0.1)', borderColor: 'rgba(230, 52, 37, 0.3)' }}>
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-20 rounded-lg overflow-hidden shadow-md border-2" style={{ borderColor: 'rgba(230, 52, 37, 0.4)' }}>
                                        <img
                                            src={templates.find(t => t.id === selectedTemplate)?.image}
                                            alt="Selected template"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div>
                                        <p className="text-sm text-slate-600">Selected Template:</p>
                                        <p className="font-semibold" style={{ color: '#E63425' }}>
                                            {templates.find(t => t.id === selectedTemplate)?.name}
                                        </p>
                                    </div>
                                </div>
                            </div>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Two Column Grid Layout */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            {/* Left Column - Fields 1, 2, 3 */}
                            <div className="space-y-4 md:space-y-6">
                                {/* Field 1 - Discount Percentage (hidden for Template 2 - base1, Template 3 - base2, Template 5 - base4, Template 6 - base5, Template 7 - base6, and Template 8 - base7) */}
                                {selectedTemplate !== 'base1' && selectedTemplate !== 'base2' && selectedTemplate !== 'base4' && selectedTemplate !== 'base5' && selectedTemplate !== 'base6' && selectedTemplate !== 'base7' && (
                                    <div className="group">
                                        <label htmlFor="field1" className="block text-sm font-semibold text-slate-700 mb-2 transition-colors flex items-center gap-2" onMouseEnter={(e) => e.currentTarget.style.color = '#E63425'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(51 65 85)'}>
                                            <i className="fas fa-tag" style={{ color: '#E63425' }}></i>
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
                                )}

                                {/* Field 2 - Product Name */}
                                <div className="group">
                                        <label htmlFor="field2" className="block text-sm font-semibold text-slate-700 mb-2 transition-colors flex items-center gap-2" onMouseEnter={(e) => e.currentTarget.style.color = '#E63425'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(51 65 85)'}>
                                            <i className="fas fa-box" style={{ color: '#E63425' }}></i>
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

                                {/* Field 3 - Original Price (hidden for Template 2 - base1, Template 3 - base2, Template 5 - base4, Template 6 - base5, Template 7 - base6, and Template 8 - base7) */}
                                {selectedTemplate !== 'base1' && selectedTemplate !== 'base2' && selectedTemplate !== 'base4' && selectedTemplate !== 'base5' && selectedTemplate !== 'base6' && selectedTemplate !== 'base7' && (
                                    <div className="group">
                                        <label htmlFor="field3" className="block text-sm font-semibold text-slate-700 mb-2 transition-colors flex items-center gap-2" onMouseEnter={(e) => e.currentTarget.style.color = '#E63425'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(51 65 85)'}>
                                            <i className="fas fa-dollar-sign" style={{ color: '#E63425' }}></i>
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
                                )}
                            </div>

                            {/* Right Column - Fields 4, 5, 6 */}
                            <div className="space-y-4 md:space-y-6">
                                {/* Field 4 - Discounted Price */}
                                <div className="group">
                                    <label htmlFor="field4" className="block text-sm font-semibold text-slate-700 mb-2 transition-colors flex items-center gap-2" onMouseEnter={(e) => e.currentTarget.style.color = '#E63425'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(51 65 85)'}>
                                        <i className="fas fa-percent" style={{ color: '#E63425' }}></i>
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
                                    <label htmlFor="field5" className="block text-sm font-semibold text-slate-700 mb-2 transition-colors flex items-center gap-2" onMouseEnter={(e) => e.currentTarget.style.color = '#E63425'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(51 65 85)'}>
                                        <i className="fas fa-barcode" style={{ color: '#E63425' }}></i>
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
                                    <label htmlFor="field6" className="block text-sm font-semibold text-slate-700 mb-2 transition-colors flex items-center gap-2" onMouseEnter={(e) => e.currentTarget.style.color = '#E63425'} onMouseLeave={(e) => e.currentTarget.style.color = 'rgb(51 65 85)'}>
                                        <i className="fas fa-ruler-combined" style={{ color: '#E63425' }}></i>
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
                </>
                )}

                {/* Footer Info */}
                <div className="mt-8 text-center text-sm text-slate-500">
                    <p>
                        Powered by{' '}
                        <a 
                            href="https://oninova.net" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="font-semibold transition-colors"
                            style={{ color: '#E63425' }}
                            onMouseEnter={(e) => e.currentTarget.style.color = '#c42a1f'}
                            onMouseLeave={(e) => e.currentTarget.style.color = '#E63425'}
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

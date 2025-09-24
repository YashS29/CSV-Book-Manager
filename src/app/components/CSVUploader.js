'use client'

import { useState, useRef } from 'react'
import { Upload, FileText, Sparkles } from 'lucide-react'

export default function CSVUploader({ onFileUpload, onGenerateSample }) {
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef(null)

  const handleDragOver = (e) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    
    const files = e.dataTransfer.files
    if (files.length > 0 && files[0].type === 'text/csv') {
      onFileUpload(files[0])
    } else {
      alert('Please upload a valid CSV file')
    }
  }

  const handleFileSelect = (e) => {
    const file = e.target.files[0]
    if (file && file.type === 'text/csv') {
      onFileUpload(file)
    } else {
      alert('Please upload a valid CSV file')
    }
  }

  // Handler for sample CSV format card click
  const handleSampleFormatClick = () => {
    // You can customize this action - maybe show a modal, copy to clipboard, etc.
    const sampleFormat = "Title,Author,Genre,PublishedYear,ISBN\nThe Great Gatsby,F. Scott Fitzgerald,Fiction,1925,978-0-7432-7356-5"
    navigator.clipboard.writeText(sampleFormat).then(() => {
      alert('Sample CSV format copied to clipboard!')
    }).catch(() => {
      console.log('Sample CSV format:', sampleFormat)
      alert('Sample CSV format logged to console')
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 px-4 sm:px-6 lg:px-8">
      {/* Upload Area */}
      <div
        className={`upload-dropzone rounded-2xl border-2 border-dashed p-6 sm:p-8 md:p-12 text-center transition-all duration-300 cursor-pointer ${
          isDragOver 
            ? 'border-blue-400 bg-blue-50 scale-105' 
            : 'border-gray-300 hover:border-blue-400 hover:bg-blue-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <div className="space-y-4">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto backdrop-blur-sm">
            <Upload className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">Upload your CSV file</h3>
            <p className="text-blue-100 mb-4 text-sm sm:text-base px-4">Drag and drop your CSV file here, or click to browse</p>
            <div className="text-xs sm:text-sm text-blue-200 space-y-1">
              <p>Expected format: Title, Author, Genre, PublishedYear, ISBN</p>
              <p>Maximum file size: 50MB • Supports 10,000+ records</p>
            </div>
          </div>
        </div>
        
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-slate-50 text-gray-500 font-medium">or</span>
        </div>
      </div>

      {/* Content Grid - Responsive layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Generate Sample Data - Interactive Card */}
        <div 
          className="card text-center cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50 active:scale-95"
          onClick={onGenerateSample}
        >
          <div className="space-y-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mx-auto transition-transform duration-300 hover:rotate-12">
              <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-2">Try with Sample Data</h3>
              <p className="text-sm sm:text-base text-gray-600 mb-4">Generate 10,000 sample book records to test the application</p>
              <button
                className="btn-primary inline-flex items-center space-x-2 text-sm sm:text-base pointer-events-none"
              >
                <Sparkles className="w-4 h-4" />
                <span>Generate Sample Books</span>
              </button>
            </div>
          </div>
        </div>

        {/* Sample CSV Format - Interactive Card */}
        <div 
          className="card cursor-pointer transition-all duration-300 hover:shadow-lg hover:scale-105 hover:bg-blue-50 active:scale-95"
          onClick={handleSampleFormatClick}
        >
          <div className="flex items-start space-x-3">
            <FileText className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0 transition-transform duration-300 hover:rotate-12" />
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Expected CSV Format</h4>
              <div className="bg-gray-50 rounded-lg p-3 text-xs sm:text-sm font-mono overflow-x-auto">
                <div className="text-gray-600 mb-1 whitespace-nowrap">Title,Author,Genre,PublishedYear,ISBN</div>
                <div className="text-gray-800 whitespace-nowrap">The Great Gatsby,F. Scott Fitzgerald,Fiction,1925,978-0-7432-7356-5</div>
              </div>
              <p className="text-xs sm:text-sm text-gray-600 mt-2">
                Make sure your CSV file includes these exact column headers for proper processing.
              </p>
              <p className="text-xs text-blue-600 mt-2 font-medium">
                💡 Click to copy sample format to clipboard
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info Section - Mobile optimized */}
      <div className="bg-blue-50 rounded-xl p-4 sm:p-6 border border-blue-200">
        <h4 className="font-semibold text-blue-900 mb-3 text-sm sm:text-base">📋 Getting Started</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm text-blue-800">
          <div className="space-y-2">
            <p className="font-medium">✅ Supported Features:</p>
            <ul className="space-y-1 text-blue-700">
              <li>• Edit individual records</li>
              <li>• Filter and search data</li>
              <li>• Sort by any column</li>
              <li>• Export modified data</li>
            </ul>
          </div>
          <div className="space-y-2">
            <p className="font-medium">💡 Tips:</p>
            <ul className="space-y-1 text-blue-700">
              <li>• Use sample data to explore</li>
              <li>• Large files may take time to load</li>
              <li>• All edits are tracked visually</li>
              <li>• Download anytime as CSV</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
'use client'

import { Loader2 } from 'lucide-react'

export default function LoadingSpinner({ size = 'default', text = 'Loading...', progress = null }) {
  const sizeClasses = {
    small: 'w-4 h-4',
    default: 'w-8 h-8',
    large: 'w-12 h-12'
  }

  return (
    <div className="flex flex-col items-center justify-center space-y-4 p-8">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-blue-200 rounded-full"></div>
        <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
      </div>
      <div className="text-center">
        <p className="text-lg font-medium text-gray-900 mb-1">Processing your data</p>
        <p className="text-sm text-gray-600">{text}</p>
        {progress !== null && (
          <div className="mt-3">
            <div className="w-64 bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">{progress}% complete</p>
          </div>
        )}
      </div>
    </div>
  )
}
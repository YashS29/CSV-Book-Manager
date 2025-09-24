import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'CSV Book Manager',
  description: 'Upload, edit, and manage your book collection data',
  keywords: 'CSV, books, data management, editor',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 min-h-screen antialiased`}>
        <div className="min-h-screen flex flex-col">
          <header className="bg-white/90 backdrop-blur-sm shadow-lg border-b border-gray-200/50 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center py-4 sm:py-6 gap-4 sm:gap-0">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-red-300 via-red-500 to-red-700  rounded-xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-200">
  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
</div>
                  <div className="min-w-0">
                  <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-700 hover:text-emerald-800 tracking-tight transition-colors duration-300 cursor-pointer">
  CSV Book Manager
</h1>
                    <p className="text-xs sm:text-sm text-gray-600 mt-1 truncate sm:whitespace-normal">
                      Upload, edit, and manage your book collection
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-3">
                  <div className="hidden sm:flex items-center space-x-2 text-xs sm:text-sm text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="font-medium">Supports 10,000+ records</span>
                  </div>
                  <div className="sm:hidden text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-md">
                    10K+ records
                  </div>
                </div>
              </div>
            </div>
          </header>
          
          <main className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-4 lg:px-6 xl:px-8 py-4 sm:py-6 lg:py-8">
            <div className="animate-in fade-in-0 duration-500">
              {children}
            </div>
          </main>
          
          {/* Optional: Add a subtle footer for better visual balance */}
          <footer className="mt-auto bg-white/50 backdrop-blur-sm border-t border-gray-200/50">
            <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 xl:px-8 py-3 sm:py-4">
              <div className="text-center text-xs sm:text-sm text-gray-500">
                Manage your book collection with ease
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
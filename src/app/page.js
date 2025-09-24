'use client'

import { useState, useCallback, useMemo } from 'react'
import Papa from 'papaparse'
import CSVUploader from './components/CSVUploader'
import BookTable from './components/BookTable'
import FilterBar from './components/FilterBar'
import LoadingSpinner from './components/LoadingSpinner'
import { downloadCSV } from '../lib/csvUtils'
import { generateSampleBooks } from '../lib/bookGenerator'

export default function Home() {
  const [books, setBooks] = useState([])
  const [originalBooks, setOriginalBooks] = useState([])
  const [modifiedRows, setModifiedRows] = useState(new Set())
  const [loading, setLoading] = useState(false)
  const [fileName, setFileName] = useState('')
  const [filters, setFilters] = useState({
    search: '',
    genre: '',
    yearFrom: '',
    yearTo: '',
  })
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' })
  const [currentPage, setCurrentPage] = useState(1)
  const [recordsPerPage, setRecordsPerPage] = useState(50)

  // Filter and sort books
  const filteredAndSortedBooks = useMemo(() => {
    let filtered = books.filter(book => {
      const searchTerm = filters.search.toLowerCase()
      const matchesSearch = !searchTerm || 
        book.Title.toLowerCase().includes(searchTerm) ||
        book.Author.toLowerCase().includes(searchTerm) ||
        book.Genre.toLowerCase().includes(searchTerm) ||
        book.ISBN.toLowerCase().includes(searchTerm)
      
      const matchesGenre = !filters.genre || book.Genre === filters.genre
      const matchesYearFrom = !filters.yearFrom || parseInt(book.PublishedYear) >= parseInt(filters.yearFrom)
      const matchesYearTo = !filters.yearTo || parseInt(book.PublishedYear) <= parseInt(filters.yearTo)
      
      return matchesSearch && matchesGenre && matchesYearFrom && matchesYearTo
    })

    // Sort
    if (sortConfig.key) {
      filtered.sort((a, b) => {
        let aVal = a[sortConfig.key]
        let bVal = b[sortConfig.key]
        
        // Handle numeric sorting for PublishedYear
        if (sortConfig.key === 'PublishedYear') {
          aVal = parseInt(aVal) || 0
          bVal = parseInt(bVal) || 0
        } else {
          aVal = aVal.toString().toLowerCase()
          bVal = bVal.toString().toLowerCase()
        }
        
        if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1
        if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1
        return 0
      })
    }

    return filtered
  }, [books, filters, sortConfig])

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedBooks.length / recordsPerPage)
  const startIndex = (currentPage - 1) * recordsPerPage
  const paginatedBooks = filteredAndSortedBooks.slice(startIndex, startIndex + recordsPerPage)

  const handleFileUpload = useCallback(async (file) => {
    setLoading(true)
    try {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.errors.length > 0) {
            console.warn('CSV parsing errors:', results.errors)
          }
          
          // Add unique IDs and validate data
          const processedData = results.data.map((row, index) => ({
            id: `row_${index}`,
            Title: row.Title || '',
            Author: row.Author || '',
            Genre: row.Genre || '',
            PublishedYear: row.PublishedYear || '',
            ISBN: row.ISBN || '',
          }))
          
          setBooks(processedData)
          setOriginalBooks(JSON.parse(JSON.stringify(processedData)))
          setModifiedRows(new Set())
          setFileName(file.name)
          setCurrentPage(1)
          setLoading(false)
        },
        error: (error) => {
          console.error('Error parsing CSV:', error)
          setLoading(false)
        }
      })
    } catch (error) {
      console.error('Error reading file:', error)
      setLoading(false)
    }
  }, [])

  const generateSampleData = useCallback(() => {
    setLoading(true)
    setTimeout(() => {
      const sampleBooks = generateSampleBooks(10000)
      const processedData = sampleBooks.map((book, index) => ({
        id: `sample_${index}`,
        ...book
      }))
      
      setBooks(processedData)
      setOriginalBooks(JSON.parse(JSON.stringify(processedData)))
      setModifiedRows(new Set())
      setFileName('sample-books-10k.csv')
      setCurrentPage(1)
      setLoading(false)
    }, 100)
  }, [])

  const handleEditBook = useCallback((bookId, updatedBook) => {
    setBooks(prevBooks => 
      prevBooks.map(book => 
        book.id === bookId ? { ...book, ...updatedBook } : book
      )
    )
    
    // Track modified rows
    setModifiedRows(prev => new Set([...prev, bookId]))
  }, [])

  const handleDeleteBook = useCallback((bookId) => {
    setBooks(prevBooks => prevBooks.filter(book => book.id !== bookId))
    setModifiedRows(prev => {
      const newSet = new Set(prev)
      newSet.delete(bookId)
      return newSet
    })
  }, [])

  const handleSort = useCallback((key) => {
    setSortConfig(prevSort => ({
      key,
      direction: prevSort.key === key && prevSort.direction === 'asc' ? 'desc' : 'asc'
    }))
  }, [])

  const resetAllEdits = useCallback(() => {
    setBooks(JSON.parse(JSON.stringify(originalBooks)))
    setModifiedRows(new Set())
  }, [originalBooks])

  const handleDownload = useCallback(() => {
    if (books.length === 0) return
    
    const csvData = books.map(({ id, ...book }) => book) // Remove internal ID
    const filename = fileName ? fileName.replace('.csv', '_edited.csv') : 'edited_books.csv'
    downloadCSV(csvData, filename)
  }, [books, fileName])

  const uniqueGenres = useMemo(() => {
    const genres = [...new Set(books.map(book => book.Genre))].filter(Boolean)
    return genres.sort()
  }, [books])

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-96 px-4">
        <LoadingSpinner />
      </div>
    )
  }

  if (books.length === 0) {
    return (
      <div className="space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-8 safe-area-padding">
        <div className="text-center py-8 sm:py-12">
          <div className="max-w-md mx-auto">
            <div className="w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 sm:w-12 sm:h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Welcome to CSV Book Manager</h2>
            <p className="text-sm sm:text-base text-gray-600 mb-8 px-4">Upload your book collection CSV file or generate sample data to get started</p>
          </div>
        </div>
        
        <CSVUploader 
          onFileUpload={handleFileUpload} 
          onGenerateSample={generateSampleData}
        />
      </div>
    )
  }

  return (
    <div className="space-y-4 sm:space-y-6 px-4 sm:px-6 lg:px-8 safe-area-padding">
      {/* Stats and Actions Bar */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 sm:p-6">
        <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:items-center lg:justify-between">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 lg:flex lg:space-x-6 lg:gap-0">
            <div className="text-center">
              <div className="text-lg sm:text-2xl font-bold text-blue-600">{books.length.toLocaleString()}</div>
              <div className="text-xs sm:text-sm text-gray-500">Total Records</div>
            </div>
            <div className="text-center">
              <div className="text-lg sm:text-2xl font-bold text-green-600">{filteredAndSortedBooks.length.toLocaleString()}</div>
              <div className="text-xs sm:text-sm text-gray-500">Filtered</div>
            </div>
            <div className="text-center">
              <div className="text-lg sm:text-2xl font-bold text-orange-600">{modifiedRows.size}</div>
              <div className="text-xs sm:text-sm text-gray-500">Modified</div>
            </div>
            <div className="text-center">
              <div className="text-lg sm:text-2xl font-bold text-purple-600">{totalPages}</div>
              <div className="text-xs sm:text-sm text-gray-500">Pages</div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={resetAllEdits}
              disabled={modifiedRows.size === 0}
              className="btn-secondary disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
            >
              Reset All Edits
            </button>
            <button
              onClick={handleDownload}
              className="btn-primary w-full sm:w-auto"
            >
              Download CSV
            </button>
          </div>
        </div>
      </div>

      {/* Filters */}
      <FilterBar
        filters={filters}
        onFiltersChange={setFilters}
        genres={uniqueGenres}
        recordsPerPage={recordsPerPage}
        onRecordsPerPageChange={setRecordsPerPage}
      />

      {/* Table */}
      <BookTable
        books={paginatedBooks}
        modifiedRows={modifiedRows}
        onEdit={handleEditBook}
        onDelete={handleDeleteBook}
        onSort={handleSort}
        sortConfig={sortConfig}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
        totalRecords={filteredAndSortedBooks.length}
        startIndex={startIndex}
      />
    </div>
  )
}
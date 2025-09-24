'use client'

import { useState } from 'react'
import { Edit2, Trash2, ChevronUp, ChevronDown, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react'
import EditModal from './EditModal'

export default function BookTable({ 
  books, 
  modifiedRows, 
  onEdit, 
  onDelete, 
  onSort, 
  sortConfig,
  currentPage,
  totalPages,
  onPageChange,
  totalRecords,
  startIndex
}) {
  const [editingBook, setEditingBook] = useState(null)

  const getSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) {
      return <div className="w-4 h-4" />
    }
    return sortConfig.direction === 'asc' 
      ? <ChevronUp className="w-4 h-4" />
      : <ChevronDown className="w-4 h-4" />
  }

  const handleEdit = (book) => {
    setEditingBook(book)
  }

  const handleSaveEdit = (updatedBook) => {
    onEdit(editingBook.id, updatedBook)
    setEditingBook(null)
  }

  const handleDelete = (bookId) => {
    if (confirm('Are you sure you want to delete this book?')) {
      onDelete(bookId)
    }
  }

  const renderPageNumbers = () => {
    const pages = []
    const showPages = 5
    let startPage = Math.max(1, currentPage - Math.floor(showPages / 2))
    let endPage = Math.min(totalPages, startPage + showPages - 1)
    
    if (endPage - startPage < showPages - 1) {
      startPage = Math.max(1, endPage - showPages + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-md transition-colors ${
            i === currentPage
              ? 'bg-blue-600 text-white'
              : 'text-gray-700 hover:bg-gray-100'
          }`}
        >
          {i}
        </button>
      )
    }

    return pages
  }

  return (
    <>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        {/* Table Header */}
        <div className="px-4 sm:px-6 py-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-base sm:text-lg font-semibold text-gray-900">Book Collection</h3>
          <p className="text-xs sm:text-sm text-gray-600">
            Showing {startIndex + 1}-{Math.min(startIndex + books.length, totalRecords)} of {totalRecords.toLocaleString()} records
          </p>
        </div>

        {/* Desktop Table View - Hidden on mobile */}
        <div className="hidden lg:block overflow-x-auto scrollbar-thin">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => onSort('Title')}
                    className="flex items-center space-x-1 hover:text-gray-700"
                  >
                    <span>Title</span>
                    {getSortIcon('Title')}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => onSort('Author')}
                    className="flex items-center space-x-1 hover:text-gray-700"
                  >
                    <span>Author</span>
                    {getSortIcon('Author')}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => onSort('Genre')}
                    className="flex items-center space-x-1 hover:text-gray-700"
                  >
                    <span>Genre</span>
                    {getSortIcon('Genre')}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => onSort('PublishedYear')}
                    className="flex items-center space-x-1 hover:text-gray-700"
                  >
                    <span>Year</span>
                    {getSortIcon('PublishedYear')}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  <button
                    onClick={() => onSort('ISBN')}
                    className="flex items-center space-x-1 hover:text-gray-700"
                  >
                    <span>ISBN</span>
                    {getSortIcon('ISBN')}
                  </button>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {books.map((book, index) => {
                const isModified = modifiedRows.has(book.id)
                return (
                  <tr key={book.id} className={`hover:bg-gray-50 ${isModified ? 'bg-yellow-50' : ''}`}>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${isModified ? 'table-cell-modified' : ''}`}>
                      <div className="font-medium max-w-xs truncate" title={book.Title}>
                        {book.Title}
                      </div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${isModified ? 'table-cell-modified' : ''}`}>
                      <div className="max-w-xs truncate" title={book.Author}>
                        {book.Author}
                      </div>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${isModified ? 'table-cell-modified' : ''}`}>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {book.Genre}
                      </span>
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${isModified ? 'table-cell-modified' : ''}`}>
                      {book.PublishedYear}
                    </td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm text-gray-900 ${isModified ? 'table-cell-modified' : ''}`}>
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {book.ISBN}
                      </code>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => handleEdit(book)}
                          className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-50"
                          title="Edit book"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(book.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-50"
                          title="Delete book"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View - Visible only on mobile and tablet */}
        <div className="lg:hidden">
          <div className="px-4 sm:px-6 py-2 bg-gray-50 border-b border-gray-200">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => onSort('Title')}
                className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-md transition-colors ${
                  sortConfig.key === 'Title' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>Title</span>
                {getSortIcon('Title')}
              </button>
              <button
                onClick={() => onSort('Author')}
                className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-md transition-colors ${
                  sortConfig.key === 'Author' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>Author</span>
                {getSortIcon('Author')}
              </button>
              <button
                onClick={() => onSort('Genre')}
                className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-md transition-colors ${
                  sortConfig.key === 'Genre' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>Genre</span>
                {getSortIcon('Genre')}
              </button>
              <button
                onClick={() => onSort('PublishedYear')}
                className={`inline-flex items-center space-x-1 px-2 py-1 text-xs font-medium rounded-md transition-colors ${
                  sortConfig.key === 'PublishedYear' 
                    ? 'bg-blue-100 text-blue-800' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <span>Year</span>
                {getSortIcon('PublishedYear')}
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {books.map((book) => {
              const isModified = modifiedRows.has(book.id)
              return (
                <div key={book.id} className={`p-4 sm:p-6 hover:bg-gray-50 ${isModified ? 'bg-yellow-50 border-l-4 border-yellow-400' : ''}`}>
                  <div className="space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm sm:text-base font-medium text-gray-900 truncate pr-2" title={book.Title}>
                          {book.Title}
                        </h4>
                        <p className="text-sm text-gray-600 truncate" title={book.Author}>
                          by {book.Author}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2 flex-shrink-0">
                        <button
                          onClick={() => handleEdit(book)}
                          className="text-blue-600 hover:text-blue-900 p-2 rounded-full hover:bg-blue-50 transition-colors"
                          title="Edit book"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(book.id)}
                          className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition-colors"
                          title="Delete book"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-500">Genre:</span>
                        <div className="mt-1">
                          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {book.Genre}
                          </span>
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-500">Year:</span>
                        <p className="mt-1 font-medium text-gray-900">{book.PublishedYear}</p>
                      </div>
                    </div>
                    
                    <div>
                      <span className="text-gray-500 text-sm">ISBN:</span>
                      <div className="mt-1">
                        <code className="text-xs bg-gray-100 px-2 py-1 rounded block sm:inline-block break-all">
                          {book.ISBN}
                        </code>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-4 sm:px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0">
              <div className="text-xs sm:text-sm text-gray-700 order-2 sm:order-1">
                Page {currentPage} of {totalPages}
              </div>
              <div className="flex items-center space-x-1 sm:space-x-2 order-1 sm:order-2">
                <button
                  onClick={() => onPageChange(1)}
                  disabled={currentPage === 1}
                  className="p-1 sm:p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronsLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onPageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="p-1 sm:p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                
                <div className="flex items-center space-x-1">
                  {renderPageNumbers()}
                </div>
                
                <button
                  onClick={() => onPageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="p-1 sm:p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onPageChange(totalPages)}
                  disabled={currentPage === totalPages}
                  className="p-1 sm:p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronsRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {editingBook && (
        <EditModal
          book={editingBook}
          onSave={handleSaveEdit}
          onCancel={() => setEditingBook(null)}
        />
      )}
    </>
  )
}
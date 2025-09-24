'use client'

import { useState } from 'react'
import { X, Save, BookOpen } from 'lucide-react'

export default function EditModal({ book, onSave, onCancel }) {
  const [formData, setFormData] = useState({
    Title: book.Title,
    Author: book.Author,
    Genre: book.Genre,
    PublishedYear: book.PublishedYear,
    ISBN: book.ISBN,
  })

  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    
    if (!formData.Title.trim()) newErrors.Title = 'Title is required'
    if (!formData.Author.trim()) newErrors.Author = 'Author is required'
    if (!formData.Genre.trim()) newErrors.Genre = 'Genre is required'
    
    if (formData.PublishedYear && (isNaN(formData.PublishedYear) || formData.PublishedYear < 0)) {
      newErrors.PublishedYear = 'Please enter a valid year'
    }
    
    if (formData.ISBN && !/^[\d\-X]+$/.test(formData.ISBN.replace(/-/g, ''))) {
      newErrors.ISBN = 'Please enter a valid ISBN'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      onSave(formData)
    }
  }

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Edit Book</h2>
              <p className="text-sm text-gray-600">Update book information</p>
            </div>
          </div>
          <button
            onClick={onCancel}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title *
            </label>
            <input
              type="text"
              value={formData.Title}
              onChange={(e) => handleChange('Title', e.target.value)}
              className={`input-field ${errors.Title ? 'border-red-300 focus:ring-red-500' : ''}`}
              placeholder="Enter book title"
            />
            {errors.Title && <p className="mt-1 text-sm text-red-600">{errors.Title}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Author *
            </label>
            <input
              type="text"
              value={formData.Author}
              onChange={(e) => handleChange('Author', e.target.value)}
              className={`input-field ${errors.Author ? 'border-red-300 focus:ring-red-500' : ''}`}
              placeholder="Enter author name"
            />
            {errors.Author && <p className="mt-1 text-sm text-red-600">{errors.Author}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Genre *
            </label>
            <input
              type="text"
              value={formData.Genre}
              onChange={(e) => handleChange('Genre', e.target.value)}
              className={`input-field ${errors.Genre ? 'border-red-300 focus:ring-red-500' : ''}`}
              placeholder="Enter genre"
            />
            {errors.Genre && <p className="mt-1 text-sm text-red-600">{errors.Genre}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Published Year
            </label>
            <input
              type="number"
              value={formData.PublishedYear}
              onChange={(e) => handleChange('PublishedYear', e.target.value)}
              className={`input-field ${errors.PublishedYear ? 'border-red-300 focus:ring-red-500' : ''}`}
              placeholder="Enter publication year"
              min="0"
              max="2025"
            />
            {errors.PublishedYear && <p className="mt-1 text-sm text-red-600">{errors.PublishedYear}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              ISBN
            </label>
            <input
              type="text"
              value={formData.ISBN}
              onChange={(e) => handleChange('ISBN', e.target.value)}
              className={`input-field ${errors.ISBN ? 'border-red-300 focus:ring-red-500' : ''}`}
              placeholder="Enter ISBN"
            />
            {errors.ISBN && <p className="mt-1 text-sm text-red-600">{errors.ISBN}</p>}
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary inline-flex items-center space-x-2"
            >
              <Save className="w-4 h-4" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
'use client'

import { Search, Filter, RotateCcw } from 'lucide-react'

export default function FilterBar({ 
  filters, 
  onFiltersChange, 
  genres, 
  recordsPerPage, 
  onRecordsPerPageChange 
}) {
  const handleFilterChange = (key, value) => {
    onFiltersChange(prev => ({ ...prev, [key]: value }))
  }

  const clearAllFilters = () => {
    onFiltersChange({
      search: '',
      genre: '',
      yearFrom: '',
      yearTo: '',
    })
  }

  const hasActiveFilters = Object.values(filters).some(filter => filter !== '')

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-600" />
          <h3 className="text-lg font-semibold text-gray-900">Filters & Search</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="inline-flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {/* Search */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => handleFilterChange('search', e.target.value)}
              placeholder="Search title, author, genre, or ISBN..."
              className="input-field pl-10"
            />
          </div>
        </div>

        {/* Genre */}
        <div className="dropdown-container">
  <label className="block text-sm font-medium text-gray-700 mb-1">
    Genre
  </label>
  <select
    value={filters.genre}
    onChange={(e) => handleFilterChange('genre', e.target.value)}
    className="input-field enhanced-select"
  >
    <option value="">All Genres</option>
    {genres.map(genre => (
      <option key={genre} value={genre}>{genre}</option>
    ))}
  </select>
</div>

        {/* Year From */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Year From
          </label>
          <input
            type="number"
            value={filters.yearFrom}
            onChange={(e) => handleFilterChange('yearFrom', e.target.value)}
            placeholder="e.g. 1990"
            className="input-field"
            min="0"
            max="2025"
          />
        </div>

        {/* Year To */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Year To
          </label>
          <input
            type="number"
            value={filters.yearTo}
            onChange={(e) => handleFilterChange('yearTo', e.target.value)}
            placeholder="e.g. 2023"
            className="input-field"
            min="0"
            max="2025"
          />
        </div>

        {/* Records Per Page */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Per Page
          </label>
          <select
            value={recordsPerPage}
            onChange={(e) => onRecordsPerPageChange(Number(e.target.value))}
            className="input-field"
          >
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
            <option value={250}>250</option>
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-600 font-medium">Active filters:</span>
            <div className="flex flex-wrap gap-2">
              {filters.search && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  Search: "{filters.search}"
                </span>
              )}
              {filters.genre && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Genre: {filters.genre}
                </span>
              )}
              {filters.yearFrom && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  From: {filters.yearFrom}
                </span>
              )}
              {filters.yearTo && (
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  To: {filters.yearTo}
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
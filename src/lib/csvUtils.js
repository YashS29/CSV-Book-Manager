export const downloadCSV = (data, filename = 'data.csv') => {
  if (!data || data.length === 0) {
    console.warn('No data to download')
    return
  }

  // Get headers from first object
  const headers = Object.keys(data[0])
  
  // Convert data to CSV format
  const csvContent = [
    headers.join(','), // Header row
    ...data.map(row => 
      headers.map(header => {
        let cell = row[header] || ''
        // Escape quotes and wrap in quotes if contains comma, quote, or newline
        if (typeof cell === 'string' && (cell.includes(',') || cell.includes('"') || cell.includes('\n'))) {
          cell = `"${cell.replace(/"/g, '""')}"`
        }
        return cell
      }).join(',')
    )
  ].join('\n')

  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', filename)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }
}

export const validateCSVHeaders = (headers) => {
  const requiredHeaders = ['Title', 'Author', 'Genre', 'PublishedYear', 'ISBN']
  const missingHeaders = requiredHeaders.filter(header => !headers.includes(header))
  
  return {
    isValid: missingHeaders.length === 0,
    missingHeaders
  }
}





// /**
//  * CSV Utility Functions
//  * Handles CSV download, validation, and processing
//  */

// /**
//  * Downloads data as CSV file
//  * @param {Array} data - Array of objects to convert to CSV
//  * @param {string} filename - Name of the file to download
//  */
// export const downloadCSV = (data, filename = 'data.csv') => {
//   if (!data || data.length === 0) {
//     console.warn('No data to download')
//     alert('No data available to download')
//     return
//   }

//   try {
//     // Get headers from first object
//     const headers = Object.keys(data[0])
    
//     // Convert data to CSV format
//     const csvContent = [
//       headers.join(','), // Header row
//       ...data.map(row => 
//         headers.map(header => {
//           let cell = row[header] || ''
          
//           // Convert to string
//           cell = String(cell)
          
//           // Escape quotes and wrap in quotes if contains comma, quote, or newline
//           if (cell.includes(',') || cell.includes('"') || cell.includes('\n') || cell.includes('\r')) {
//             cell = `"${cell.replace(/"/g, '""')}"`
//           }
          
//           return cell
//         }).join(',')
//       )
//     ].join('\n')

//     // Create blob with UTF-8 BOM for proper Excel compatibility
//     const BOM = '\uFEFF'
//     const blob = new Blob([BOM + csvContent], { 
//       type: 'text/csv;charset=utf-8;' 
//     })
    
//     // Create download link
//     const link = document.createElement('a')
    
//     if (link.download !== undefined) {
//       const url = URL.createObjectURL(blob)
//       link.setAttribute('href', url)
//       link.setAttribute('download', filename)
//       link.style.visibility = 'hidden'
//       document.body.appendChild(link)
//       link.click()
//       document.body.removeChild(link)
      
//       // Clean up the URL object
//       setTimeout(() => URL.revokeObjectURL(url), 100)
      
//       console.log(`CSV file "${filename}" downloaded successfully`)
//     } else {
//       // Fallback for older browsers
//       alert('Your browser does not support automatic downloads. Please copy the CSV data manually.')
//     }
//   } catch (error) {
//     console.error('Error downloading CSV:', error)
//     alert('An error occurred while downloading the CSV file. Please try again.')
//   }
// }

// /**
//  * Validates CSV headers against required headers
//  * @param {Array} headers - Array of header strings from uploaded CSV
//  * @returns {Object} Validation result with isValid flag and missing headers
//  */
// export const validateCSVHeaders = (headers) => {
//   const requiredHeaders = ['Title', 'Author', 'Genre', 'PublishedYear', 'ISBN']
//   const normalizedHeaders = headers.map(h => h.trim())
//   const missingHeaders = requiredHeaders.filter(header => 
//     !normalizedHeaders.includes(header)
//   )
  
//   return {
//     isValid: missingHeaders.length === 0,
//     missingHeaders,
//     extraHeaders: normalizedHeaders.filter(header => 
//       !requiredHeaders.includes(header)
//     )
//   }
// }

// /**
//  * Processes raw CSV data and cleans it
//  * @param {Array} rawData - Raw CSV data from Papa Parse
//  * @returns {Array} Processed and cleaned data
//  */
// export const processCSVData = (rawData) => {
//   return rawData
//     .filter(row => {
//       // Filter out completely empty rows
//       return Object.values(row).some(value => 
//         value && value.toString().trim() !== ''
//       )
//     })
//     .map((row, index) => {
//       // Clean and normalize data
//       const cleanedRow = {
//         id: `row_${index}_${Date.now()}`, // Unique ID for React keys
//         Title: (row.Title || '').toString().trim(),
//         Author: (row.Author || '').toString().trim(),
//         Genre: (row.Genre || '').toString().trim(),
//         PublishedYear: (row.PublishedYear || '').toString().trim(),
//         ISBN: (row.ISBN || '').toString().trim()
//       }
      
//       // Validate year is numeric if provided
//       if (cleanedRow.PublishedYear && isNaN(cleanedRow.PublishedYear)) {
//         console.warn(`Invalid year "${cleanedRow.PublishedYear}" for "${cleanedRow.Title}" - keeping as is`)
//       }
      
//       return cleanedRow
//     })
// }

// /**
//  * Estimates CSV file size in bytes
//  * @param {Array} data - Array of objects
//  * @returns {number} Estimated size in bytes
//  */
// export const estimateCSVSize = (data) => {
//   if (!data || data.length === 0) return 0
  
//   // Estimate based on first few rows
//   const sampleSize = Math.min(10, data.length)
//   const sample = data.slice(0, sampleSize)
  
//   let totalSize = 0
//   const headers = Object.keys(data[0])
  
//   // Add header size
//   totalSize += headers.join(',').length + 1 // +1 for newline
  
//   // Add average row size * total rows
//   const avgRowSize = sample.reduce((sum, row) => {
//     const rowString = headers.map(h => row[h] || '').join(',')
//     return sum + rowString.length + 1 // +1 for newline
//   }, 0) / sampleSize
  
//   totalSize += avgRowSize * data.length
  
//   return Math.round(totalSize)
// }

// /**
//  * Formats file size in human readable format
//  * @param {number} bytes - Size in bytes
//  * @returns {string} Formatted size string
//  */
// export const formatFileSize = (bytes) => {
//   if (bytes === 0) return '0 Bytes'
  
//   const k = 1024
//   const sizes = ['Bytes', 'KB', 'MB', 'GB']
//   const i = Math.floor(Math.log(bytes) / Math.log(k))
  
//   return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
// }

// /**
//  * Validates individual book record
//  * @param {Object} book - Book object to validate
//  * @returns {Object} Validation result with errors
//  */
// export const validateBookRecord = (book) => {
//   const errors = {}
  
//   // Required fields
//   if (!book.Title || book.Title.trim() === '') {
//     errors.Title = 'Title is required'
//   }
  
//   if (!book.Author || book.Author.trim() === '') {
//     errors.Author = 'Author is required'
//   }
  
//   if (!book.Genre || book.Genre.trim() === '') {
//     errors.Genre = 'Genre is required'
//   }
  
//   // Year validation
//   if (book.PublishedYear) {
//     const year = parseInt(book.PublishedYear)
//     const currentYear = new Date().getFullYear()
    
//     if (isNaN(year)) {
//       errors.PublishedYear = 'Year must be a valid number'
//     } else if (year < -3000 || year > currentYear + 10) {
//       errors.PublishedYear = `Year must be between -3000 and ${currentYear + 10}`
//     }
//   }
  
//   // ISBN validation (basic)
//   if (book.ISBN) {
//     const isbn = book.ISBN.replace(/[-\s]/g, '')
//     if (isbn.length !== 10 && isbn.length !== 13) {
//       errors.ISBN = 'ISBN must be 10 or 13 digits'
//     } else if (!/^[\dX]+$/i.test(isbn)) {
//       errors.ISBN = 'ISBN can only contain digits and X'
//     }
//   }
  
//   return {
//     isValid: Object.keys(errors).length === 0,
//     errors
//   }
// }

// /**
//  * Converts array of objects to CSV string
//  * @param {Array} data - Array of objects
//  * @param {Array} headers - Optional array of headers to include
//  * @returns {string} CSV string
//  */
// export const arrayToCSV = (data, headers = null) => {
//   if (!data || data.length === 0) return ''
  
//   const finalHeaders = headers || Object.keys(data[0])
  
//   const csvRows = [
//     finalHeaders.join(','), // Header row
//     ...data.map(row => 
//       finalHeaders.map(header => {
//         let cell = row[header] || ''
//         cell = String(cell)
        
//         // Escape quotes and wrap in quotes if necessary
//         if (cell.includes(',') || cell.includes('"') || cell.includes('\n')) {
//           cell = `"${cell.replace(/"/g, '""')}"`
//         }
        
//         return cell
//       }).join(',')
//     )
//   ]
  
//   return csvRows.join('\n')
// }

// /**
//  * Creates a sample CSV file URL for download
//  * @returns {string} Blob URL for sample CSV
//  */
// export const createSampleCSVUrl = () => {
//   const sampleData = [
//     {
//       Title: 'The Great Gatsby',
//       Author: 'F. Scott Fitzgerald',
//       Genre: 'Fiction',
//       PublishedYear: '1925',
//       ISBN: '978-0-7432-7356-5'
//     },
//     {
//       Title: 'To Kill a Mockingbird',
//       Author: 'Harper Lee',
//       Genre: 'Fiction',
//       PublishedYear: '1960',
//       ISBN: '978-0-06-112008-4'
//     },
//     {
//       Title: '1984',
//       Author: 'George Orwell',
//       Genre: 'Science Fiction',
//       PublishedYear: '1949',
//       ISBN: '978-0-452-28423-4'
//     }
//   ]
  
//   const csvContent = arrayToCSV(sampleData)
//   const blob = new Blob(['\uFEFF' + csvContent], { 
//     type: 'text/csv;charset=utf-8;' 
//   })
  
//   return URL.createObjectURL(blob)
// }

// /**
//  * Parses CSV string to array of objects
//  * @param {string} csvString - CSV content as string
//  * @param {Object} options - Parsing options
//  * @returns {Promise} Promise that resolves to parsed data
//  */
// export const parseCSVString = (csvString, options = {}) => {
//   return new Promise((resolve, reject) => {
//     try {
//       // Simple CSV parser for basic use cases
//       const lines = csvString.trim().split('\n')
//       if (lines.length === 0) {
//         resolve([])
//         return
//       }
      
//       const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
//       const data = []
      
//       for (let i = 1; i < lines.length; i++) {
//         const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''))
//         const obj = {}
        
//         headers.forEach((header, index) => {
//           obj[header] = values[index] || ''
//         })
        
//         data.push(obj)
//       }
      
//       resolve(data)
//     } catch (error) {
//       reject(error)
//     }
//   })
// }

// // Export all functions as default object as well
// export default {
//   downloadCSV,
//   validateCSVHeaders,
//   processCSVData,
//   estimateCSVSize,
//   formatFileSize,
//   validateBookRecord,
//   arrayToCSV,
//   createSampleCSVUrl,
//   parseCSVString
// }
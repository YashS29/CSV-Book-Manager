// Sample data arrays for generating realistic book data
const titles = [
  'The Silent Echo', 'Midnight Revelations', 'The Crystal Prophecy', 'Shadows of Tomorrow',
  'The Quantum Garden', 'Whispers in the Dark', 'The Last Chronicle', 'Echoes of Eternity',
  'The Forgotten Kingdom', 'Starlight Memories', 'The Phoenix Rising', 'Dancing with Dragons',
  'The Mystic Portal', 'Secrets of the Deep', 'The Time Keeper', 'Chronicles of Fire',
  'The Silver Thread', 'Moonbeam Serenade', 'The Ancient Scrolls', 'Destiny\'s Child',
  'The Golden Compass', 'Rivers of Time', 'The Celestial Court', 'Whispered Promises',
  'The Dark Tower', 'Symphony of Stars', 'The Hidden Truth', 'Echoing Chambers',
  'The Emerald Crown', 'Twilight\'s End', 'The Sacred Grove', 'Dancing Shadows',
  'The Crystal Cave', 'Midnight Sun', 'The Lost Empire', 'Secrets Unveiled',
  'The Winged Serpent', 'Crimson Dawn', 'The Eternal Flame', 'Whispers of Wind',
  'The Obsidian Mirror', 'Stardust Dreams', 'The Final Quest', 'Echoes of War',
  'The Ruby Rose', 'Moonlit Path', 'The Sacred Bond', 'Dancing Flames',
  'The Diamond Throne', 'Sunset Boulevard', 'The Hidden Valley', 'Whispers of Hope',
  'The Sapphire Key', 'Crystal Waters', 'The Last Stand', 'Echoes of Love'
]

const authors = [
  'Alexandra Chen', 'Marcus Rodriguez', 'Sarah Thompson', 'David Kim',
  'Elena Volkov', 'James Patterson', 'Isabella Martinez', 'Ryan O\'Connor',
  'Priya Sharma', 'Michael Torres', 'Zoe Williams', 'Adam Foster',
  'Lila Patel', 'Nathan Brooks', 'Grace Liu', 'Sebastian Hayes',
  'Maya Johnson', 'Oliver Stone', 'Aria Blackwell', 'Lucas Gray',
  'Sophia Davis', 'Ethan Wright', 'Chloe Anderson', 'Noah Thompson',
  'Emma Wilson', 'Liam Brown', 'Ava Garcia', 'Mason Lee',
  'Olivia Taylor', 'Jacob Miller', 'Charlotte Jones', 'William Davis',
  'Amelia Rodriguez', 'Benjamin Wilson', 'Harper Martinez', 'Elijah Anderson',
  'Evelyn Thomas', 'Alexander Jackson', 'Abigail White', 'Henry Harris'
]

const genres = [
  'Fiction', 'Science Fiction', 'Fantasy', 'Mystery', 'Romance', 'Thriller',
  'Historical Fiction', 'Young Adult', 'Horror', 'Biography', 'Memoir',
  'Self-Help', 'Business', 'Psychology', 'Philosophy', 'Science',
  'Technology', 'Health', 'Cooking', 'Travel', 'Art', 'Music',
  'Sports', 'Politics', 'History', 'Religion', 'Spirituality',
  'Education', 'Parenting', 'Relationships'
]

// Generate random ISBN-13
const generateISBN = () => {
  const prefix = '978'
  const group = Math.floor(Math.random() * 10)
  const publisher = String(Math.floor(Math.random() * 99999)).padStart(5, '0')
  const title = String(Math.floor(Math.random() * 999)).padStart(3, '0')
  
  // Calculate check digit (simplified)
  const digits = (prefix + group + publisher + title).split('').map(Number)
  let sum = 0
  for (let i = 0; i < digits.length; i++) {
    sum += digits[i] * (i % 2 === 0 ? 1 : 3)
  }
  const checkDigit = (10 - (sum % 10)) % 10
  
  return `${prefix}-${group}-${publisher}-${title}-${checkDigit}`
}

// Generate random year between 1800 and 2024
const generateYear = () => {
  return Math.floor(Math.random() * (2024 - 1800 + 1)) + 1800
}

// Generate a single book
const generateBook = () => {
  return {
    Title: titles[Math.floor(Math.random() * titles.length)],
    Author: authors[Math.floor(Math.random() * authors.length)],
    Genre: genres[Math.floor(Math.random() * genres.length)],
    PublishedYear: generateYear().toString(),
    ISBN: generateISBN()
  }
}

// Generate multiple books with better performance
export const generateSampleBooks = (count = 1000) => {
  const books = []
  const usedCombinations = new Set()
  
  // Pre-calculate some random indices to improve performance
  const titleIndices = Array.from({length: count}, () => Math.floor(Math.random() * titles.length))
  const authorIndices = Array.from({length: count}, () => Math.floor(Math.random() * authors.length))
  const genreIndices = Array.from({length: count}, () => Math.floor(Math.random() * genres.length))
  
  for (let i = 0; i < count; i++) {
    let book
    let combination
    let attempts = 0
    const maxAttempts = 10 // Prevent infinite loops
    
    do {
      const titleIndex = attempts === 0 ? titleIndices[i] : Math.floor(Math.random() * titles.length)
      const authorIndex = attempts === 0 ? authorIndices[i] : Math.floor(Math.random() * authors.length)
      
      book = {
        Title: titles[titleIndex],
        Author: authors[authorIndex],
        Genre: genres[attempts === 0 ? genreIndices[i] : Math.floor(Math.random() * genres.length)],
        PublishedYear: generateYear().toString(),
        ISBN: generateISBN()
      }
      
      combination = `${book.Title}-${book.Author}`
      attempts++
    } while (usedCombinations.has(combination) && attempts < maxAttempts)
    
    // If we hit max attempts, just use the book anyway (for large datasets)
    usedCombinations.add(combination)
    books.push(book)
  }
  
  return books
}
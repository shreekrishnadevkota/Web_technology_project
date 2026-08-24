import React from 'react'

const SearchBar = () => {
  return (
        <div className="mt-3">
          <input
            type="text"
            placeholder="Search products..."
            className="flex items-center rounded-lg border border-gray-300 px-4 py-2 outline-none"
          />
        </div>
  )
}

export default SearchBar
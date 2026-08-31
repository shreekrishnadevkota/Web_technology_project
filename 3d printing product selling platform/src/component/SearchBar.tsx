import React from 'react'

const SearchBar = () => {
  return (
        <div className="mt-3 flex gap-1">
          <input
            type="text"
            placeholder="Search products..."
            className="flex items-center rounded-lg border border-gray-300 px-4 py-2 outline-none"
          />
          <button className='flex items-center rounded-lg border border-gray-300 px-4 py-2 outline-none bg-gray-300 hover:bg-gray-400'>Search</button>
        </div>
  )
}

export default SearchBar
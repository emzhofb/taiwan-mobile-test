import React from 'react';

export function SearchBox({ searchTerm, setSearchTerm }) {
  return (
    <div className="search-box">
      <input
        type="text"
        placeholder="🔍 Cari produk..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        aria-label="Cari produk"
      />
      {searchTerm && (
        <button 
          className="search-clear-btn" 
          onClick={() => setSearchTerm('')}
          aria-label="Clear search input"
        >
          &times;
        </button>
      )}
    </div>
  );
}

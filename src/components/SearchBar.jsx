import React, { useState } from "react"

export default function SearchBar({ onSearch }) {
    const [searchText, setSearchText] = useState('');

    const handleInputChange = (e) => {
        setSearchText(e.target.value);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            onSearch(searchText)
        }
    };

    const handleClearSearch = () => {
        setSearchText('')
        onSearch('')
    }

return (
    <div className="search-container">
        <input 
          type="text"
          placeholder="Search for posts..."
          value={searchText}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="search-bar-input"
        />
        {searchText && <button onClick={handleClearSearch} className="clear-button">X</button>}
        <button onClick={() => onSearch(searchText)} className="search-button">Search</button>
    </div>
    );
} 
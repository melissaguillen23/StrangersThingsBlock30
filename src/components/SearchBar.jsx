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

return (
    <div className="search-container">
        <input 
          type="text"
          placeholder="Search posts"
          value={searchText}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className="search-bar-input"
        />
    </div>
    );
} 
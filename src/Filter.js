import React, { useState } from "react";
import "./MapComponent.css";
import agenciesData from "./agencies.json";

function Search({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const handleInputChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);

    // Filter agencies that match the search term
    const filteredAgencies = agenciesData.agencies.filter((agency) =>
      agency.name.toLowerCase().includes(newSearchTerm.toLowerCase())
    );

    setSuggestions(filteredAgencies);
    setShowSuggestions(true);
  };

  const handleSearch = () => {
    onSearch(searchTerm); // Pass the search text to the parent component
  };
  const handleSuggestionClick = (agencyName) => {
    setSearchTerm(agencyName);
    setSuggestions([]); // Clear suggestions when a suggestion is selected
    setShowSuggestions(false); // Hide suggestions
  };

  const isInputEmpty = searchTerm.trim() === "";

  return (
    <div className="search-container">
      <div style={{ flexDirection: "column" }}>
        <input
          type="text"
          placeholder="Enter a location..."
          value={searchTerm}
          onChange={handleInputChange}
        />

        {isInputEmpty
          ? null
          : showSuggestions && (
              <ul className="suggestions">
                {suggestions.map((agency, index) => (
                  <li
                    key={index}
                    onClick={() => handleSuggestionClick(agency.name)}
                  >
                    {agency.name}
                  </li>
                ))}
              </ul>
            )}
      </div>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
}

export default Search;

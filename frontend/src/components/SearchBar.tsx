import React, { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string, searchBy: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("");
  const [searchBy, setSearchBy] = useState<string>("type");

  const handleSearch = () => {
    onSearch(query, searchBy);
  };

  return (
    <div className="flex items-center space-x-4 p-4">
      <select
        value={searchBy}
        onChange={(e) => setSearchBy(e.target.value)}
        className="p-2 border border-gray-300 rounded-md bg-white"
      >
        <option value="type">Search by Type</option>
        <option value="topic">Search by Topic</option>
      </select>
      <input
        type="text"
        placeholder={`Search content by ${searchBy}...`}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="p-2 w-full border border-gray-300 rounded-md"
      />
      <button
        onClick={handleSearch}
        className="p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;

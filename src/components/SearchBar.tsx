import React, { useState } from 'react';

interface SearchBarProps {
    onSearch: (query: string) => void;
}

// First time using React with Typescript, unsure if there are other ways of doing this
// but I read that React.FC is the way to go if we are using Typescript and want to pass props.
const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        // We do a check to see if the query is a whitespace
        if (query.trim()) {
            onSearch(query);
        }
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                value={query}
                //We update the state whenever the input value changes
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for TV shows"
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
};

export default SearchBar;

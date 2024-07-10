import React from 'react';
import { Link } from 'react-router-dom';

interface Show {
    show: {
        id: number;
        name: string;
        image: { medium: string };
        summary: string;
        rating: { average: number };
    };
}

interface SearchResultsProps {
    results: Show[];
}

//component for displaying our search results
const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
    return (
        <div className="search-results">
            {results.map(({ show }) => (
                <Link key={show.id} to={`/show/${show.id}`} className="show-card no-underline">
                    <img src={show.image?.medium} alt={show.name} />
                    <h3 className="show-name">{show.name}</h3>
                    <p className="show-rating">{show.rating.average ? `⭐ ${show.rating.average}` : 'No rating'}</p>
                </Link>
            ))}
        </div>
    );
};

export default SearchResults;

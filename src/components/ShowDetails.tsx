import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getShowDetails, searchShows } from '../services/api';
import SearchBar from '../components/SearchBar';
import { useSearch } from '../context/SearchContext';

const ShowDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [show, setShow] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { results, setResults } = useSearch();
    const navigate = useNavigate();

    useEffect(() => {
        getShowDetails(Number(id)).then((response) => {
            setShow(response.data);
        });
    }, [id]);

    if (!show) {
        return <div>Loading...</div>;
    }

    // Toggles the visibility of our modal
    const handleToggleModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    // Navigate back to the search results
    const handleBackToSearchResults = () => {
        navigate(-1);
    };

    // Our searchbar handler
    const handleSearch = async (query: string) => {
        const response = await searchShows(query);
        setResults(response.data);
        navigate('/');
    };

// Our component for displaying details about a specific movie
    return (
        <div className="show-details">
            <SearchBar onSearch={handleSearch} />
            <button onClick={handleBackToSearchResults} className="back-link">Back to Search Results</button>
            <div className="show-info">
                <div className="left">
                    <img src={show.image.original} alt={show.name} />
                </div>
                <div className="right">
                    <h1>{show.name}</h1>
                    <p>⭐ {show.rating.average || 'No rating'}</p>
                    <p><strong>Genres:</strong> {show.genres.join(', ')}</p>
                    <div dangerouslySetInnerHTML={{ __html: show.summary }} />
                </div>
            </div>
            <h2>Cast</h2>
            <ul className="cast-list">
                {show._embedded.cast.slice(0, 6).map((cast: any) => (
                    <li key={cast.person.id} className="cast-item">
                        <img src={cast.person.image?.medium} alt={cast.person.name} />
                        <p>{cast.person.name} as {cast.character.name}</p>
                    </li>
                ))}
            </ul>
            <button className="toggle-button" onClick={handleToggleModal}>
                See Full Cast
            </button>

            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close-button" onClick={handleToggleModal}>&times;</span>
                        <h2>Full Cast</h2>
                        <ul className="cast-list">
                            {show._embedded.cast.map((cast: any) => (
                                <li key={cast.person.id} className="cast-item">
                                    <img src={cast.person.image?.medium} alt={cast.person.name} />
                                    <p>{cast.person.name} as {cast.character.name}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ShowDetails;

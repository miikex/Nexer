import React, { useEffect, useState } from 'react';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import { searchShows, getSchedule } from '../services/api';
import { AxiosError } from 'axios';
import { useSearch } from '../context/SearchContext';

interface Show {
    show: {
        id: number;
        name: string;
        image: { medium: string };
        summary: string;
        rating: { average: number };
    };
}

// The home page component displaying the search bar and schedule
const HomePage: React.FC = () => {
    const { results, setResults } = useSearch();
    const [schedule, setSchedule] = useState<any[]>([]);
    const [error, setError] = useState('');

    useEffect(() => {
        getSchedule().then((response) => {
            setSchedule(response.data);
        }).catch((err: AxiosError) => {
            setError(err.message);
        });
    }, []);

    const handleSearch = async (query: string) => {
        try {
            const response = await searchShows(query);
            setResults(response.data);
            setError('');
        } catch (err) {
            if (err instanceof AxiosError && err.response) {
                setError(`Error: ${err.response.data.message}`);
            } else if (err instanceof Error) {
                setError(err.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    };

    return (
        <div className="home-page">
            <div className="search-container">
                <SearchBar onSearch={handleSearch} />
                {error && <div className="error">{error}</div>}
            </div>
            {results.length > 0 ? (
                <SearchResults results={results} />
            ) : (
                <div className="schedule">
                    <h2>Today's Schedule</h2>
                    <ul className="schedule-list">
                        {schedule.map((item) => (
                            <li key={item.id} className="schedule-item">
                                <img src={item.show.image?.medium} alt={item.show.name} />
                                <div>
                                    <h3>{item.show.name}</h3>
                                    <p>{item.airtime}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default HomePage;

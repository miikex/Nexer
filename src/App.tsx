import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ShowPage from './pages/ShowPage';
import { SearchProvider } from './context/SearchContext';
import './styles/App.css';

const App: React.FC = () => {
    return (
        <SearchProvider>
            <Router>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/show/:id" element={<ShowPage />} />
                </Routes>
            </Router>
        </SearchProvider>
    );
};

export default App;

import React, { createContext, useState, ReactNode, useContext } from 'react';

interface Show {
    show: {
        id: number;
        name: string;
        image: { medium: string };
        summary: string;
        rating: { average: number };
    };
}

interface SearchContextProps {
    results: Show[];
    setResults: (results: Show[]) => void;
}

const SearchContext = createContext<SearchContextProps | undefined>(undefined);

export const useSearch = () => {
    const context = useContext(SearchContext);
    if (!context) {
        throw new Error('useSearch must be used within SearchProvider');
    }
    return context;
};

export const SearchProvider = ({ children }: { children: ReactNode }) => {
    const [results, setResults] = useState<Show[]>([]);

    return (
        <SearchContext.Provider value={{ results, setResults }}>
            {children}
        </SearchContext.Provider>
    );
};

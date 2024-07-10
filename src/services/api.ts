import axios, { AxiosResponse } from 'axios';

const API_BASE_URL = 'https://api.tvmaze.com';

interface Show {
    show: {
        id: number;
        name: string;
        image: { medium: string };
        summary: string;
        rating: { average: number };
    };
}

// Search for shows
export const searchShows = (query: string): Promise<AxiosResponse<Show[]>> => {
    return axios.get<Show[]>(`${API_BASE_URL}/search/shows?q=${query}`);
};

// Get details for a specific show by ID
export const getShowDetails = (id: number): Promise<AxiosResponse<any>> => {
    return axios.get<any>(`${API_BASE_URL}/shows/${id}?embed=cast`);
};

// Get today's schedule
export const getSchedule = (): Promise<AxiosResponse<any[]>> => {
    const country = 'US';
    const date = new Date().toISOString().split('T')[0];
    return axios.get<any[]>(`${API_BASE_URL}/schedule?country=${country}&date=${date}`);
};

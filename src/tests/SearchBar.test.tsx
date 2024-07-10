import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SearchBar from '../components/SearchBar';

test('calls onSearch with the correct query', () => {
    const mockOnSearch = jest.fn();
    const { getByPlaceholderText, getByText } = render(<SearchBar onSearch={mockOnSearch} />);

    const input = getByPlaceholderText(/search for tv shows/i);
    const button = getByText(/search/i);

    fireEvent.change(input, { target: { value: 'Breaking Bad' } });
    fireEvent.click(button);

    expect(mockOnSearch).toHaveBeenCalledWith('Breaking Bad');
});

test('does not call onSearch with empty query', () => {
    const mockOnSearch = jest.fn();
    const { getByPlaceholderText, getByText } = render(<SearchBar onSearch={mockOnSearch} />);

    const input = getByPlaceholderText(/search for tv shows/i);
    const button = getByText(/search/i);

    fireEvent.change(input, { target: { value: ' ' } });
    fireEvent.click(button);

    expect(mockOnSearch).not.toHaveBeenCalled();
});

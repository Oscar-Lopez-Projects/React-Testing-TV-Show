import React from 'react';
import App from './App';
import userEvent from '@testing-library/user-event'
import { render, waitFor } from '@testing-library/react';
import {fetchShow as mockFetchShow} from  './api/fetchShow';

jest.mock('./api/fetchShow')

// I had to add the flow of the api and pass in all the props that are in episode in this array
const mockSeasons = {
    data: {
        name: "Oscar Lopez",
        summary: "Likes to play basketball and workout",
        image: {
            original: ""
        }
    ,
    _embedded: {
        episodes: [
            {
                season: 1,
                number: 1
            },
            {
                season: 1,
                number: 2
            },
            {
                season: 2,
                number: 1
            },
        ]
    } 
  }
};

test("clicking on the button fetches data and renders it to the DOM", async () => {
    // In this, I am mock the resolved data & rendering App
    mockFetchShow.mockResolvedValueOnce(mockSeasons);
    const { getByText, queryAllByRole } = render(<App />);

    //Here, it is await for the data to be fetched and Click the dropdown
    await waitFor(() => {});
    expect(mockFetchShow).toHaveBeenCalledTimes(1);
    userEvent.click(getByText(/select a season/i));

    // test the arrays to match the seasons
    const options = queryAllByRole(/option/i);
    expect(options).toHaveLength(2);
    expect(options[0]).toHaveTextContent("Season 1");
    expect(options[1]).toHaveTextContent("Season 2");
})

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ISearchState {
    searchValue: string;
    ageRating: number;
    rating: number;
    genre: string;
    city: string;
    cinema: string;
    date: string;
}

const initialState: ISearchState = {
    searchValue: '',
    ageRating: 0,
    genre: '',
    rating: 0,
    city: '',
    cinema: '',
    date: '',
};

const searchFilmSlice = createSlice({
    name: 'searchFilms',
    initialState,
    reducers: {
        setSearchValue(state, action: PayloadAction<string>) {
            state.searchValue = action.payload;
        },
        setAgeRating(state, action: PayloadAction<number>) {
            state.ageRating = action.payload;
        },
        setGenre(state, action: PayloadAction<string>) {
            state.genre = action.payload;
        },
        setRating(state, action: PayloadAction<number>) {
            state.rating = action.payload;
        },
        setCity(state, action: PayloadAction<string>) {
            state.city = action.payload;
        },
        setCinema(state, action: PayloadAction<string>) {
            state.cinema = action.payload;
        },
        setDate(state, action: PayloadAction<string>) {
            state.date = action.payload;
        },
    },
});

export default searchFilmSlice.reducer;
export const searchFilmSliceSliceActions = searchFilmSlice.actions;

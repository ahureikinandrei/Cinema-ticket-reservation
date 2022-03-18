import { ISearchState } from '../redux/search-films/reducer';

interface IFilmQueryParams {
    name: string;
    page: number;
    limit: number;
    freeSeats: number;
    city: string;
    cinema: string;
    age: number;
    genre: string;
    rating: number;
    date: string;
}

export const FilmDto = (
    searchParams: ISearchState,
    limit: number,
    page: number
): IFilmQueryParams => {
    const {
        searchValue,
        ageRating,
        genre,
        rating,
        city,
        cinema,
        date,
        freeSeats,
    } = searchParams;

    return {
        city,
        cinema,
        date,
        freeSeats,
        page,
        limit,
        genre,
        rating,
        name: searchValue,
        age: ageRating,
    };
};

import { ISearchState } from '../redux/search-films/reducer';

interface IFilmQueryParams {
    name: string;
    page: number;
    city: string;
    cinema: string;
    limit: number;
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
    const { searchValue, ageRating, genre, rating, city, cinema, date } =
        searchParams;

    return {
        city,
        cinema,
        date,
        page,
        limit,
        genre,
        rating,
        name: searchValue,
        age: ageRating,
    };
};

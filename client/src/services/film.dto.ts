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
}

export const FilmDto = (
    searchParams: ISearchState,
    limit: number,
    page: number
): IFilmQueryParams => {
    const { searchValue, ageRating, genre, rating, city, cinema } =
        searchParams;

    return {
        city,
        cinema,
        page,
        limit,
        genre,
        rating,
        name: searchValue,
        age: ageRating,
    };
};

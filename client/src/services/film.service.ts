import { AxiosResponse } from 'axios';
import axios from '../core/axios';
import {
    ALL_FILMS_PATH,
    FILMS_CREATE_PATH,
    FILMS_PATH,
} from '../constants/routes';
import { UNEXPECTED_ERROR } from '../constants/messages';
import { IFilm, IFilmsWithPagination } from './types';
import { ISearchState } from '../redux/search-films/reducer';

export default class FilmService {
    static async createFilm(filmData: FormData): Promise<string | null> {
        try {
            await axios.post(FILMS_CREATE_PATH, filmData);
        } catch (e) {
            if (e.response) {
                return e.response.data?.message || UNEXPECTED_ERROR;
            }
        }
        return null;
    }

    static getAllFilms(): Promise<AxiosResponse<IFilm[]>> {
        return axios.get(ALL_FILMS_PATH);
    }

    static getFilms(
        page: number,
        limit: number,
        searchParams: ISearchState
    ): Promise<AxiosResponse<IFilmsWithPagination>> {
        const { searchValue, ageRating, genre } = searchParams;
        return axios.get(FILMS_PATH, {
            params: {
                page,
                limit,
                genre,
                name: searchValue,
                age: ageRating,
            },
        });
    }

    static getFilmById(id = ''): Promise<AxiosResponse<IFilm>> {
        return axios.get(FILMS_PATH + id);
    }
}

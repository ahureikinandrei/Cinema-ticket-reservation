import { AxiosResponse } from 'axios';
import axios from '../core/axios';
import { FILMS_CREATE_PATH, FILMS_PATH } from '../constants/routes';
import { UNEXPECTED_ERROR } from '../constants/messages';
import { IFilm } from './types';

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

    static getFilms(): Promise<AxiosResponse<IFilm[]>> {
        return axios.get(FILMS_PATH);
    }

    static getFilmById(id = ''): Promise<AxiosResponse<IFilm>> {
        return axios.get(FILMS_PATH + id);
    }
}

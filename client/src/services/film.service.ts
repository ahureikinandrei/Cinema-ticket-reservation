import axios from '../core/axios';
import { FILMS_PATH } from '../constants/routes';
import { UNEXPECTED_ERROR } from '../constants/messages';

export default class FilmService {
    static async createFilm(filmData: FormData): Promise<string | null> {
        try {
            await axios.post(FILMS_PATH, filmData);
        } catch (e) {
            if (e.response) {
                return e.response.data?.message || UNEXPECTED_ERROR;
            }
        }
        return null;
    }
}

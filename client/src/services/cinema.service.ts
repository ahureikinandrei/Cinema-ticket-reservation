import { AxiosResponse } from 'axios';
import axios from '../core/axios';
import { ALL_CINEMA_PATH, CINEMA_CREATE_PATH } from '../constants/routes';
import { UNEXPECTED_ERROR } from '../constants/messages';
import { ICreateCinemaData, ICinemaData } from './types';

export default class CinemaService {
    static async createCinema(data: ICreateCinemaData): Promise<string | null> {
        try {
            await axios.post(CINEMA_CREATE_PATH, data);
        } catch (e) {
            if (e.response) {
                return e.response.data?.message || UNEXPECTED_ERROR;
            }
        }
        return null;
    }

    static getAllCinema(): Promise<AxiosResponse<ICinemaData[]>> {
        return axios.get(ALL_CINEMA_PATH);
    }
}

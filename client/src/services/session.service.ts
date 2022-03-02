import { AxiosResponse } from 'axios';
import axios from '../core/axios';
import { UNEXPECTED_ERROR } from '../constants/messages';
import {
    ALL_SESSIONS_PATH,
    CREATE_SESSION_PATH,
    SESSIONS_BY_FILM_PATH,
} from '../constants/routes';
import { ICreateSessionData, ISessionData } from './types';

export default class SessionService {
    static async createSession(
        sessionData: ICreateSessionData
    ): Promise<string | null> {
        try {
            await axios.post<AxiosResponse<ISessionData>>(
                CREATE_SESSION_PATH,
                sessionData
            );
        } catch (e) {
            if (e.response) {
                return e.response.data?.message || UNEXPECTED_ERROR;
            }
        }
        return null;
    }

    static getAllSessions(): Promise<AxiosResponse<ISessionData[]>> {
        return axios.get(ALL_SESSIONS_PATH);
    }

    static async getSessionById(id = ''): Promise<AxiosResponse<ISessionData>> {
        const response = await axios.get(ALL_SESSIONS_PATH + id);
        console.log(response);
        return response;
    }

    static getSessionsByFilmsId(
        id = ''
    ): Promise<AxiosResponse<ISessionData[]>> {
        return axios.get(SESSIONS_BY_FILM_PATH + id);
    }
}

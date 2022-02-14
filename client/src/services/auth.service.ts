import { AxiosResponse } from 'axios';
import axios from '../core/axios';
import { UserData } from '../redux/actions/types';
import { LOGIN_PATH, REGISTRATION_PATH, AUTH_PATH } from '../constants/routes';
import { IAuthData } from './types';

export default class AuthService {
    static createUser(userData: UserData): Promise<AxiosResponse<IAuthData>> {
        return axios.post(REGISTRATION_PATH, userData);
    }

    static loginUser(userData: UserData): Promise<AxiosResponse<IAuthData>> {
        return axios.post(LOGIN_PATH, userData);
    }

    static authUser(token: string): Promise<AxiosResponse<IAuthData>> {
        return axios.post(AUTH_PATH, { token });
    }
}

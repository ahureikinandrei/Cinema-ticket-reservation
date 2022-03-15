import axios from '../core/axios';
import { USER_GET_BY_ID_PATH } from '../constants/routes';
import { IUser } from '../models/IUser';
import { UNEXPECTED_ERROR } from '../constants/messages';

export default class UserService {
    static async getUser(id = ''): Promise<IUser | string> {
        try {
            const user = await axios.get<IUser>(USER_GET_BY_ID_PATH + id);
            return user.data;
        } catch (error) {
            if (error.isAxiosError) {
                return error.response.data?.message || UNEXPECTED_ERROR;
            }
            return UNEXPECTED_ERROR;
        }
    }
}

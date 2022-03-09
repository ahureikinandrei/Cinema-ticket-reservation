import { AxiosResponse } from 'axios';
import axios from '../core/axios';
import { ORDER_CREATE_PATH } from '../constants/routes';
import { UNEXPECTED_ERROR } from '../constants/messages';
import { ISeatFullInfo } from '../redux/order/reducer';

export default class HallService {
    static async createOrder(data: ISeatFullInfo[]): Promise<string> {
        try {
            return await axios.post(ORDER_CREATE_PATH, data);
        } catch (e) {
            if (e.response) {
                return e.response.data?.message || UNEXPECTED_ERROR;
            }
            return '';
        }
    }
}

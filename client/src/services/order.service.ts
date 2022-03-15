import { AxiosResponse } from 'axios';
import axios from '../core/axios';
import { ORDER_CREATE_PATH } from '../constants/routes';
import { UNEXPECTED_ERROR } from '../constants/messages';
import { IOrder } from './types';
import { ISeatFullInfo } from '../redux/order/reducer';

export default class OrderService {
    static async createOrder(
        data: ISeatFullInfo[],
        sessionID: string,
        priceID: string
    ): Promise<AxiosResponse<IOrder> | string> {
        const dto = {
            session: sessionID,
            seats: data,
            priceID,
        };

        try {
            return await axios.post(ORDER_CREATE_PATH, dto);
        } catch (e) {
            if (e.response) {
                return e.response.data?.message || UNEXPECTED_ERROR;
            }
            return UNEXPECTED_ERROR;
        }
    }
}

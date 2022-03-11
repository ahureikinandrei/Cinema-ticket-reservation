import axios from '../core/axios';
import { IPriceCreateData, IPriceData } from './types';
import { PRICE_CREATE_PATH } from '../constants/routes';

export default class PriceServiceService {
    static async createPrice(
        priceData: IPriceCreateData
    ): Promise<string | null> {
        try {
            const response = await axios.post<IPriceData>(
                PRICE_CREATE_PATH,
                priceData
            );
            return response.data._id;
        } catch (e) {
            return null;
        }
    }
}

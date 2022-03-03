import { AxiosResponse } from 'axios';
import axios from '../core/axios';
import { ICreatHallSchemaData, IHallData } from './types';
import { ALL_HALL_PATH, HALL_CREATE_PATH } from '../constants/routes';
import { UNEXPECTED_ERROR } from '../constants/messages';

export default class HallService {
    static async createHall(
        data: ICreatHallSchemaData
    ): Promise<string | null> {
        try {
            await axios.post(HALL_CREATE_PATH, data);
        } catch (e) {
            if (e.response) {
                return e.response.data?.message || UNEXPECTED_ERROR;
            }
        }
        return null;
    }

    static getAllHalls(): Promise<AxiosResponse<IHallData[]>> {
        return axios.get(ALL_HALL_PATH);
    }
}

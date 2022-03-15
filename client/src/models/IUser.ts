import { IOrderResponse } from '../services/types';

export interface IUser {
    id: string;
    email: string;
    role: string;
    orders: IOrderResponse[];
}

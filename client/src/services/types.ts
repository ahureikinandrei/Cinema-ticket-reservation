import { IUser } from '../models/IUser';

export interface IAuthData {
    user: IUser;
    token: string;
}

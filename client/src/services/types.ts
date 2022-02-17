import { IUser } from '../models/IUser';

export interface IAuthData {
    user: IUser;
    token: string;
}

export interface IFilm {
    _id: string;
    age: string;
    description: string;
    endDate: string;
    genre: string;
    img: string;
    name: string;
    startDate: string;
    rating: string;
}

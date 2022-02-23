import { IUser } from '../models/IUser';

export interface IAuthData {
    user: IUser;
    token: string;
}

export interface IFilm {
    _id: string;
    age: number;
    description: string;
    endDate: string;
    genre: string;
    img: string;
    name: string;
    startDate: string;
    rating: string;
}

export interface IFilmsWithPagination {
    films: IFilm[];
    total: number;
}

export interface ICinemaData {
    _id: string;
    name: string;
    city: string;
}

export interface ICreateCinemaData {
    name: string;
    city: string;
}

export interface ISessionData {
    _id: string;
    date: string;
    time: string;
    film: IFilm;
    cinema: ICinemaData;
}

export interface ICreateSessionData {
    date: string;
    time: string;
    film: string;
    cinema: string;
}

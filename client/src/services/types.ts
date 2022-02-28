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
    hall: IHallData;
    price: string;
}

export interface ICreateSessionData {
    date: string;
    time: string;
    film: string;
    cinema: string;
    hall: string;
    price: string;
}

export interface ISeat {
    type: number;
    size: number;
}

export interface ICreatHallSchemaData {
    name: string;
    schema: Array<ISeat[]>;
    rowSize: number;
}

export interface IHallData {
    _id: string;
    name: string;
    schema: Array<ISeat[]>;
    rowSize: number;
}

export interface IPriceCreateData {
    seatPrice: {
        simple: number;
        love: number;
        prime: number;
    };
}

export interface IPriceData {
    _id: string;
    seatPrice: {
        simple: number;
        love: number;
        prime: number;
    };
    seatsStatus: Array<boolean[]>;
}

import { IUser } from '../models/IUser';
import { ISeatFullInfo } from '../redux/order/reducer';

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
    price: IPriceData;
}

export interface ICreateSessionData {
    date: string;
    time: string;
    film: string;
    cinema: string;
    price: string;
    freeSeats: number;
}

export interface ISeat {
    type: number;
    size: number;
    isBought: boolean;
    _id: string;
}

export interface ICreateSeat {
    type: number;
    size: number;
}

export interface ICreatHallSchemaData {
    name: string;
    schema: Array<ICreateSeat[]>;
    rowSize: number;
}

export interface IHallData {
    _id: string;
    name: string;
    schema: Array<ISeat[]>;
    rowSize: number;
}

export interface ISeatPrice {
    simple: number;
    love: number;
    prime: number;
}

export interface IPriceCreateData {
    seatPrice: ISeatPrice;
    seatsStatus: Array<ISeat[]>;
    rowSize: number;
}

export interface IPriceData {
    _id: string;
    seatPrice: ISeatPrice;
    seatsStatus: Array<ISeat[]>;
    rowSize: number;
}

export interface IOrder {
    session: string;
    seats: ISeatFullInfo[];
}

export interface IOrderResponse {
    _id: string;
    session: ISessionData;
    seats: ISeatFullInfo[];
}

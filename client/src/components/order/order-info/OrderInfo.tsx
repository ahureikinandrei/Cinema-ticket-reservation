import React, { FC } from 'react';
import { Image } from 'react-bootstrap';
import { ISeatFullInfo } from '../../../redux/order/reducer';
import { IFilm } from '../../../services/types';
import { SEAT_TYPES } from '../../../constants/filmConstants';
import { BASE_URL } from '../../../constants/baseUrl';
import style from './orderInfo.module.scss';

interface IOrderInfoProps {
    seats: ISeatFullInfo[];
    film: IFilm;
    date: string;
    time: string;
}

const OrderInfo: FC<IOrderInfoProps> = ({ film, seats, date, time }) => {
    return (
        <div className={style.order}>
            <div className={style.order__info}>
                {film.name}
                <span>
                    {date} {time}
                </span>
                {seats.map(({ row, seat, type, _id }) => {
                    return (
                        <div key={_id} className={style.order__seat}>
                            Row: {row} Seat: {seat} Type: {SEAT_TYPES[type]}
                        </div>
                    );
                })}
            </div>
            <Image width={55} height={81} src={`${BASE_URL}/${film.img}`} />
        </div>
    );
};

export default OrderInfo;

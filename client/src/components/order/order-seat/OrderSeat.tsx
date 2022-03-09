import React, { FC } from 'react';
import style from './orderSeat.module.scss';

interface IOrderSeat {
    row: number;
    seat: number;
}

const OrderSeat: FC<IOrderSeat> = ({ row, seat }) => {
    return (
        <div className={style.seatInfo}>
            <span>Row: {row}</span>
            <span>Seat: {seat}</span>
            <div className={style.type} />
        </div>
    );
};

export default OrderSeat;

import React, { ReactElement } from 'react';
import { SeatsTypes, seatsTypes } from '../seats-types';
import style from '../hall.module.scss';

const Seat = (
    // eslint-disable-next-line default-param-last
    type = SeatsTypes.empty,
    isBought: boolean,
    isReserved: boolean,
    isReservedOtherUser: boolean,
    reserveSeat: () => void
): ReactElement => {
    if (isBought) {
        return <div className={style.seat_bought}>{seatsTypes[type]}</div>;
    }

    if (isReserved) {
        return (
            <div className={style.seat_reserved} onClick={reserveSeat}>
                {seatsTypes[type]}
            </div>
        );
    }

    if (isReservedOtherUser) {
        return (
            <div className={style.seat_reservedOtherUser}>
                {seatsTypes[type]}
            </div>
        );
    }

    return <div onClick={reserveSeat}>{seatsTypes[type]}</div>;
};

export default Seat;

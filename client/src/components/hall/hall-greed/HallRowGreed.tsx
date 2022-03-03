import React, { ReactElement } from 'react';
import { ICreateSeat } from '../../../services/types';
import style from '../hall.module.scss';
import { seatsTypes } from '../seats-types';

const HallRowGreed = (
    rowData: ICreateSeat[],
    greedWidth: number
): ReactElement[] => {
    const basis = 100 / greedWidth;
    return rowData.map((seat, index) => {
        const { size, type } = seat;

        return (
            <div
                key={index}
                className={style.seat_border}
                style={{ flexBasis: `${basis * size}%` }}
            >
                {seatsTypes[type]}
            </div>
        );
    });
};

export default HallRowGreed;

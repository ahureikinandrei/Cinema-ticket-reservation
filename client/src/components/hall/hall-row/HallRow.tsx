import React, { ReactElement } from 'react';
import { ISeat } from '../../../services/types';
import style from '../hall.module.scss';
import { seatsTypes } from '../seats-types';

const HallRow = (rowData: ISeat[], greedWidth: number): ReactElement[] => {
    const basis = 100 / greedWidth;
    return rowData.map((seat, index) => {
        const { size, type } = seat;

        return (
            <div
                key={index}
                className={style.seat}
                style={{ flexBasis: `${basis * size}%` }}
            >
                {seatsTypes[type]}
            </div>
        );
    });
};

export default HallRow;

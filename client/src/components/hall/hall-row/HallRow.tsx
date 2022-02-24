import React, { ReactElement } from 'react';
import { ISeat } from '../seats';
import style from '../hall.module.scss';
import { ReactComponent as SimpleSeat } from '../../../assets/images/svg/chair.svg';
import { ReactComponent as PrimeSeat } from '../../../assets/images/svg/premiere_sofa.svg';
import { ReactComponent as LoveSeat } from '../../../assets/images/svg/love_seat.svg';

const seatsTypes = [<SimpleSeat />, <PrimeSeat />, <LoveSeat />];

const HallRow = (rowData: ISeat[]): ReactElement[] => {
    return rowData.map((seat, index) => {
        const { size, type, bought } = seat;

        return (
            <div
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className={
                    bought ? `${style.seat} ${style.seat_bought}` : style.seat
                }
                style={{ flexBasis: `${8 * size}%` }}
            >
                {seatsTypes[type]}
            </div>
        );
    });
};

export default HallRow;

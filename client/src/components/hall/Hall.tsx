import React, { FC } from 'react';
import HallRow from './hall-row/HallRow';
import { ISeat } from '../../services/types';
import { SeatsTypes } from './seats-types';
import { useAction, useAppSelector } from '../../hooks/redux';
import { selectReservedSeatsId } from '../../redux/order/selectors';
import style from './hall.module.scss';

interface IHallProps {
    hallData: Array<ISeat[]>;
    greedWidth: number;
}

const checkEmptyRow = (row: ISeat[]): boolean => {
    return row.every(({ type }) => type === SeatsTypes.empty);
};

const Hall: FC<IHallProps> = ({ hallData, greedWidth }) => {
    const { bookSeats, canselBookSeat } = useAction();
    const reservedSeatsId = useAppSelector(selectReservedSeatsId);
    const rowCounter = { current: 0 };

    const book = (seat: ISeat, booked = false): void => {
        if (booked) {
            canselBookSeat(seat);
            return;
        }
        bookSeats(seat);
    };

    return (
        <div className={style.hall}>
            <span>Display</span>
            {hallData.map((row, index) => {
                const isEmptyRow = checkEmptyRow(row);

                if (!isEmptyRow) {
                    rowCounter.current += 1;
                }

                return (
                    <div className={style.row} key={index}>
                        {!isEmptyRow && (
                            <span className={style.row__title_lf}>
                                {rowCounter.current}
                            </span>
                        )}
                        {HallRow(row, greedWidth, book, reservedSeatsId)}
                        {!isEmptyRow && (
                            <span className={style.row__title_rt}>
                                {rowCounter.current}
                            </span>
                        )}
                    </div>
                );
            })}
        </div>
    );
};

export default Hall;

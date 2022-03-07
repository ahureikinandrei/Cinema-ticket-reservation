import React, { FC } from 'react';
import HallRow from './hall-row/HallRow';
import { ISeat, ISeatPrice } from '../../services/types';
import { SeatsTypes } from './seats-types';
import { useAction, useAppSelector } from '../../hooks/redux';
import { selectReservedSeatsId } from '../../redux/order/selectors';
import { SEAT_TYPES, SEAT_TYPES_ENUM } from '../../constants/filmConstants';
import style from './hall.module.scss';

interface IHallProps {
    hallData: Array<ISeat[]>;
    greedWidth: number;
    seatPrise: ISeatPrice;
}

const checkEmptyRow = (row: ISeat[]): boolean => {
    return row.every(({ type }) => type === SeatsTypes.empty);
};

const Hall: FC<IHallProps> = ({ hallData, greedWidth, seatPrise }) => {
    const { bookSeats, canselBookSeat, addOrderCost, subtractOrderCost } =
        useAction();
    const reservedSeatsId = useAppSelector(selectReservedSeatsId);
    const rowCounter = { current: 0 };

    const book = (seat: ISeat, booked = false): void => {
        const seatTypeName = SEAT_TYPES[seat.type];
        if (seatTypeName === SEAT_TYPES_ENUM.empty) {
            return;
        }

        const price = seatPrise[seatTypeName];

        if (booked) {
            subtractOrderCost(+price);
            canselBookSeat(seat);
            return;
        }
        addOrderCost(+price);
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

import React, { FC, useEffect, useRef, useState } from 'react';
import HallRow from './hall-row/HallRow';
import { ISeat, ISeatPrice } from '../../services/types';
import { SeatsTypes } from './seats-types';
import { useAction, useAppSelector } from '../../hooks/redux';
import { selectReservedSeatsId } from '../../redux/order/selectors';
import { SEAT_TYPES, SEAT_TYPES_ENUM } from '../../constants/filmConstants';
import { ISeatFullInfo } from '../../redux/order/reducer';
import style from './hall.module.scss';
import RowNumber, { SIDES } from './hall-row/RowNumber';
import { SeatSocketsService } from '../../services/seatSockets.service';

interface IHallProps {
    hallData: Array<ISeat[]>;
    greedWidth: number;
    seatPrise: ISeatPrice;
    bookedOtherUsersSeatsID: string[];
    socket: SeatSocketsService | undefined;
}

const checkEmptyRow = (row: ISeat[]): boolean => {
    return row.every(({ type }) => type === SeatsTypes.empty);
};

const Hall: FC<IHallProps> = ({
    hallData,
    greedWidth,
    seatPrise,
    bookedOtherUsersSeatsID,
    socket,
}) => {
    const { bookSeats, canselBookSeat, addOrderCost, subtractOrderCost } =
        useAction();
    const reservedSeatsId = useAppSelector(selectReservedSeatsId);

    const book = (seat: ISeatFullInfo, booked = false): void => {
        const seatTypeName = SEAT_TYPES[seat.type];
        if (seatTypeName === SEAT_TYPES_ENUM.empty) {
            return;
        }

        const price = seatPrise[seatTypeName];

        if (booked) {
            subtractOrderCost(+price);
            canselBookSeat(seat);
            socket?.sendUnBookedSeatInfoToServer(seat);
            return;
        }
        socket?.sendBookedSeatInfoToServer(seat);
        addOrderCost(+price);
        bookSeats(seat);
    };

    const rowCounter = { current: 0 };
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
                        {RowNumber(isEmptyRow, rowCounter.current, SIDES.LEFT)}
                        {HallRow(
                            row,
                            greedWidth,
                            book,
                            reservedSeatsId,
                            rowCounter.current,
                            bookedOtherUsersSeatsID
                        )}
                        {RowNumber(isEmptyRow, rowCounter.current, SIDES.RIGHT)}
                    </div>
                );
            })}
        </div>
    );
};

export default Hall;

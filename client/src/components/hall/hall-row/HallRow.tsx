import React, { ReactElement } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import { ISeat } from '../../../services/types';
import { SeatsTypes, seatsTypes } from '../seats-types';
import { Tooltip } from './Tooltip';
import { ISeatFullInfo } from '../../../redux/order/reducer';
import style from '../hall.module.scss';
import Seat from './Seat';

const HallRow = (
    rowData: ISeat[],
    greedWidth: number,
    reserve: (seat: ISeatFullInfo, cansel: boolean) => void,
    reservedSeatsId: string[],
    rowIndex: number,
    bookedOtherUsersSeatsID: string[]
): ReactElement[] => {
    const seatSizeBasis = 100 / greedWidth;
    let seatIndex = 0;

    return rowData.map((seat, index) => {
        const { size, type, isBought, _id } = seat;

        const isReserved = reservedSeatsId.includes(_id);
        const isReservedOtherUser = bookedOtherUsersSeatsID.includes(_id);

        const reserveSeat = (): void => {
            const fullSeatInfo = {
                ...seat,
                row: rowIndex,
                seat: index + 1,
            };
            reserve(fullSeatInfo, isReserved);
        };

        const showSeat = (): ReactElement => {
            if (type === SeatsTypes.empty) {
                return seatsTypes[type];
            }

            seatIndex += 1;
            return (
                <OverlayTrigger
                    placement="top"
                    overlay={Tooltip(seatIndex, type, isBought)}
                >
                    {Seat(
                        type,
                        isBought,
                        isReserved,
                        isReservedOtherUser,
                        reserveSeat
                    )}
                </OverlayTrigger>
            );
        };

        return (
            <div
                key={index}
                className={style.seat}
                style={{ flexBasis: `${seatSizeBasis * size}%` }}
            >
                {showSeat()}
            </div>
        );
    });
};

export default HallRow;

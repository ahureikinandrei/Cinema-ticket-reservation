import React, { ReactElement } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import { ISeat } from '../../../services/types';
import { SeatsTypes, seatsTypes } from '../seats-types';
import { Tooltip } from './Tooltip';
import style from '../hall.module.scss';

const HallRow = (
    rowData: ISeat[],
    greedWidth: number,
    reserve: (id: string, isReservedSeat: boolean) => void,
    reservedSeatsId: string[]
): ReactElement[] => {
    const basis = 100 / greedWidth;
    let seatIndex = 0;

    return rowData.map((seat, index) => {
        const { size, type, isBought, _id } = seat;

        const reserved = reservedSeatsId.includes(_id);
        const reserveSeat = (): void => {
            reserve(_id, reserved);
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
                    {isBought ? (
                        <div className={style.seat_bought}>
                            {seatsTypes[type]}
                        </div>
                    ) : (
                        <div
                            className={reserved ? style.seat_reserved : null}
                            onClick={reserveSeat}
                        >
                            {seatsTypes[type]}
                        </div>
                    )}
                </OverlayTrigger>
            );
        };

        return (
            <div
                key={index}
                className={style.seat}
                style={{ flexBasis: `${basis * size}%` }}
            >
                {showSeat()}
            </div>
        );
    });
};

export default HallRow;

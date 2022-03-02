import React, { ReactElement } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import { ISeat } from '../../../services/types';
import { SeatsTypes, seatsTypes } from '../seats-types';
import { Tooltip } from './Tooltip';
import style from '../hall.module.scss';

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
                {type === SeatsTypes.empty ? (
                    seatsTypes[type]
                ) : (
                    <OverlayTrigger
                        placement="top"
                        overlay={Tooltip(index + 1, type)}
                    >
                        {/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
                        <div
                            onClick={() => {
                                console.log(123);
                            }}
                        >
                            {seatsTypes[type]}
                        </div>
                    </OverlayTrigger>
                )}
            </div>
        );
    });
};

export default HallRow;

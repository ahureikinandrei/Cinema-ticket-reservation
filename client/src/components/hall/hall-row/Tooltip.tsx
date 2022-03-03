import React, { ReactElement } from 'react';
import Popover from 'react-bootstrap/Popover';
import PopoverBody from 'react-bootstrap/PopoverBody';
import { seatDescription } from '../seats-types';
import style from '../hall.module.scss';

export const Tooltip = (
    seatNumber: number,
    type: number,
    isBought: boolean
): ReactElement => {
    if (isBought) {
        return (
            <Popover>
                <div className={style.tooltip}>Bought</div>
            </Popover>
        );
    }
    return (
        <Popover>
            <PopoverBody>
                <div className={style.tooltip}>
                    <div className={style.tooltip_seat}>{seatNumber}</div>
                    <div>{seatDescription[type]}</div>
                </div>
            </PopoverBody>
        </Popover>
    );
};

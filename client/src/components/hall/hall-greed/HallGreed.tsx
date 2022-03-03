import React, { FC } from 'react';
import { ICreateSeat } from '../../../services/types';
import HallRowGreed from './HallRowGreed';
import style from '../hall.module.scss';

interface IHallGreedProps {
    greed: Array<ICreateSeat[]>;
    greedWidth: number;
}

const HallGreed: FC<IHallGreedProps> = ({ greed, greedWidth }) => {
    return (
        <div className={style.hall}>
            {greed.map((row, index) => {
                return (
                    <div className={style.row} key={index}>
                        <span className={style.row__title_lf}>{index + 1}</span>
                        {HallRowGreed(row, greedWidth)}
                        <span className={style.row__title_rt}>{index + 1}</span>
                    </div>
                );
            })}
        </div>
    );
};

export default HallGreed;

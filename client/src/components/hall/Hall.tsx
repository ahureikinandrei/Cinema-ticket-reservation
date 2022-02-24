import React, { FC } from 'react';
import { hallData } from './seats';
import style from './hall.module.scss';
import HallRow from './hall-row/HallRow';

const Hall: FC = () => {
    return (
        <div className={style.hall}>
            <span>Display</span>
            {hallData.map((row, index) => {
                return (
                    <div
                        className={style.row}
                        // eslint-disable-next-line react/no-array-index-key
                        key={index}
                    >
                        <span>{index + 1}</span>
                        {HallRow(row)}
                        <span>{index + 1}</span>
                    </div>
                );
            })}
        </div>
    );
};

export default Hall;

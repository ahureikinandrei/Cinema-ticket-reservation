import React, { FC } from 'react';
import HallRow from './hall-row/HallRow';
import { ISeat } from '../../services/types';
import style from './hall.module.scss';
import { SeatsTypes } from './seats-types';

interface IHallProps {
    hallData: Array<ISeat[]>;
    greedWidth: number;
}

const checkEmptyRow = (row: ISeat[]): boolean => {
    return row.every(({ type }) => type === SeatsTypes.empty);
};

const Hall: FC<IHallProps> = ({ hallData, greedWidth }) => {
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
                        {!isEmptyRow && (
                            <span className={style.row__title_lf}>
                                {rowCounter.current}
                            </span>
                        )}
                        {HallRow(row, greedWidth)}
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

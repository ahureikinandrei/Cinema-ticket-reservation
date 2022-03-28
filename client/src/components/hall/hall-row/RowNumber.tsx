import React, { ReactElement } from 'react';
import style from '../hall.module.scss';

export enum SIDES {
    RIGHT = 'rt',
    LEFT = 'lf',
}

const RowNumber = (
    // eslint-disable-next-line default-param-last
    isEmptyRow = true,
    rowNumber: number,
    side = SIDES.LEFT
): ReactElement | null => {
    const rowNumberClassName = `row__title_${side}`;

    if (isEmptyRow) {
        return null;
    }

    return <span className={style[rowNumberClassName]}> {rowNumber}</span>;
};
export default RowNumber;

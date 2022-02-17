import React, { FC } from 'react';
import style from './filmCard.module.scss';

interface IBackSideProps {
    description: string;
    age: string;
    endDate: string;
    startDate: string;
    genre: string;
}

const BackSide: FC<IBackSideProps> = ({
    description,
    age,
    startDate,
    endDate,
    genre,
}) => {
    return (
        <div className={style.back}>
            <div className={style.description}>{description}</div>
            <hr />
            <div className={style.date}>{genre}</div>
            <hr />
            <div className={style.date}>Age: {age}</div>
            <hr />
            <div className={style.date}>Start: {startDate}</div>
            <hr />
            <div className={style.date}>End: {endDate}</div>
        </div>
    );
};

export default BackSide;

import React, { FC, ReactElement } from 'react';
import style from '../hallLegend.module.scss';

interface ISeatDescriptionProps {
    type: ReactElement;
    prise: number;
}

const SeatDescription: FC<ISeatDescriptionProps> = ({
    type,
    prise,
    children,
}) => {
    return (
        <section className={style.seat}>
            <div className={style.seat__image}>{type}</div>
            <div className={style.seat__description}>
                <div className={style.description__title}>
                    <div className={style.description__name}>
                        <span>Simple chair</span>
                    </div>
                    <div>
                        <span>Cost: {prise || 1}</span>
                    </div>
                </div>
                {children}
            </div>
        </section>
    );
};

export default SeatDescription;

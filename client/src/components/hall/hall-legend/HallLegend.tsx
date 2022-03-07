import React, { FC } from 'react';
import { seatsTypes } from '../seats-types';
import { ISeatPrice } from '../../../services/types';
import SeatDescription from './seat-description/SeatDescription';
import style from './hallLegend.module.scss';

interface IHallLegendProps {
    seatPrise: ISeatPrice;
    orderCost: number;
}

const HallLegend: FC<IHallLegendProps> = ({ seatPrise, orderCost }) => {
    const [simple, love, prime] = seatsTypes;

    return (
        <div className={style.wrapper}>
            <div className="d-flex">
                <div>
                    <h4>Seats types</h4>
                    <span>Total Cost: {orderCost}</span>
                </div>
                <button className={style.button_buy}>Buy</button>
            </div>
            <SeatDescription type={simple} prise={seatPrise.simple}>
                <div className={style.description__text}>
                    Single comfortable wide armchair with cup holder.
                </div>
            </SeatDescription>
            <SeatDescription type={love} prise={seatPrise.love}>
                <div className={style.description__text}>
                    Places for two increased comfort. The seats are connected in
                    such a way as to set the viewer up for a pleasant viewing
                    experience. Cozy and incredibly soft and comfortable sofas
                    are ideal for dates, as well as family and friendly
                    viewings. The price is for a double bed.
                </div>
            </SeatDescription>
            <SeatDescription type={prime} prise={seatPrise.prime}>
                <div className={style.description__text}>
                    Double soft sofas with headrests. The comfort of this chair
                    will instantly make you relax and feel at home. The price is
                    for a double bed
                </div>
            </SeatDescription>{' '}
            <SeatDescription type={prime} prise={seatPrise.prime}>
                <div className={style.description__text}>
                    Double soft sofas with headrests. The comfort of this chair
                    will instantly make you relax and feel at home. The price is
                    for a double bed
                </div>
            </SeatDescription>{' '}
            <SeatDescription type={prime} prise={seatPrise.prime}>
                <div className={style.description__text}>
                    Double soft sofas with headrests. The comfort of this chair
                    will instantly make you relax and feel at home. The price is
                    for a double bed
                </div>
            </SeatDescription>
        </div>
    );
};

export default HallLegend;

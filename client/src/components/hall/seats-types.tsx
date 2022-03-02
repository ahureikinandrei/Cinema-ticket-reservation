import React from 'react';
import { ReactComponent as SimpleSeat } from '../../assets/images/svg/chair.svg';
import { ReactComponent as PrimeSeat } from '../../assets/images/svg/premiere_sofa.svg';
import { ReactComponent as LoveSeat } from '../../assets/images/svg/love_seat.svg';
import { ReactComponent as Empty } from '../../assets/images/svg/empty.svg';

export const seatsTypes = [
    <SimpleSeat />,
    <PrimeSeat />,
    <LoveSeat />,
    <Empty />,
];

export enum SeatsTypes {
    simple = 0,
    prime = 1,
    love = 2,
    empty = 3,
}

export const seatDescription = ['simple', 'prime', 'love'];

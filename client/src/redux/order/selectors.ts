import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { ISeatFullInfo } from './reducer';

const selectSelf = (state: RootState): RootState => state;

export const selectReservedSeatsId = createSelector(
    selectSelf,
    (state: RootState): string[] => {
        return state.order.bookedSeats.map(({ _id }) => _id);
    }
);

export const selectSessionId = (state: RootState): string | null => {
    return state.order.sessionId;
};

export const selectReservedSeats = createSelector(
    selectSelf,
    (state: RootState): ISeatFullInfo[] => {
        return state.order.bookedSeats;
    }
);

export const selectOrderCost = (state: RootState): number => {
    return state.order.orderCost;
};

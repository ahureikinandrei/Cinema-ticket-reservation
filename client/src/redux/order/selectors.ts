import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';

const selectSelf = (state: RootState): RootState => state;

export const selectReservedSeatsId = createSelector(
    selectSelf,
    (state: RootState): string[] => {
        return state.order.bookedSeats.map(({ _id }) => _id);
    }
);

export const selectOrderCost = (state: RootState): number => {
    return state.order.orderCost;
};

import { RootState } from '../store';

export const selectReservedSeatsId = (state: RootState): string[] => {
    return state.order.bookedSeats.map(({ _id }) => _id);
};

export const selectOrderCost = (state: RootState): number => {
    return state.order.orderCost;
};

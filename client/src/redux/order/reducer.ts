import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISeat } from '../../services/types';

interface OrderState {
    bookedSeats: ISeat[];
    orderCost: number;
}

const initialState: OrderState = {
    bookedSeats: [],
    orderCost: 0,
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        bookSeats(state, action: PayloadAction<ISeat>) {
            state.bookedSeats = [...state.bookedSeats, action.payload];
        },
        canselBookSeat(state, action: PayloadAction<ISeat>) {
            state.bookedSeats = state.bookedSeats.filter(
                ({ _id }) => _id !== action.payload._id
            );
        },
        addOrderCost(state, action: PayloadAction<number>) {
            state.orderCost += action.payload;
        },
        subtractOrderCost(state, action: PayloadAction<number>) {
            state.orderCost -= action.payload;
        },
    },
});

export default orderSlice.reducer;
export const orderSliceActions = orderSlice.actions;

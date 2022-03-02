import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISeat } from '../../services/types';

interface OrderState {
    selectedSeats: ISeat[][];
}

const initialState: OrderState = {
    selectedSeats: [],
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setSelectedSeats(state, action: PayloadAction<ISeat[][]>) {
            state.selectedSeats = action.payload;
        },
    },
});

export default orderSlice.reducer;
export const orderSliceActions = orderSlice.actions;

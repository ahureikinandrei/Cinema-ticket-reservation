import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISeat } from '../../services/types';

export interface ISeatFullInfo extends ISeat {
    row: number;
    seat: number;
}

interface OrderState {
    bookedSeats: ISeatFullInfo[];
    orderCost: number;
    sessionId: string | null;
}

const initDefaultState = (): OrderState => {
    return {
        bookedSeats: [],
        orderCost: 0,
        sessionId: null,
    };
};

const initialState: OrderState = initDefaultState();

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setDefaultOrderState(state) {
            state.bookedSeats = [];
            state.orderCost = 0;
            state.sessionId = null;
        },
        bookSeats(state, action: PayloadAction<ISeatFullInfo>) {
            state.bookedSeats = [...state.bookedSeats, action.payload];
        },
        canselBookSeat(state, action: PayloadAction<ISeatFullInfo>) {
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
        setSessionId(state, action: PayloadAction<string>) {
            state.sessionId = action.payload;
        },
    },
});

export default orderSlice.reducer;
export const orderSliceActions = orderSlice.actions;

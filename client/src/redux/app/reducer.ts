import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface appState {
    error: string | null;
}

const initialState: appState = {
    error: null,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setAppMessage(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
    },
});

export default appSlice.reducer;
export const appSliceActions = appSlice.actions;

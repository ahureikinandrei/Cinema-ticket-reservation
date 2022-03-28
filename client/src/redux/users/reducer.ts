import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUser } from '../../models/IUser';
import LocalStorageService from '../../services/localStorage.service';

interface UserState {
    isAuth: boolean;
    error: string | null;
    isLoading: boolean;
    user: IUser | null;
}

const initialState: UserState = {
    isAuth: false,
    error: null,
    isLoading: false,
    user: null,
};

const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        userDefaultState(state) {
            LocalStorageService.removeTokenFromLocalStorage();
            state.isAuth = false;
            state.error = null;
            state.isLoading = false;
            state.user = null;
        },
        userIsLoading(state, action: PayloadAction<boolean>) {
            state.isLoading = action.payload;
        },
        setUser(state, action: PayloadAction<IUser>) {
            state.isAuth = true;
            state.user = action.payload;
        },
        setUserErrorMessage(state, action: PayloadAction<string>) {
            state.error = action.payload;
        },
    },
});

export default userSlice.reducer;
export const userSliceActions = userSlice.actions;

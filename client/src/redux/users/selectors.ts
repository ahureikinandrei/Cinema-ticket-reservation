import { RootState } from '../store';

export const getIsUserAuth = (state: RootState): boolean => state.users.isAuth;
export const getUserErrorMessage = (state: RootState): string | null =>
    state.users.error;
export const getIsUserLoading = (state: RootState): boolean =>
    state.users.isLoading;

import { RootState } from '../store';

export const getIsUserAuth = (state: RootState): boolean => state.users.isAuth;
export const getIsUserAdmin = (state: RootState): boolean => {
    return state.users.user?.role === 'ADMIN';
};

export const getUserErrorMessage = (state: RootState): string | null =>
    state.users.error;

export const getIsUserLoading = (state: RootState): boolean =>
    state.users.isLoading;

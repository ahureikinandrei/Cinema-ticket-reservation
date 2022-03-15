import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { IOrder } from '../../services/types';

const selectSelf = (state: RootState): RootState => state;

export const getIsUserAuth = (state: RootState): boolean => state.users.isAuth;
export const getIsUserAdmin = (state: RootState): boolean => {
    return state.users.user?.role === 'ADMIN';
};

export const getUserOrders = createSelector(
    selectSelf,
    (state: RootState): IOrder[] => {
        if (state.users.user === null) {
            return [];
        }
        return state.users.user?.orders;
    }
);

export const getUserID = createSelector(
    selectSelf,
    (state: RootState): string => {
        if (state.users.user === null) {
            return '';
        }
        return state.users.user?.id;
    }
);

export const getUserEmail = (state: RootState): string | null =>
    state.users.user?.email || null;

export const getUserErrorMessage = (state: RootState): string | null =>
    state.users.error;

export const getIsUserLoading = (state: RootState): boolean =>
    state.users.isLoading;

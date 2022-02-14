import { AppDispatch } from '../store';
import { userSliceActions } from './reducer';
import AuthService from '../../services/auth.service';
import { UserData } from '../actions/types';
import { UNEXPECTED_ERROR } from '../../constants/messages';
import LocalStorageService from '../../services/localStorage.service';

export const createUser =
    (userDara: UserData) => async (dispatch: AppDispatch) => {
        dispatch(userSliceActions.userIsLoading(true));
        try {
            const response = await AuthService.createUser(userDara);
            LocalStorageService.setTokenToLocalStorage(response.data.token);
            dispatch(userSliceActions.setUser(response.data.user));
            dispatch(userSliceActions.userIsLoading(false));
        } catch (e) {
            if (e.response) {
                dispatch(
                    userSliceActions.setUserErrorMessage(
                        e.response.data?.message || UNEXPECTED_ERROR
                    )
                );
                dispatch(userSliceActions.userIsLoading(false));
                return;
            }
            dispatch(userSliceActions.setUserErrorMessage(UNEXPECTED_ERROR));
            dispatch(userSliceActions.userIsLoading(false));
        }
    };

export const loginUser =
    (userDara: UserData) => async (dispatch: AppDispatch) => {
        dispatch(userSliceActions.userIsLoading(true));
        try {
            const response = await AuthService.loginUser(userDara);
            LocalStorageService.setTokenToLocalStorage(response.data.token);
            dispatch(userSliceActions.setUser(response.data.user));
            dispatch(userSliceActions.userIsLoading(false));
        } catch (e) {
            if (e.response) {
                dispatch(
                    userSliceActions.setUserErrorMessage(
                        e.response.data?.message || UNEXPECTED_ERROR
                    )
                );
                dispatch(userSliceActions.userIsLoading(false));
                return;
            }
            dispatch(userSliceActions.setUserErrorMessage(UNEXPECTED_ERROR));
            dispatch(userSliceActions.userIsLoading(false));
        }
    };

export const authUser = (token: string) => async (dispatch: AppDispatch) => {
    dispatch(userSliceActions.userIsLoading(true));
    try {
        const response = await AuthService.authUser(token);
        LocalStorageService.setTokenToLocalStorage(response.data.token);
        dispatch(userSliceActions.setUser(response.data.user));
        dispatch(userSliceActions.userIsLoading(false));
    } catch (e) {
        if (e.response) {
            dispatch(
                userSliceActions.setUserErrorMessage(
                    e.response.data?.message || UNEXPECTED_ERROR
                )
            );
            dispatch(userSliceActions.userIsLoading(false));
            return;
        }
        dispatch(userSliceActions.setUserErrorMessage(UNEXPECTED_ERROR));
        dispatch(userSliceActions.userIsLoading(false));
    }
};

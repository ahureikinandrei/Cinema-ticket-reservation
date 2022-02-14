import { useEffect, useState } from 'react';
import { UserData } from '../redux/actions/types';
import AuthService from '../services/auth.service';
import { UNEXPECTED_ERROR } from '../constants/messages';
import LocalStorageService from '../services/localStorage.service';
import { userSliceActions } from '../redux/users/reducer';
import { useAppDispatch } from './redux';

export const useSignInForm = (
    userDara: UserData | null,
    closeModalFunction: () => void
): [boolean, string] => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (!userDara) {
            return;
        }

        setLoading(true);
        const loginResponse = AuthService.loginUser(userDara);
        loginResponse
            .then((response) => {
                LocalStorageService.setTokenToLocalStorage(response.data.token);
                dispatch(userSliceActions.setUser(response.data.user));
                closeModalFunction();
            })
            .catch((e) => {
                if (e.response) {
                    setError(e.response.data?.message || UNEXPECTED_ERROR);
                }
            })
            .finally(() => setLoading(false));
    }, [userDara, closeModalFunction]);

    return [loading, error];
};

import { useReducer } from 'react';
import { formReducer, IInitialState, initState } from './reducer';

export const useFilmReducer = (): [
    IInitialState,
    (action: string, payload?: string) => void
] => {
    const [state, dispatch] = useReducer(formReducer, initState());

    const customDispatch = (action: string, payload = ''): void => {
        dispatch({
            type: action,
            payload,
        });
    };

    return [state, customDispatch];
};

import { bindActionCreators } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../redux/store';
import { allActionCreators } from '../redux/actions';

export const useAppDispatch = (): AppDispatch => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useAction = () => {
    const dispatch = useAppDispatch();
    return bindActionCreators(allActionCreators, dispatch);
};

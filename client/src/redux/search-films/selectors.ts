import { RootState } from '../store';
import { ISearchState } from './reducer';

export const getSearchValue = (state: RootState): string =>
    state.searchFilms.searchValue;

export const getSearchParams = (state: RootState): ISearchState =>
    state.searchFilms;

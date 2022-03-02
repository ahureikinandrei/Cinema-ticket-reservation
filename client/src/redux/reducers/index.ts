import { combineReducers } from '@reduxjs/toolkit';
import usersReducer from '../users/reducer';
import appReducer from '../app/reducer';
import searchFilmsReducer from '../search-films/reducer';
import orderReducer from '../order/reducer';

export const rootReducer = combineReducers({
    users: usersReducer,
    app: appReducer,
    searchFilms: searchFilmsReducer,
    order: orderReducer,
});

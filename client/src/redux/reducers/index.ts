import { combineReducers } from '@reduxjs/toolkit';
import usersReducer from '../users/reducer';
import appReducer from '../app/reducer';

export const rootReducer = combineReducers({
    users: usersReducer,
    app: appReducer,
});

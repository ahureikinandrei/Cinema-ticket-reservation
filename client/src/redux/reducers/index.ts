import { combineReducers } from '@reduxjs/toolkit';
import usersReducer from '../users/reducer';

export const rootReducer = combineReducers({
    users: usersReducer,
});

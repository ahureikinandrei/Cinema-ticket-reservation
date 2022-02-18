import { userSliceActions } from '../users/reducer';
import { authUser, createUser, loginUser } from '../users/actions';
import { appSliceActions } from '../app/reducer';
import { searchFilmSliceSliceActions } from '../search-films/reducer';

export const allActionCreators = {
    createUser,
    loginUser,
    authUser,
    ...userSliceActions,
    ...appSliceActions,
    ...searchFilmSliceSliceActions,
};

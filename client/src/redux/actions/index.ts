import { userSliceActions } from '../users/reducer';
import { authUser, createUser, loginUser } from '../users/actions';

export const allActionCreators = {
    createUser,
    loginUser,
    authUser,
    ...userSliceActions,
};

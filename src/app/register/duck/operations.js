// operations.js
// operations, thunks, sagas, epics, etc (essentially just more action creators.)
import Creators from './actions';
import types from './types';
import * as api from '../../../utils/api';
import { userRegisterSelectors } from './';

const clearError = Creators.clearError;

const userRegisterAccount = (user) => (dispatch, getState) => {

    if(userRegisterSelectors.getIsFetchingRegister(getState())) {
        return Promise.resolve();
    }
    dispatch({
        type: types.USER_REGISTER__REQUEST,
        user
    });
    return api.register(user).then(                
        response => {
            dispatch({
                type: types.USER_REGISTER__SUCCESS,
                response: response.data.result.user,
                receivedAt: Date.now()
            })
        },
        error => {
            dispatch({
                type: types.USER_REGISTER__FAILURE,
                user,
                message: error.message || 'Something went wrong.'
            })
        }
    );
};

export default {
    clearError,
    userRegisterAccount
}
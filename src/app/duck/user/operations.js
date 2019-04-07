// operations.js
// operations, thunks, sagas, epics, etc (essentially just more action creators.)
import Creators from './actions';

import types from './types';
import * as api from '../../../utils/api';
import { userSelectors } from './';

const reauthenticateUser = Creators.reauthenticateUser;
const clearUser = Creators.clearUser;
const clearError = Creators.clearError;

const userLogin = (user) => (dispatch, getState) => {

    if(userSelectors.getIsFetchingLogin(getState())) {
        return Promise.resolve();
    }
    dispatch({
        type: types.USER_LOGIN_REQUEST,
        user
    });
    return api.login(user).then(                
        response => {
            dispatch({
                type: types.USER_LOGIN_SUCCESS,
                user,
                response: response.data.result.user,
                receivedAt: Date.now()
            })
        },
        error => {
            dispatch({
                type: types.USER_LOGIN_FAILURE,
                user,
                message: error.message || 'Something went wrong.'
            })
        }
    );
};


const userLogout = (user) => (dispatch, getState) => {

    // if(userSelectors.getIsFetchingLogin(getState())) {
    //     return Promise.resolve();
    // }
    dispatch({
        type: types.USER_LOGOUT_REQUEST,
        user
    });
    return api.logout().then(       
        response => {
            dispatch({
                type: types.USER_LOGOUT_SUCCESS,
                user,
                response: response.data.result.user,
                receivedAt: Date.now()
            })
        },
        error => {
            dispatch({
                type: types.USER_LOGOUT_FAILURE,
                user,
                message: error.message || 'Something went wrong.'
            })
        }
    );
};

export default {
    reauthenticateUser,
    clearUser,
    clearError,
    userLogin,
    userLogout
}
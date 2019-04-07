// reducers.js
import { combineReducers } from 'redux'
import types from './types';

const data = (state = {}, action) => {
    switch (action.type) {
        case types.USER_LOGIN_SUCCESS:
            return action.response
        case types.CLEAR_USER:
        case types.USER_LOGOUT_SUCCESS:
            return {}
        default:
            return state;
    }
};

const didInvalidate = (state = false, action) => {
    switch (action.type) {
        case types.REAUTHENTICATE:
        case types.USER_LOGOUT_SUCCESS:
            return true
        case types.USER_LOGIN_REQUEST:
            return false
        case types.USER_LOGIN_SUCCESS:
            return false
        default:
            return state;
    }
};

const isLoggedIn = (state = false, action) => {
    switch (action.type) {
        case types.REAUTHENTICATE:
        case types.USER_LOGOUT_SUCCESS:
            return false
        case types.USER_LOGIN_SUCCESS:
            return true
        default:
            return state;
    } 
}

const isFetching = (state = false, action) => {
    switch (action.type) {
        case types.USER_LOGIN_REQUEST:
            return true
        case types.USER_LOGIN_SUCCESS:
        case types.USER_LOGIN_FAILURE:
            return false
        default:
            return state;
    }
};

const lastUpdated = (state = Date(), action) => {
    switch (action.type) {
        case types.USER_LOGIN_SUCCESS:
            return action.receivedAt
        default:
            return state;
    }
};

const errorMessage = (state = null, action) => {
    switch (action.type) {
        case types.USER_LOGIN_FAILURE:
            return action.message
        case types.USER_LOGIN_REQUEST:
        case types.USER_LOGIN_SUCCESS:
        case types.USER_CLEAR_ERROR:
            return null;
        default:
            return state;
    }
};

const userReducer = combineReducers({
    data,
    didInvalidate,
    isLoggedIn,
    isFetching,
    lastUpdated,
    errorMessage
});


export default userReducer;
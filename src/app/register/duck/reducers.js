// reducers.js
import { combineReducers } from 'redux'
import types from './types';

const isFetching = (state = false, action) => {
    switch (action.type) {
        case types.USER_REGISTER__REQUEST:
            return true
        case types.USER_REGISTER__SUCCESS:
        case types.USER_REGISTER__FAILURE:
            return false
        default:
            return state;
    }
};

const lastUpdated = (state = Date(), action) => {
    switch (action.type) {
        case types.USER_REGISTER__SUCCESS:
            return action.receivedAt
        default:
            return state;
    }
};

const errorMessage = (state = null, action) => {
    switch (action.type) {
        case types.USER_REGISTER__FAILURE:
            return action.message
        case types.USER_REGISTER__REQUEST:
        case types.USER_REGISTER__SUCCESS:
        case types.USER_REGISTER_ERROR__CLEAR:
            return null;
        default:
            return state;
    }
};

const userRegisterReducer = combineReducers({
    isFetching,
    lastUpdated,
    errorMessage
});


export default userRegisterReducer;
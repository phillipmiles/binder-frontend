// actions.js
import types from './types.js';

function reauthenticateUser() {
    return { type: types.REAUTHENTICATE }
}

function clearUser() {
    return { type: types.CLEAR_USER }
}

function clearError() {
    return { type: types.USER_CLEAR_ERROR }
}

export default {
    reauthenticateUser,
    clearUser,
    clearError
}
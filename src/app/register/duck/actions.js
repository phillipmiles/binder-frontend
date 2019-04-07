// actions.js
import types from './types.js';

function clearError() {
    return { type: types.USER_REGISTER_ERROR__CLEAR }
}

export default {
    clearError
}
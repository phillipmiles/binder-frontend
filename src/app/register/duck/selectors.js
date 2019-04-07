// selectors.js

const getIsFetchingRegister = (state) => state.userRegister.isFetching;
const getRegisterError = (state) => state.userRegister.errorMessage;

export default {
    getIsFetchingRegister,
    getRegisterError
};
// selectors.js

const getUser = (state) => {
    const user = state.user;
    // const expireAt = new Date(user.data.expires)
    // console.log('Session expire compare: ', expireAt.getTime(), Date.now())

    // NOTE: // TODO: Cooke is getting updated on each request, however, the user expiration
    // stored in local state is not getting updated so this is not accurate.
    // Maybe have a middleware that catches all outgoing api calls and updates local state.
    
    // Or maybe just fetch the new user object from the server only when the timer is about
    // to expire. Say 10 minutes prior. Maybe DO THIS ON A TIMER FUNCTION instead of here
    // that we we can ensure that there is always a valid user object in local storage
    // for any other API calls. Should the fetch user object call fail, remove local
    // user object and open a modal or redirect user to the login screen.
    // if (expireAt.getTime() < Date.now()) {
    //     console.log('ERROR: User has expired');
        // Check if user hasn't expired.
        // If has ... i dunno.
    // } else {
    //     console.log('User is valid');
    // }

    return user;
}

const getUserId = (state) => state.user.data.uuid;
const getIsFetchingLogin = (state) => state.user.isFetching;
const getLoginError = (state) => state.user.errorMessage;
const getDidInvalidateLogin = (state) => state.user.didInvalidate;
const isLoggedIn = (state) => state.user.isLoggedIn;

export default {
    getUser,
    getUserId,
    getIsFetchingLogin,
    getLoginError,
    getDidInvalidateLogin,
    isLoggedIn
};
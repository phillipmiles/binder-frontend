// reducers.js
import { combineReducers } from 'redux'
import types from './types';

const isFetching = (state = false, action) => {
    switch (action.type) {
        case types.WEBSOCKET_ACCESS__REQUEST:
            return true
        case types.WEBSOCKET_ACCESS__SUCCESS:
        case types.WEBSOCKET_ACCESS__FAILURE:
            return false
        default:
            return state;
    }
};

const lastUpdated = (state = Date(), action) => {
    switch (action.type) {
        case types.WEBSOCKET_ACCESS__SUCCESS:
            return action.receivedAt
        default:
            return state;
    }
};

const errorMessage = (state = null, action) => {
    switch (action.type) {
        case types.WEBSOCKET_ACCESS__FAILURE:
        case types.SHAREDB_DOC_SUB__FAILURE:
        case types.SHAREDB_DOC_AUTH__FAILURE:
            return action.message ? action.message : 'Something went wrong.'
        case types.WEBSOCKET__CLOSED:
            return 'Lost connection to websocket.'
        case types.WEBSOCKET_ACCESS__REQUEST:
        case types.WEBSOCKET_ACCESS__SUCCESS:
        case types.SHAREDB_DOC_SUB__SUCCESS:
            return null;
        default:
            return state;
    }
};

const request = (state = null, action) => {
    switch (action.type) {
        case types.WEBSOCKET_ACCESS__SUCCESS:
            return action.response;
        case types.WEBSOCKET__CLOSED:
            return null;        
        default:
            return state;
    }
};

// const ws = (state = null, action) => {
//     switch (action.type) {
//         case types.OPEN_WEBSOCKET:
//             return action.ws;
//         default:
//             return state;
//     }
// };

const shareWrapper = (state = null, action) => {
    switch (action.type) {
        case types.WEBSOCKET_AUTH__SUCCESS:
            return action.shareWrapper;
        default:
            return state;
    }
}

const authenticated = (state = false, action) => {
    switch (action.type) {
        case types.WEBSOCKET_AUTH__SUCCESS:
            return action.state;
        case types.WEBSOCKET__CLOSED:
            return false;
        default:
            return state;
    }
};

const deltas = (state = [], action ) => {
    switch (action.type) {
        case types.SHAREDB_DOC_RECEIVE_OP:
            return [action.delta, ...state];
        case types.SHAREDB_DOC_UNSUB:
            return [];
        default:
            return state;
    }
}

const subscribedDocId = (state = null, action ) => {
    switch (action.type) {
        case types.SHAREDB_DOC_SUB__SUCCESS:
            return action.docId;
        case types.SHAREDB_DOC_UNSUB:
            return null
        default:
            return state;
    }
}

const isSubscribingToDoc = (state = false, action) => {
    switch (action.type) {
        case types.SHAREDB_DOC_SUB__REQUEST:
            return true
        case types.SHAREDB_DOC_SUB__SUCCESS:
        case types.SHAREDB_DOC_SUB__FAILURE:
        case types.SHAREDB_DOC_UNSUB:
            return false
        default:
            return state;
    }
};

const websocketReducer = combineReducers({
    isFetching,
    lastUpdated,
    errorMessage,
    request,
    // ws,
    authenticated,
    shareWrapper,
    deltas,
    subscribedDocId,
    isSubscribingToDoc
});

export default websocketReducer;
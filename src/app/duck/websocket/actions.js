// actions.js
import types from './types.js';

function requestWebsocket() {
    return {
        type: types.WEBSOCKET_ACCESS__REQUEST,
    }
}

// function openWebsocket(ws) {
//     return {
//         type: types.OPEN_WEBSOCKET,
//         ws
//     }
// }

// function connectWebsocket(url) {
//     return {
//         type: types.WEBSOCKET_CONNECT,
//         payload: {
//             url: url
//         }
//     }
// }

function disconnectWebsocket() {
    return {
        type: types.WEBSOCKET_DISCONNECT
    }
}

function writeToWebsocket(data) {
    return {
        type: types.WEBSOCKET_MESSAGE__SEND,
        payload: data
    }
}

function documentSubscribe(docId) {
    return {
        type: types.SHAREDB_DOC_SUB__REQUEST,
        docId: docId
    }
}

function documentUnsubscribe() {
    return {
        type: types.SHAREDB_DOC_UNSUB
    }
}

function documentSubmitOp(delta) {
    return {
        type: types.SHAREDB_DOC_SUBMIT_OP,
        delta: delta
    }
}

export default {
    requestWebsocket,
    // openWebsocket,
    // connectWebsocket,
    disconnectWebsocket,
    writeToWebsocket,
    documentSubscribe,
    documentUnsubscribe,
    documentSubmitOp,
}
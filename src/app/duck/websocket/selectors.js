// selectors.js
const getIsFetchingWebsocket = (state) => state.websocket.isFetching;
const getWebsocketRequest = (state) => state.websocket.request;
const getWebsocket = (state) => state.websocket.ws;
const getShareWrapper = (state) => state.websocket.shareWrapper;
const getWebsocketAuthState = (state) => state.websocket.authenticated;
const getDeltas = (state) => state.websocket.deltas;
const getSubscribedDocId = (state) => state.websocket.subscribedDocId;
const getErrorMessageWebsocket = (state) => state.websocket.errorMessage;
const getIsSubscribingToDoc = (state) => state.websocket.isSubscribingToDoc;

export default {
    getIsFetchingWebsocket,
    getWebsocketRequest,
    getWebsocket,
    getShareWrapper,
    getWebsocketAuthState,
    getDeltas,
    getSubscribedDocId,
    getErrorMessageWebsocket,
    getIsSubscribingToDoc
}
// operations.js
// operations, thunks, sagas, epics, etc (essentially just more action creators.)
import Creators from './actions';

const requestWebsocket = Creators.requestWebsocket;
const disconnectWebsocket = Creators.disconnectWebsocket;
const writeToWebsocket = Creators.writeToWebsocket;
const documentSubscribe = Creators.documentSubscribe;
const documentUnsubscribe = Creators.documentUnsubscribe;
const documentSubmitOp = Creators.documentSubmitOp;

export default {
    requestWebsocket,
    disconnectWebsocket,
    writeToWebsocket,
    documentSubscribe,
    documentUnsubscribe,
    documentSubmitOp,
}
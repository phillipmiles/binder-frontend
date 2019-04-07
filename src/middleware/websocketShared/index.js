// websocketShared middleware

import { compose } from 'redux';
import partial from 'lodash/fp/partial';
import { 
    websocketAccessSuccess, 
    websocketAccessFailed, 
    connectWebsocket, 
    websocketOpen, 
    websocketClosed, 
    websocketMessageReceived,
    websocketMessageSend, 
    websocketAuthenticated, websocketDocAuthSuccess, websocketDocAuthFailure, shareDbReceiveOp, subscribedToDoc, subscribedToDocFail } from './actions';
import { 
    WEBSOCKET_ACCESS__REQUEST, 
    WEBSOCKET_CONNECT, 
    WEBSOCKET__DISCONNECT,
    WEBSOCKET__OPEN,
    WEBSOCKET_MESSAGE__RECEIVED,
    WEBSOCKET_MESSAGE__SEND,
    SHAREDB_DOC_SUB__REQUEST,
    SHAREDB_DOC_UNSUB,
    SHAREDB_DOC_SUBMIT_OP
} from './types';
import * as api from '../../utils/api';
import { websocketSelectors } from '../../app/duck/websocket'
var sharedb = require('sharedb/lib/client');
var richText = require('rich-text');
var Websocket = require('ws');
sharedb.types.register(richText.type);

const createMiddleware = () => {
    // Hold a reference to the WebSocket instance in use.
    let websocket;
    var shareWrapper;
    var doc;

    /**
     * A function to create the WebSocket object and attach the standard callbacks
     */
    const initialize = ({ dispatch }, config) => {
        // Instantiate the websocket.
        console.log('websocket config.url', config.url);
        websocket = new WebSocket(config.url);

        // Open WebSocket connection to ShareDB server
        shareWrapper = new sharedb.Connection(websocket);

        // // Function will dispatch actions returned from action creators.
        const dispatchAction = partial(compose, [dispatch]);

        // Must add new event listeners instead of overwriting websocket.onmessage, 
        // websocket.onclose or websocket.onopen as shareDB uses these.
        websocket.addEventListener('open', function (event) {
            dispatch(websocketOpen(event));
        });

        websocket.addEventListener('close', function (event) {
            console.log('ws close', event);
            dispatch(websocketClosed(event));
        });

        websocket.addEventListener('message', function (event) {
            dispatch(websocketMessageReceived(event));
        });

        websocket.addEventListener('onclose', function (event) {
            console.log('ws onclose', event);
        });

        window.addEventListener('beforeunload', onunload);
    };

    const onunload = () => {
        // doc.removeListener('op', onServerOp(store));

        // HAVE TO DESTROY DOC ON IF USER REFRESHES PAGE
        // ELSE SERVER KEEPS LISTENING AND ATTEMPTING TO
        // SEND BACK OPS TO BROKEN STREAMS RESULTING IN ERRORS!!
        doc.destroy();
        close();
    }
    /**
     * Close the WebSocket connection and cleanup
     */
    const close = () => {
        if (websocket) {
            console.warn(`Closing WebSocket connection to ${websocket.url} ...`);
            websocket.close();
            websocket = null;
        }
    };
      
    const sendSocketRequest = function (store) {
        api.requestWebsocketToken().then(
            response => {
                console.log('Websocket access token.', response.data.result)

                // Todo: Combine both actions or are they separate?
                store.dispatch(websocketAccessSuccess(response.data.result));
                store.dispatch(connectWebsocket(response.data.result.url));
            },
            error => {
                store.dispatch(websocketAccessFailed(error));
            }
        )
    }

    const auth = function (store) {
        const { dispatch, getState } = store;
        
        dispatch(websocketMessageSend({ 
            type: 'authToken', 
            token: websocketSelectors.getWebsocketRequest(getState()).token 
        }))
    }

    // On recieving a doc operation from server.
    // A closure. The inner function maintains a reference to
    // the outer function's variable (ie, 'store');
    const onServerOp = function (store) {
        return function (op, source) {
            if (!source) {
                store.dispatch(shareDbReceiveOp(op));
            }
        }
    }

    const shareSubscribeToDoc = function(doc, docId, store) {
        doc.subscribe(function (err) {
            console.log('sharedb doc', doc);
            if (err) {
                console.log('This should be an error', err);
                store.dispatch(subscribedToDocFail(docId, err))
                return;
            }
            // TODO: REMOVE THIS???
            if (!doc.data) { // does not exist so we create the document and replace the code editor content by the document content
                // WE DON"T NEED THIS ANYMORE AS DOCS GET CREATED ON SERVER NOT HERE!
                console.log('Create new doc');
                // This needs to be rich-text else if fails to create new doc.
                doc.create({ insert: "Text" }, 'rich-text', function (err) {
                    if (err) {
                        console.log('Error in creating new doc.', err);
                        store.dispatch(subscribedToDocFail(docId, err))
                    } else {
                        shareSubscribeToDoc(doc, docId, store);
                    }
                });

            } else {
                store.dispatch(subscribedToDoc(doc.id))
                store.dispatch(shareDbReceiveOp(doc.data))
            }

            doc.on('op', onServerOp(store));

        });

        doc.on('load', function() {
            console.log('sharedb doc loaded')
        });
        doc.on('error', function(err) {
            console.log('sharedb doc err', err)
        });
    }


    /**
     * The primary Redux middleware function.
     * Each of the actions handled are user-dispatched.
     */
    return (store) => (next) => (action) => {
        switch (action.type) {
            case WEBSOCKET_ACCESS__REQUEST:
                sendSocketRequest(store);
                next(action);
                break;
            // Authenticate the user before we do anything else
            case WEBSOCKET__OPEN:
                auth(store);
                next(action);
                break;

            // User request to connect
            case WEBSOCKET_CONNECT:
                close();
                initialize(store, action.payload);
                next(action);
                break;

            case SHAREDB_DOC_SUB__REQUEST:
                console.log('We want doc... ', action.docId);
                doc = shareWrapper.get('documents', action.docId);

                shareSubscribeToDoc(doc, action.docId, store);

                next(action);
                break;

            case SHAREDB_DOC_UNSUB:
                doc.removeListener('op', onServerOp(store));
                doc.destroy();
                console.log('Doc is now destroyed', doc);
                next(action);
                break;

            case SHAREDB_DOC_SUBMIT_OP:
                doc.submitOp(action.delta);
                next(action);
                break;
            // User request to disconnect
            case WEBSOCKET__DISCONNECT:
                close() ;
                next(action);
                break;

            // User request to send a message
            case WEBSOCKET_MESSAGE__SEND:
                if (websocket) {
                    websocket.send(JSON.stringify(action.payload));
                } else {
                    console.warn('WebSocket is closed, ignoring. Trigger a WEBSOCKET__CONNECT first.');
                }
                next(action);
                break;

            // Recieve message from server.
            case WEBSOCKET_MESSAGE__RECEIVED:
                var payload = JSON.parse(action.payload.data)
                console.log('payload recieved', payload);
                switch (payload.type) {
                    case 'authState':
                        store.dispatch(websocketAuthenticated(payload.state, true))
                        // setAuthState(payload.state);
                        break;
                    case 'docAuthState':
                        if(payload.state) {
                            store.dispatch(websocketDocAuthSuccess(payload.state, true, payload.docId))
                        } else {
                            store.dispatch(websocketDocAuthFailure(payload.state, true, payload.docId, payload.message))
                        }
                        break;
                        // This is a custom error payload type set by me. I might not be using it anymore.
                    case 'error':
                        console.log('ERROR:', 'websocket received an error message.', payload);
                        break;
                    default:
                }
                break;
            default:
                next(action);
        }
    };
};

export default createMiddleware();

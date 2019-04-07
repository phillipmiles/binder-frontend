// types.js

// Action types dispatched by the WebSocket implementation
export const WEBSOCKET_ACCESS__SUCCESS =    'WEBSOCKET_ACCESS__SUCCESS';    // Recieved our websocket access token.
export const WEBSOCKET_ACCESS__FAILURE =    'WEBSOCKET_ACCESS__FAILURE';    // Recieved our websocket access token.
export const WEBSOCKET_CONNECT =            'WEBSOCKET_CONNECT';            // Starts initialising the websocket after given access token.
export const WEBSOCKET__CONNECTED =         'WEBSOCKET__CONNECTED';         // Connceted websocket to server.
export const WEBSOCKET__OPEN =              'WEBSOCKET__OPEN';              // Websocket is now open.
export const WEBSOCKET__CLOSED =            'WEBSOCKET__CLOSED';            // Websocket is now closed.
export const WEBSOCKET_AUTH__SUCCESS =      'WEBSOCKET_AUTH__SUCCESS';      // Websocket has returned success authentication message.
export const WEBSOCKET_AUTH__FAILURE =      'WEBSOCKET_AUTH__FAILURE';      // Websocket has returned failed authentication message.
export const WEBSOCKET_MESSAGE__RECEIVED =  'WEBSOCKET_MESSAGE__RECEIVED';  // Websocket recieved message from server.
export const SHAREDB_DOC_AUTH__SUCCESS =    'SHAREDB_DOC_AUTH_SUCCESS';     // Server has successfully access to requested doc.
export const SHAREDB_DOC_AUTH__FAILURE =    'SHAREDB_DOC_AUTH__FAILURE';    // Server has failed access to requested doc.
export const SHAREDB_DOC_SUB__SUCCESS =     'SHAREDB_DOC_SUB__SUCCESS';     // Server has successfully subscribed to requested doc.
export const SHAREDB_DOC_SUB__FAILURE =     'SHAREDB_DOC_SUB__FAILURE';     // Server has failed subscribing to requested doc.
export const SHAREDB_DOC_RECEIVE_OP =       'SHAREDB_DOC_RECEIVE_OP';     // Server has failed subscribing to requested doc.

// Action types to be dispatched by the user
export const WEBSOCKET_ACCESS__REQUEST =    'WEBSOCKET_ACCESS__REQUEST';    // Kicks off the whole websocket connection.
export const WEBSOCKET__DISCONNECT =        'WEBSOCKET__DISCONNECT';
export const WEBSOCKET_MESSAGE__SEND =      'WEBSOCKET_MESSAGE__SEND';      // Send message to server.
export const SHAREDB_DOC_SUB__REQUEST =     'SHAREDB_DOC_SUB__REQUEST';
export const SHAREDB_DOC_UNSUB =            'SHAREDB_DOC_UNSUB';
export const SHAREDB_DOC_SUBMIT_OP =        'SHAREDB_DOC_SUBMIT_OP';





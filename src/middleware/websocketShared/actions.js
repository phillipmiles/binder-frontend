/* eslint-env browser */
// @flow
import { 
  WEBSOCKET_ACCESS__SUCCESS, 
  WEBSOCKET_ACCESS__FAILURE, 
  WEBSOCKET_AUTH__SUCCESS, 
  WEBSOCKET_AUTH__FAILURE, 
  WEBSOCKET_CONNECT, 
  WEBSOCKET__DISCONNECTED, 
  WEBSOCKET__OPEN, 
  WEBSOCKET__CLOSED, 
  WEBSOCKET_MESSAGE__RECEIVED, 
  WEBSOCKET_MESSAGE__SEND,
  SHAREDB_DOC_AUTH__SUCCESS,
  SHAREDB_DOC_AUTH__FAILURE,
  SHAREDB_DOC_SUB__SUCCESS,
  SHAREDB_DOC_SUB__FAILURE,
  SHAREDB_DOC_RECEIVE_OP
} from './types'

// These actions are more concerned with connection state
// and are trigged async by the WebSocketMiddleware

export const connectWebsocket = function (url) {
  return {
      type: WEBSOCKET_CONNECT,
      payload: {
          url: url
          // args: [url],
          // websocket: WebSocket
      }
  }
}

export const websocketOpen = (event) => ({
  type: WEBSOCKET__OPEN,
  payload: {
    timestamp: new Date(),
    event
  }
});

export const websocketClosed = (event) => ({
  type: WEBSOCKET__CLOSED,
  payload: {
    timestamp: new Date(),
    event
  }
});

// export const message = (event: MessageEvent): Action => ({
//   type: WEBSOCKET_MESSAGE,
//   payload: {
//     timestamp: new Date(),
//     data: event.data,
//     event
//   }
// });

// Custom

export const websocketMessageReceived = (event) => {
  return {
    type: WEBSOCKET_MESSAGE__RECEIVED,
    payload: {
      timestamp: new Date(),
      data: event.data,
      event
    }
  }
};

export const websocketMessageSend = function (data) {
  return {
      type: WEBSOCKET_MESSAGE__SEND,
      payload: data
  }
}


export const websocketAccessSuccess = (response) => {
  return {
    type: WEBSOCKET_ACCESS__SUCCESS,
    response: response,
    receivedAt: Date.now()
  }
}

export const websocketAccessFailed = (error) => {
  return {
    type: WEBSOCKET_ACCESS__FAILURE,
    message: error.message || 'Something went wrong.'
  }
}

export const websocketAuthenticated = (state, shareWrapper) => {
  return {
    type: WEBSOCKET_AUTH__SUCCESS,
    state: state,
    shareWrapper: shareWrapper,
    receivedAt: Date.now()
  }
}

export const websocketDocAuthSuccess = (state, shareWrapper, docId) => {
  return {
    type: SHAREDB_DOC_AUTH__SUCCESS,
    state: state,
    shareWrapper: shareWrapper,
    docId: docId,
    receivedAt: Date.now()
  }
}

export const websocketDocAuthFailure = (state, shareWrapper, docId, message) => {
  return {
    type: SHAREDB_DOC_AUTH__FAILURE,
    state: state,
    shareWrapper: shareWrapper,
    docId: docId,
    message: message,
    receivedAt: Date.now()
  }
}

export function shareDbReceiveOp(delta) {
  return {
    type: SHAREDB_DOC_RECEIVE_OP,
    delta: delta
  }
}


export function subscribedToDoc(docId) {
  return {
    type: SHAREDB_DOC_SUB__SUCCESS,
    docId
  }
}

export function subscribedToDocFail(docId, error) {
  return {
    type: SHAREDB_DOC_SUB__FAILURE,
    docId,
    code: error.code,
    message: error.message || 'Something went wrong.'
  }
}

export default {};

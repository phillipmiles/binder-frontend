// actions.js
import types from './types.js';

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
    documentSubscribe,
    documentUnsubscribe,
    documentSubmitOp
}
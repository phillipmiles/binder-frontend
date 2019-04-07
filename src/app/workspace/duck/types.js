// types.js
const FETCH_WORKSPACE_NODES_REQUEST = 'FETCH_WORKSPACE_NODES_REQUEST';
const FETCH_WORKSPACE_NODES_SUCCESS = 'FETCH_WORKSPACE_NODES_SUCCESS';
const FETCH_WORKSPACE_NODES_FAILURE = 'FETCH_WORKSPACE_NODES_FAILURE';

const ADD_WORKSPACE_NODES_SUCCESS = 'ADD_WORKSPACE_NODES_SUCCESS';
const INVALIDATE_WORKSPACE = 'INVALIDATE_WORKSPACE';



//--actuals
const UI_DOCUMENTS_TABLE_ITEM__EXPAND = 'UI_DOCUMENTS_TABLE_ITEM__EXPAND';
const UI_DOCUMENTS_TABLE_ITEM__COLLAPSE = 'UI_DOCUMENTS_TABLE_ITEM__COLLAPSE';
const UI_DOCUMENTS_TABLE_ITEM_EDIT__START = 'UI_DOCUMENTS_TABLE_ITEM_EDIT__START';
const UI_DOCUMENTS_TABLE_ITEM_EDIT__STOP = 'UI_DOCUMENTS_TABLE_ITEM_EDIT__STOP';
const UI_DOCUMENTS_TABLE_ITEM_EDIT__SUBMITTING = 'UI_DOCUMENTS_TABLE_ITEM_EDIT__SUBMITTING';
const UI_DOCUMENTS_TABLE_ITEM_NEW__START = 'UI_DOCUMENTS_TABLE_ITEM_NEW__START';
const UI_DOCUMENTS_TABLE_ITEM_NEW__STOP = 'UI_DOCUMENTS_TABLE_ITEM_NEW__STOP';
const UI_DOCUMENTS_TABLE_ITEM_NEW__SUBMITTING = 'UI_DOCUMENTS_TABLE_ITEM_NEW__SUBMITTING';
const UI_DOCUMENTS_TABLE_ITEM_DELETING__SUBMITTING = 'UI_DOCUMENTS_TABLE_ITEM_DELETING__SUBMITTING';
const UI_DOCUMENTS_TABLE_ITEM_DELETING__STOP = 'UI_DOCUMENTS_TABLE_ITEM_DELETING__STOP';

const UI_DOCUMENTS_TABLE_ITEM_DRAG__START = 'UI_DOCUMENTS_TABLE_ITEM_DRAG__START';
const UI_DOCUMENTS_TABLE_ITEM_DRAG__MOVE = 'UI_DOCUMENTS_TABLE_ITEM_DRAG__MOVE';
const UI_DOCUMENTS_TABLE_ITEM_DRAG__STOP = 'UI_DOCUMENTS_TABLE_ITEM_DRAG__STOP';

const UI_DOCUMENTS_TABLE_ITEM_DRAG_HOVER__ON = 'UI_DOCUMENTS_TABLE_ITEM_DRAG_HOVER__ON';
const UI_DOCUMENTS_TABLE_ITEM_DRAG_HOVER__OFF = 'UI_DOCUMENTS_TABLE_ITEM_DRAG_HOVER__OFF';

const UI_DOCUMENTS_TABLE_ITEM_MOVE__SUBMITTING = 'UI_DOCUMENTS_TABLE_ITEM_MOVE__SUBMITTING';
const UI_DOCUMENTS_TABLE_ITEM_MOVE__STOP = 'UI_DOCUMENTS_TABLE_ITEM_MOVE__STOP';

export default {
    FETCH_WORKSPACE_NODES_REQUEST,
    FETCH_WORKSPACE_NODES_SUCCESS,
    FETCH_WORKSPACE_NODES_FAILURE,
    ADD_WORKSPACE_NODES_SUCCESS,
    INVALIDATE_WORKSPACE,

    UI_DOCUMENTS_TABLE_ITEM__EXPAND,
    UI_DOCUMENTS_TABLE_ITEM__COLLAPSE,
    UI_DOCUMENTS_TABLE_ITEM_EDIT__START,
    UI_DOCUMENTS_TABLE_ITEM_EDIT__STOP,
    UI_DOCUMENTS_TABLE_ITEM_EDIT__SUBMITTING,
    UI_DOCUMENTS_TABLE_ITEM_NEW__START,
    UI_DOCUMENTS_TABLE_ITEM_NEW__STOP,
    UI_DOCUMENTS_TABLE_ITEM_NEW__SUBMITTING,
    UI_DOCUMENTS_TABLE_ITEM_DELETING__SUBMITTING,
    UI_DOCUMENTS_TABLE_ITEM_DELETING__STOP,
    UI_DOCUMENTS_TABLE_ITEM_DRAG__START,
    UI_DOCUMENTS_TABLE_ITEM_DRAG__MOVE,
    UI_DOCUMENTS_TABLE_ITEM_DRAG__STOP,
    UI_DOCUMENTS_TABLE_ITEM_DRAG_HOVER__ON,
    UI_DOCUMENTS_TABLE_ITEM_DRAG_HOVER__OFF,
    UI_DOCUMENTS_TABLE_ITEM_MOVE__SUBMITTING,
    UI_DOCUMENTS_TABLE_ITEM_MOVE__STOP
}
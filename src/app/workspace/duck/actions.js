// actions.js
import types from './types.js';

function expandDocumentsTableItem(nodeId) {
    return { 
        type: types.UI_DOCUMENTS_TABLE_ITEM__EXPAND,
        nodeId: nodeId,
    }
}

function collapseDocumentsTableItem(nodeId) {
    return { 
        type: types.UI_DOCUMENTS_TABLE_ITEM__COLLAPSE,
        nodeId: nodeId,
    }
}

function dragDocumentsTableItem(nodeId, clickCallback) {
    return { 
        type: types.UI_DOCUMENTS_TABLE_ITEM_DRAG__START,
        nodeId: nodeId,
        clickCallback: clickCallback
    }
}

function setNodeDragHoverOn(nodeId, state) {
    return { 
        type: types.UI_DOCUMENTS_TABLE_ITEM_DRAG_HOVER__ON,
        nodeId: nodeId,
        state: state
    }
}

function setNodeDragHoverOff() {
    return { 
        type: types.UI_DOCUMENTS_TABLE_ITEM_DRAG_HOVER__OFF
    }
}

function moveDragDocumentsTableItem(nodeId) {
    return { 
        type: types.UI_DOCUMENTS_TABLE_ITEM_DRAG__MOVE,
        nodeId: nodeId
    }
}

function releaseDragDocumentsTableItem(nodeId) {
    return { 
        type: types.UI_DOCUMENTS_TABLE_ITEM_DRAG__STOP,
        nodeId: nodeId,
    }
}

function startRenamingDocumentsTableItem(nodeId) {
    return { 
        type: types.UI_DOCUMENTS_TABLE_ITEM_EDIT__START,
        nodeId: nodeId,
    }
}

function stopRenamingDocumentsTableItem(nodeId) { 
    return { 
        type: types.UI_DOCUMENTS_TABLE_ITEM_EDIT__STOP,
        nodeId: nodeId
    }
}

function startNamingNewDocumentsTableItem(parentNodeId, nodeType) {
    return { 
        type: types.UI_DOCUMENTS_TABLE_ITEM_NEW__START,
        parentNodeId,
        nodeType
    }
}
function stopNamingNewDocumentsTableItem() { return { type: types.UI_DOCUMENTS_TABLE_ITEM_NEW__STOP }}

export default {
    expandDocumentsTableItem,
    collapseDocumentsTableItem,
    startRenamingDocumentsTableItem,
    stopRenamingDocumentsTableItem,
    startNamingNewDocumentsTableItem,
    stopNamingNewDocumentsTableItem,
    dragDocumentsTableItem,
    moveDragDocumentsTableItem,
    releaseDragDocumentsTableItem,
    setNodeDragHoverOn,
    setNodeDragHoverOff
}
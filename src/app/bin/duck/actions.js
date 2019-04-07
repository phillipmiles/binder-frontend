// actions.js
import types from './types.js';

function expandBinTableItem(nodeId) {
    return { 
        type: types.UI_BIN_TABLE_ITEM__EXPAND,
        nodeId: nodeId,
    }
}

function collapseBinTableItem(nodeId) {
    return { 
        type: types.UI_BIN_TABLE_ITEM__COLLAPSE,
        nodeId: nodeId,
    }
}

export default {
    expandBinTableItem,
    collapseBinTableItem
}
// actions.js
import types from './types.js';

// function requestWorkspaces(user) {
//     return {
//         type: types.REQUEST_WORKSPACES,
//         user
//     }
// }


//-----



function startRenamingWorkspacesTableItem(nodeId) {
    return { 
        type: types.UI_WORKSPACES_TABLE_ITEM_EDIT__START,
        nodeId: nodeId,
    }
}

function stopRenamingWorkspacesTableItem(nodeId) { 
    return { 
        type: types.UI_WORKSPACES_TABLE_ITEM_EDIT__STOP,
        nodeId: nodeId
    }
}

function startNamingNewWorkspacesTableItem(parentNodeId, nodeType) {
    return { 
        type: types.UI_WORKSPACES_TABLE_ITEM_NEW__START,
        parentNodeId,
        nodeType
    }
}
function stopNamingNewWorkspacesTableItem() { return { type: types.UI_WORKSPACES_TABLE_ITEM_NEW__STOP }}

export default {
    // requestWorkspaces,

    startRenamingWorkspacesTableItem,
    stopRenamingWorkspacesTableItem,
    startNamingNewWorkspacesTableItem,
    stopNamingNewWorkspacesTableItem
}
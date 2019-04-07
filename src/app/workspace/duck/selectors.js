// selectors.js
const isDocumentsTableItemExpanded = (state, nodeId) => {
    if(state.workspaceDocuments.documentsTableItemsExpanded.indexOf(nodeId) >= 0) {
        return true;
    }
    return false;
}

const isDocumentsTableItemEditing = (state, nodeId) => {
    if(state.workspaceDocuments.documentsTableItemsEditing.indexOf(nodeId) >= 0) {
        return true;
    }
    return false;
}


const isDocumentsTableItemSubmitting = (state, nodeId) => {
    if(state.workspaceDocuments.documentsTableItemsEditingLocked.indexOf(nodeId) >= 0) {
        return true;
    }
    return false;
}

const isDocumentsTableItemMoving = (state, nodeId) => {
    if(state.workspaceDocuments.documentsTableItemMoving.indexOf(nodeId) >= 0) {
        return true;
    }
    return false;
}

const isDocumentsTableItemDeleting = (state, nodeId) => {
    if(state.workspaceDocuments.documentsTableItemsDeleting.indexOf(nodeId) >= 0) {
        return true;
    }
    return false;
}

const getDocumentsTableDragOverPosition = (state) => state.workspaceDocuments.documentsTableDragOverPosition;

const getDraggedTableItemId = (state) => state.workspaceDocuments.documentsTableDraggingItem;
const getDragClickCallback = (state) => state.workspaceDocuments.documentsTableDraggingItemClickCallback;
const getNewDocumentsTableItemParentId = (state) => state.workspaceDocuments.documentsTableNewItemParentId;
const getNewDocumentsTableItemNodeType = (state) => state.workspaceDocuments.documentsTableNewItemNodeType;
const isNewDocumentsTableItemSubmitting = (state) => state.workspaceDocuments.documentsTableNewItemSubmitting;



// const getIds = (state = []) => state.ids;

// const getNodesListByWorkspace = (state, workspaceId) => {
//     const nodeIds = getIds(state.nodeIdsByWorkspace[workspaceId]);
//     // We can't assume nodeIdsByWorkspace[workspaceId] has been initialised.
//     return nodeIds ? nodeIds.map(id => state.entities.workspaceNodesById[id]) : [];
// }


// const getIsFetchingWorkspaceNodes = (state, workspaceId) => {
//     if(state.nodeIdsByWorkspace[workspaceId]) {
//         return state.nodeIdsByWorkspace[workspaceId].isFetching;    
//     }
//     return false;
// }

// const getErrorMessageWorkspaceNodes = (state, workspaceId) => {
//     if(state.nodeIdsByWorkspace[workspaceId]) {
//         return state.nodeIdsByWorkspace[workspaceId].errorMessage;    
//     }
//     return false;
// }

export default {
    isDocumentsTableItemExpanded,
    isDocumentsTableItemEditing,
    isDocumentsTableItemSubmitting,
    getNewDocumentsTableItemParentId,
    getNewDocumentsTableItemNodeType,
    isNewDocumentsTableItemSubmitting,
    isDocumentsTableItemDeleting,
    isDocumentsTableItemMoving,
    getDraggedTableItemId,
    getDragClickCallback,
    getDocumentsTableDragOverPosition
}

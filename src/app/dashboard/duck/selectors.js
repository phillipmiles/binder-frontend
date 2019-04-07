// selectors.js

const getWorkspacesList = (state) => {
    const workspaces = getIds(state.workspaces);
    console.log('Workspaces length', workspaces.length)
    console.log('Entities length', state.entities)
    return workspaces.map(id => state.entities.workspaceNodesById[id]);
}

const getIsFetchingWorkspaces = (state) => state.workspaces.isFetching;
const getErrorMessageWorkspaces = (state) => state.workspaces.errorMessage;
const getIds = (state) => state.ids;

//----

const isWorkspacesTableAddingNewItem = (state) => state.workspaces.workspacesTableNewItemEditing;



const isWorkspacesTableItemEditing = (state, nodeId) => {
    if(state.workspaces.workspacesTableItemsEditing.indexOf(nodeId) >= 0) {
        return true;
    }
    return false;
}

const isWorkspacesTableItemDeleting = (state, nodeId) => {
    if(state.workspaces.workspacesTableItemsDeleting.indexOf(nodeId) >= 0) { 
        return true;
    }
    return false;
}

const isWorkspacesTableItemSubmitting = (state, nodeId) => {
    if(state.workspaces.workspacesTableItemsEditingLocked.indexOf(nodeId) >= 0) {
        return true;
    }
    return false;
}


const isNewWorkspacesTableItemSubmitting = (state) => state.workspaces.documentsTableNewItemSubmitting;

export default {
    getWorkspacesList,
    getIsFetchingWorkspaces,
    getErrorMessageWorkspaces,
    getIds,

    isWorkspacesTableAddingNewItem,
    isWorkspacesTableItemEditing,
    isWorkspacesTableItemSubmitting,
    isNewWorkspacesTableItemSubmitting,
    isWorkspacesTableItemDeleting
}



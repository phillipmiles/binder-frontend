// selectors.js
const getIds = (state = []) => state.ids;

const getNodesListByWorkspace = (state, workspaceId) => {
    const nodeIds = getIds(state.nodeIdsByWorkspace[workspaceId]);
    // We can't assume nodeIdsByWorkspace[workspaceId] has been initialised.
    return nodeIds ? nodeIds.map(id => state.entities.workspaceNodesById[id]) : [];
}


const getIsFetchingWorkspaceNodes = (state, workspaceId) => {
    if(state.nodeIdsByWorkspace[workspaceId]) {
        return state.nodeIdsByWorkspace[workspaceId].isFetching;    
    }
    return false;
}

const getErrorMessageWorkspaceNodes = (state, workspaceId) => {
    if(state.nodeIdsByWorkspace[workspaceId]) {
        return state.nodeIdsByWorkspace[workspaceId].errorMessage;    
    }
    return false;
}

export default {
    getIds,
    getNodesListByWorkspace,
    getIsFetchingWorkspaceNodes,
    getErrorMessageWorkspaceNodes
}



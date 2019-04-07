// reducers.js
import { combineReducers } from 'redux'
import types from './types';


const ids = (state = [], action) => {
    switch (action.type) {
        case types.FETCH_WORKSPACE_NODES_SUCCESS:
            return action.response.map(workspaceNode => workspaceNode.id)
        case types.ADD_WORKSPACE_NODES_SUCCESS:
            return [...state, action.response.id];
        default:
            return state;
    }
};

const didInvalidate = (state = false, action) => {
    switch (action.type) {
        case types.INVALIDATE_WORKSPACE:
            return true
        case types.FETCH_WORKSPACE_NODES_REQUEST:
            return false
        case types.FETCH_WORKSPACE_NODES_SUCCESS:
            return false
        default:
            return state;
    }
};

const isFetching = (state = false, action) => {
    switch (action.type) {
        case types.FETCH_WORKSPACE_NODES_REQUEST:
            return true
        case types.FETCH_WORKSPACE_NODES_SUCCESS:
        case types.FETCH_WORKSPACE_NODES_FAILURE:
            return false
        default:
            return state;
    }
};

const lastUpdated = (state = Date(), action) => {
    switch (action.type) {
        case types.FETCH_WORKSPACE_NODES_SUCCESS:
            return action.receivedAt
        default:
            return state;
    }
};

const errorMessage = (state = null, action) => {
    switch (action.type) {
        case types.FETCH_WORKSPACE_NODES_FAILURE:
            return action.message
        case types.FETCH_WORKSPACE_NODES_REQUEST:
        case types.FETCH_WORKSPACE_NODES_SUCCESS:
            return null;
        default:
            return state;
    }
};


const workspacesNodes = combineReducers({
    ids,
    didInvalidate,
    isFetching,
    lastUpdated,
    errorMessage
});



function nodeIdsByWorkspace(state = {}, action) {
    switch (action.type) {
        case types.INVALIDATE_WORKSPACE:
        case types.FETCH_WORKSPACE_NODES_SUCCESS:
        case types.FETCH_WORKSPACE_NODES_REQUEST:
        case types.FETCH_WORKSPACE_NODES_FAILURE:
            return Object.assign({}, state, {
                [action.workspaceId]: workspacesNodes(state[action.workspaceId], action)
            })
        default:
            return state
    }
}

export default nodeIdsByWorkspace;
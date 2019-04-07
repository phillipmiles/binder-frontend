// operations.js
// operations, thunks, sagas, epics, etc (essentially just more action creators.)
import Creators from './actions';
import types from './types';
import { userTypes } from '../../duck/user';
import * as api from '../../../utils/api';
import { workspacesSelectors } from './';
import { workspaceNodesTypes } from '../../duck/workspaceNodes';

// const requestWorkspaces = Creators.requestWorkspaces;
const startRenamingWorkspacesTableItem = Creators.startRenamingWorkspacesTableItem;
const stopRenamingWorkspacesTableItem = Creators.stopRenamingWorkspacesTableItem;
const startNamingNewWorkspacesTableItem = Creators.startNamingNewWorkspacesTableItem;
const stopNamingNewWorkspacesTableItem = Creators.stopNamingNewWorkspacesTableItem;


const deleteWorkspacesTableItem = (nodeId) => (dispatch, getState) => {

    if (workspacesSelectors.isWorkspacesTableItemDeleting(getState(), nodeId)) {
        return Promise.resolve();
    }
    dispatch({
        type: workspaceNodesTypes.DELETE_WORKSPACE_NODE__REQUEST,
        nodeId
    });
    dispatch({
        type: types.UI_WORKSPACES_TABLE_ITEM_DELETING__SUBMITTING,
        nodeId
    });
    return api.binNode(nodeId).then(
        response => {
            dispatch({
                type: workspaceNodesTypes.DELETE_WORKSPACE_NODE__SUCCESS,
                nodeId,
                response: response.data.result.node,
                receivedAt: Date.now()
            })
            dispatch({
                type: types.UI_WORKSPACES_TABLE_ITEM_DELETING__STOP,
                nodeId
            })
        },
        error => {
            if (error.code === 401)
                dispatch({ type: userTypes.REAUTHENTICATE })
            dispatch({
                type: workspaceNodesTypes.DELETE_WORKSPACE_NODE__FAILURE,
                nodeId,
                message: error.message || 'Something went wrong.'
            })
            dispatch({
                type: types.UI_WORKSPACES_TABLE_ITEM_DELETING__STOP,
                nodeId
            })
        }
    );
};


const editWorkspacesTableItemTitle = (nodeId, title) => (dispatch, getState) => {

    if (workspacesSelectors.isWorkspacesTableItemSubmitting(getState(), nodeId)) {
        return Promise.resolve();
    }
    dispatch({
        type: workspaceNodesTypes.RENAME_WORKSPACE_NODE__REQUEST,
        nodeId,
        title
    });
    dispatch({
        type: types.UI_WORKSPACES_TABLE_ITEM_EDIT__SUBMITTING,
        nodeId,
        title
    });
    return api.editNodeContentTitle(nodeId, title).then(
        response => {
            dispatch({
                type: workspaceNodesTypes.RENAME_WORKSPACE_NODE__SUCCESS,
                nodeId,
                title,
                response: response.data.result.nodeContent,
                receivedAt: Date.now()
            })
            dispatch({
                type: types.UI_WORKSPACES_TABLE_ITEM_EDIT__STOP,
                nodeId
            })
        },
        error => {
            if (error.code === 401)
                dispatch({ type: userTypes.REAUTHENTICATE })
            dispatch({
                type: workspaceNodesTypes.RENAME_WORKSPACE_NODE__FAILURE,
                nodeId,
                title,
                message: error.message || 'Something went wrong.'
            })
            dispatch({
                type: types.UI_WORKSPACES_TABLE_ITEM_EDIT__STOP,
                nodeId
            })
        }
    );
};


const submitNewWorkspacesTableItem = (parentNodeId, nodeType, title) => (dispatch, getState) => {
    console.log('workspaceNodesTypes',workspaceNodesTypes.ADD_WORKSPACE_NODE__REQUEST)
    if (workspacesSelectors.isNewWorkspacesTableItemSubmitting(getState())) {
        return Promise.resolve();
    }
    dispatch({
        type: workspaceNodesTypes.ADD_WORKSPACE_NODE__REQUEST,
        parentNodeId,
        nodeType,
        title
    });
    dispatch({
        type: types.UI_WORKSPACES_TABLE_ITEM_NEW__SUBMITTING,
        parentNodeId,
        nodeType,
        title
    });
    return api.addWorkspaceNode(parentNodeId, nodeType, title, 0).then(
        response => {
            dispatch({
                type: workspaceNodesTypes.ADD_WORKSPACE_NODE__SUCCESS,
                parentNodeId,
                nodeType,
                title,
                response: response.data.result.node,
                receivedAt: Date.now()
            })
            dispatch({
                type: types.UI_WORKSPACES_TABLE_ITEM_NEW__STOP,
                parentNodeId,
                nodeType,
                title
            })
        },
        error => {
            if (error.code === 401)
                dispatch({ type: userTypes.REAUTHENTICATE })
            dispatch({
                type: workspaceNodesTypes.ADD_WORKSPACE_NODE__FAILURE,
                parentNodeId,
                nodeType,
                title,
                message: error.message || 'Something went wrong.'
            })
            dispatch({
                type: types.UI_WORKSPACES_TABLE_ITEM_NEW__STOP,
                parentNodeId,
                nodeType,
                title
            })
        }
    );
};

export default {
    editWorkspacesTableItemTitle,
    submitNewWorkspacesTableItem,

    startRenamingWorkspacesTableItem,
    stopRenamingWorkspacesTableItem,
    startNamingNewWorkspacesTableItem,
    stopNamingNewWorkspacesTableItem,
    
    deleteWorkspacesTableItem
}
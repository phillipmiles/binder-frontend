// operations.js
// operations, thunks, sagas, epics, etc (essentially just more action creators.)
import Creators from './actions';
import { workspaceDocumentsSelectors  } from './'
import types from './types';
import { workspaceNodesTypes, workspaceNodesOperations } from '../../duck/workspaceNodes';
import { userTypes, userSelectors } from '../../duck/user';
import * as api from '../../../utils/api';

const expandDocumentsTableItem = Creators.expandDocumentsTableItem;
const collapseDocumentsTableItem = Creators.collapseDocumentsTableItem;
const startRenamingDocumentsTableItem = Creators.startRenamingDocumentsTableItem;
const stopRenamingDocumentsTableItem = Creators.stopRenamingDocumentsTableItem;
const startNamingNewDocumentsTableItem = Creators.startNamingNewDocumentsTableItem;
const stopNamingNewDocumentsTableItem = Creators.stopNamingNewDocumentsTableItem;
const dragDocumentsTableItem = Creators.dragDocumentsTableItem;
const moveDragDocumentsTableItem = Creators.moveDragDocumentsTableItem;
const releaseDragDocumentsTableItem = Creators.releaseDragDocumentsTableItem;
const setNodeDragHoverOn = Creators.setNodeDragHoverOn;
const setNodeDragHoverOff = Creators.setNodeDragHoverOff;



const moveDocumentsTableItem = (nodeId, moveToParentNodeId, moveToIndex) => (dispatch, getState) => {

    if (workspaceDocumentsSelectors.isDocumentsTableItemMoving(getState(), nodeId)) {
        return Promise.resolve();
    }
    dispatch({
        type: workspaceNodesTypes.MOVE_WORKSPACE_NODE__REQUEST,
        nodeId,
        // parentNode,
        // index,
        // moveToParentNode,
        // moveToIndex
    });
    dispatch({
        type: types.UI_DOCUMENTS_TABLE_ITEM_MOVE__SUBMITTING,
        nodeId,
        // parentNode,
        // index,
        // moveToParentNode,
        // moveToIndex
    });
    return api.moveNode(nodeId, moveToParentNodeId, moveToIndex).then(
        response => {
            dispatch({
                type: workspaceNodesTypes.MOVE_WORKSPACE_NODE__SUCCESS,
                nodeId,
                response: response.data,
                receivedAt: Date.now()
            })
            dispatch({
                type: types.UI_DOCUMENTS_TABLE_ITEM_MOVE__STOP,
                nodeId
            })
            // Cheap - alters entire DOM.
            dispatch(workspaceNodesOperations.fetchWorkspaceNodes(userSelectors.getUserId(getState())))
        },
        error => {
            if (error.code === 401)
                dispatch({ type: userTypes.REAUTHENTICATE })
            dispatch({
                type: workspaceNodesTypes.MOVE_WORKSPACE_NODE__FAILURE,
                nodeId,
                message: error.message || 'Something went wrong.'
            })
            dispatch({
                type: types.UI_DOCUMENTS_TABLE_ITEM_MOVE__STOP,
                nodeId
            })
        }
    );
};



const deleteDocumentsTableItem = (nodeId) => (dispatch, getState) => {

    if (workspaceDocumentsSelectors.isDocumentsTableItemDeleting(getState(), nodeId)) {
        return Promise.resolve();
    }
    dispatch({
        type: workspaceNodesTypes.DELETE_WORKSPACE_NODE__REQUEST,
        nodeId
    });
    dispatch({
        type: types.UI_DOCUMENTS_TABLE_ITEM_DELETING__SUBMITTING,
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
                type: types.UI_DOCUMENTS_TABLE_ITEM_DELETING__STOP,
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
                type: types.UI_DOCUMENTS_TABLE_ITEM_DELETING__STOP,
                nodeId
            })
        }
    );
};


const editDocumentsTableItemTitle = (nodeId, title) => (dispatch, getState) => {

    if (workspaceDocumentsSelectors.isDocumentsTableItemSubmitting(getState(), nodeId)) {
        return Promise.resolve();
    }
    dispatch({
        type: workspaceNodesTypes.RENAME_WORKSPACE_NODE__REQUEST,
        nodeId,
        title
    });
    dispatch({
        type: types.UI_DOCUMENTS_TABLE_ITEM_EDIT__SUBMITTING,
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
                type: types.UI_DOCUMENTS_TABLE_ITEM_EDIT__STOP,
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
                type: types.UI_DOCUMENTS_TABLE_ITEM_EDIT__STOP,
                nodeId
            })
        }
    );
};


const submitNewDocumentsTableItem = (parentNodeId, nodeType, title) => (dispatch, getState) => {
    
    if (workspaceDocumentsSelectors.isNewDocumentsTableItemSubmitting(getState())) {
        return Promise.resolve();
    }
    dispatch({
        type: workspaceNodesTypes.ADD_WORKSPACE_NODE__REQUEST,
        parentNodeId,
        nodeType,
        title
    });
    dispatch({
        type: types.UI_DOCUMENTS_TABLE_ITEM_NEW__SUBMITTING,
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
                type: types.UI_DOCUMENTS_TABLE_ITEM_NEW__STOP,
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
                type: types.UI_DOCUMENTS_TABLE_ITEM_NEW__STOP,
                parentNodeId,
                nodeType,
                title
            })
        }
    );
};

export default {
    expandDocumentsTableItem,
    collapseDocumentsTableItem,
    startRenamingDocumentsTableItem,
    stopRenamingDocumentsTableItem,
    editDocumentsTableItemTitle,
    startNamingNewDocumentsTableItem,
    stopNamingNewDocumentsTableItem,
    submitNewDocumentsTableItem,
    moveDocumentsTableItem,
    deleteDocumentsTableItem,
    dragDocumentsTableItem,
    moveDragDocumentsTableItem,
    releaseDragDocumentsTableItem,
    setNodeDragHoverOn,
    setNodeDragHoverOff
}
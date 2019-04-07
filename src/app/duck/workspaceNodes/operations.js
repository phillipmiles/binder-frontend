// operations.js
// operations, thunks, sagas, epics, etc (essentially just more action creators.)
import types from './types';
import { userTypes } from '../../duck/user';
import * as api from '../../../utils/api';
import { workspaceNodesSelectors } from './';


const fetchWorkspaceNodes = (userId) => (dispatch, getState) => {
    if (workspaceNodesSelectors.getIsFetchingNodes(getState(), userId)) {
        return Promise.resolve();
    }
    dispatch({
        type: types.FETCH_WORKSPACE_NODES_REQUEST,
        userId
    });
    return api.fetchWorkspaceNodes(userId).then(
        response => {
            dispatch({
                type: types.FETCH_WORKSPACE_NODES_SUCCESS,
                userId,
                response: response.data.result.nodes,
                receivedAt: Date.now()
            })
        },
        error => {
            if (error.code === 401)
                dispatch({ type: userTypes.REAUTHENTICATE })
            dispatch({
                type: types.FETCH_WORKSPACE_NODES_FAILURE,
                userId,
                message: error.message || 'Something went wrong.'
            })
        }
    );
};


const addWorkspaceNode = (text) => (dispatch) =>
    api.addWorkspaceNode(text).then(response => {
        dispatch({
            type: types.ADD_WORKSPACE_NODE_SUCCESS,
            response,
        })
    });



export default {
    // requestWorkspaces,
    fetchWorkspaceNodes,
    addWorkspaceNode
}
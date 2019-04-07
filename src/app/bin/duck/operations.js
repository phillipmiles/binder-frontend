// operations.js
// operations, thunks, sagas, epics, etc (essentially just more action creators.)
import Creators from './actions';
import types from './types';
import { userTypes } from '../../duck/user';
import * as api from '../../../utils/api';
import { workspaceNodesSelectors, workspaceNodesTypes } from '../../duck/workspaceNodes';

const expandBinTableItem = Creators.expandBinTableItem;
const collapseBinTableItem = Creators.collapseBinTableItem;


// operations.js
// operations, thunks, sagas, epics, etc (essentially just more action creators.)

const fetchBinnedNodes = (userId) => (dispatch, getState) => {
    if (workspaceNodesSelectors.getIsFetchingNodes(getState(), userId)) {
        return Promise.resolve();
    }
    dispatch({
        type: workspaceNodesTypes.FETCH_WORKSPACE_NODES_REQUEST,
        userId
    });
    return api.fetchBinnedNodes(userId).then(
        response => {
            dispatch({
                type: workspaceNodesTypes.FETCH_WORKSPACE_NODES_SUCCESS,
                userId,
                response: response.data.result.nodes,
                receivedAt: Date.now()
            })
        },
        error => {
            if (error.code === 401)
                dispatch({ type: userTypes.REAUTHENTICATE })
            dispatch({
                type: workspaceNodesTypes.FETCH_WORKSPACE_NODES_FAILURE,
                userId,
                message: error.message || 'Something went wrong.'
            })
        }
    );
};


export default {
    expandBinTableItem,
    collapseBinTableItem,
    fetchBinnedNodes
}
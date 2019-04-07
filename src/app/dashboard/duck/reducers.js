// reducers.js
import { combineReducers } from 'redux'
import types from './types';
import { pull, union } from 'lodash';

// const ids = (state = [], action) => {
//     switch (action.type) {
//         case types.FETCH_WORKSPACES_SUCCESS:
//             return action.response.map(workspace => workspace.id)
//         case types.ADD_WORKSPACE_SUCCESS:
//             return [...state, action.response.data.result.workspace.id];
//         default:
//             return state;
//     }
// };

// const didInvalidate = (state = false, action) => {
//     switch (action.type) {
//         case types.INVALIDATE_WORKSPACES:
//             return true
//         case types.FETCH_WORKSPACES_REQUEST:
//             return false
//         case types.FETCH_WORKSPACES_SUCCESS:
//             return false
//         default:
//             return state;
//     }
// };

// const isFetching = (state = false, action) => {
//     switch (action.type) {
//         case types.FETCH_WORKSPACES_REQUEST:
//             return true
//         case types.FETCH_WORKSPACES_SUCCESS:
//         case types.FETCH_WORKSPACES_FAILURE:
//             return false
//         default:
//             return state;
//     }
// };

// const lastUpdated = (state = Date(), action) => {
//     switch (action.type) {
//         case types.FETCH_WORKSPACES_SUCCESS:
//             return action.receivedAt
//         default:
//             return state;
//     }
// };

// const errorMessage = (state = null, action) => {
//     switch (action.type) {
//         case types.FETCH_WORKSPACES_FAILURE:
//             return action.message
//         case types.FETCH_WORKSPACES_REQUEST:
//         case types.FETCH_WORKSPACES_SUCCESS:
//             return null;
//         default:
//             return state;
//     }
// };







// ----







const workspacesTableItemsEditing = (state = [], action) => {
    switch (action.type) {
        case types.UI_WORKSPACES_TABLE_ITEM_EDIT__START:
            return union(state, [action.nodeId]);
        case types.UI_WORKSPACES_TABLE_ITEM_EDIT__STOP:
            return pull([...state], action.nodeId);
        default:
            return state;
    }
}

const workspacesTableItemsEditingLocked = (state = [], action) => {
    switch (action.type) {
        case types.UI_WORKSPACES_TABLE_ITEM_EDIT__SUBMITTING:
            return union(state, [action.nodeId]);
        case types.UI_WORKSPACES_TABLE_ITEM_EDIT__STOP:
            return pull([...state], action.nodeId);
        default:
            return state;
    }
}



// const documentsTableNewItemNodeType = (state = null, action) => {
//     switch (action.type) {
//         case types.UI_DOCUMENTS_TABLE_ITEM_NEW__START:
//             return action.nodeType;
//         case types.UI_DOCUMENTS_TABLE_ITEM_NEW__STOP:
//             return null;
//         default:
//             return state;
//     }
// }

const workspacesTableNewItemEditing = (state = false, action) => {
    switch (action.type) {
        case types.UI_WORKSPACES_TABLE_ITEM_NEW__START:
            return true;
        case types.UI_WORKSPACES_TABLE_ITEM_NEW__STOP:
            return false;
        default:
            return state;
    }
}


const workspacesTableItemsDeleting = (state = [], action) => {
    switch (action.type) {
        case types.UI_WORKSPACES_TABLE_ITEM_DELETING__SUBMITTING:
            return union(state, [action.nodeId]);
        case types.UI_WORKSPACES_TABLE_ITEM_DELETING__STOP:
            return pull([...state], action.nodeId);
        default:
            return state;
    }
}

const workspacesTableNewItemSubmitting = (state = false, action) => {
    switch (action.type) {
        case types.UI_WORKSPACES_TABLE_ITEM_NEW__START:
        case types.UI_WORKSPACES_TABLE_ITEM_NEW__STOP:
            return false;
        case types.UI_WORKSPACES_TABLE_ITEM_NEW__SUBMITTING:
            return true;
        default:
            return state;
    }
}

const workspacesReducer = combineReducers({
    // ids,
    // didInvalidate,
    // isFetching,
    // lastUpdated,
    // errorMessage,

    workspacesTableItemsEditing,
    workspacesTableItemsEditingLocked,
    workspacesTableNewItemEditing,
    workspacesTableNewItemSubmitting,
    workspacesTableItemsDeleting
});

export default workspacesReducer;
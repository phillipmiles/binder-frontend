// reducers.js
import { combineReducers } from 'redux'
import types from './types';
import { pull, union } from 'lodash';


const documentsTableItemsExpanded = (state = [], action) => {
    switch (action.type) {
        case types.UI_DOCUMENTS_TABLE_ITEM__EXPAND:
            return union(state, [action.nodeId]);
        case types.UI_DOCUMENTS_TABLE_ITEM__COLLAPSE:
            return pull([...state], action.nodeId);
        default:
            return state;
    }
};

const documentsTableItemsEditing = (state = [], action) => {
    switch (action.type) {
        case types.UI_DOCUMENTS_TABLE_ITEM_EDIT__START:
            return union(state, [action.nodeId]);
        case types.UI_DOCUMENTS_TABLE_ITEM_EDIT__STOP:
            return pull([...state], action.nodeId);
        default:
            return state;
    }
}

const documentsTableItemsEditingLocked = (state = [], action) => {
    switch (action.type) {
        case types.UI_DOCUMENTS_TABLE_ITEM_EDIT__SUBMITTING:
            return union(state, [action.nodeId]);
        case types.UI_DOCUMENTS_TABLE_ITEM_EDIT__STOP:
            return pull([...state], action.nodeId);
        default:
            return state;
    }
}

const documentsTableItemMoving = (state = [], action) => {
    switch (action.type) {
        case types.UI_DOCUMENTS_TABLE_ITEM_MOVE__SUBMITTING:
            return union(state, [action.nodeId]);
        case types.UI_DOCUMENTS_TABLE_ITEM_MOVE__STOP:
            return pull([...state], action.nodeId);
        default:
            return state;
    }
}

const documentsTableItemsDeleting = (state = [], action) => {
    switch (action.type) {
        case types.UI_DOCUMENTS_TABLE_ITEM_DELETING__SUBMITTING:
            return union(state, [action.nodeId]);
        case types.UI_DOCUMENTS_TABLE_ITEM_DELETING__STOP:
            return pull([...state], action.nodeId);
        default:
            return state;
    }
}

// const documentsTableItemNew = (state = null, action) => {
//     switch (action.type) {
//         case types.UI_DOCUMENTS_TABLE_ITEM_NEW__START:
//             return { 
//                 parentNodeId: action.parentNodeId,
//                 nodeType: action.nodeType,
//                 locked: false
//             }
//         case types.UI_DOCUMENTS_TABLE_ITEM_EDIT__SUBMITTING:
//             return { 
//                 parentNodeId: action.parentNodeId,
//                 nodeType: action.nodeType,
//                 locked: true
//             }
//         case types.UI_DOCUMENTS_TABLE_ITEM_NEW__STOP:
//             return null
//         default:
//             return state;
//     }
// }

const documentsTableDraggingItem = (state = null, action) => {
    switch (action.type) {
        case types.UI_DOCUMENTS_TABLE_ITEM_DRAG__START:
            return action.nodeId;
        case types.UI_DOCUMENTS_TABLE_ITEM_DRAG__STOP:
            return null;
        default:
            return state;
    }
}

const documentsTableDragOverPosition = (state = { nodeId: null, state: null }, action) => {
    switch (action.type) {
        case types.UI_DOCUMENTS_TABLE_ITEM_DRAG_HOVER__ON:
            return {
                nodeId: action.nodeId,
                state: action.state
            }
        case types.UI_DOCUMENTS_TABLE_ITEM_DRAG_HOVER__OFF:
            return {
                nodeId: null,
                state: null
            };
        default:
            return state;
    }
}

const documentsTableDraggingItemClickCallback = (state = null, action) => {
    switch (action.type) {
        case types.UI_DOCUMENTS_TABLE_ITEM_DRAG__START:
            return action.clickCallback;
        case types.UI_DOCUMENTS_TABLE_ITEM_DRAG__STOP:
            return null;
        default:
            return state;
    }
}


const documentsTableNewItemNodeType = (state = null, action) => {
    switch (action.type) {
        case types.UI_DOCUMENTS_TABLE_ITEM_NEW__START:
            return action.nodeType;
        case types.UI_DOCUMENTS_TABLE_ITEM_NEW__STOP:
            return null;
        default:
            return state;
    }
}

const documentsTableNewItemParentId = (state = null, action) => {
    switch (action.type) {
        case types.UI_DOCUMENTS_TABLE_ITEM_NEW__START:
            return action.parentNodeId;
        case types.UI_DOCUMENTS_TABLE_ITEM_NEW__STOP:
            return null;
        default:
            return state;
    }
}

const documentsTableNewItemSubmitting = (state = false, action) => {
    switch (action.type) {
        case types.UI_DOCUMENTS_TABLE_ITEM_NEW__START:
        case types.UI_DOCUMENTS_TABLE_ITEM_NEW__STOP:
            return false;
        case types.UI_DOCUMENTS_TABLE_ITEM_EDIT__SUBMITTING:
            return true;
        default:
            return state;
    }
}






// const ids = (state = [], action) => {
//     switch (action.type) {
//         case types.FETCH_WORKSPACE_NODES_SUCCESS:
//             return action.response.map(workspaceNode => workspaceNode.id)
//         case types.ADD_WORKSPACE_NODES_SUCCESS:
//             return [...state, action.response.id];
//         default:
//             return state;
//     }
// };

// const didInvalidate = (state = false, action) => {
//     switch (action.type) {
//         case types.INVALIDATE_WORKSPACE:
//             return true
//         case types.FETCH_WORKSPACE_NODES_REQUEST:
//             return false
//         case types.FETCH_WORKSPACE_NODES_SUCCESS:
//             return false
//         default:
//             return state;
//     }
// };

// const isFetching = (state = false, action) => {
//     switch (action.type) {
//         case types.FETCH_WORKSPACE_NODES_REQUEST:
//             return true
//         case types.FETCH_WORKSPACE_NODES_SUCCESS:
//         case types.FETCH_WORKSPACE_NODES_FAILURE:
//             return false
//         default:
//             return state;
//     }
// };

// const lastUpdated = (state = Date(), action) => {
//     switch (action.type) {
//         case types.FETCH_WORKSPACE_NODES_SUCCESS:
//             return action.receivedAt
//         default:
//             return state;
//     }
// };

// const errorMessage = (state = null, action) => {
//     switch (action.type) {
//         case types.FETCH_WORKSPACE_NODES_FAILURE:
//             return action.message
//         case types.FETCH_WORKSPACE_NODES_REQUEST:
//         case types.FETCH_WORKSPACE_NODES_SUCCESS:
//             return null;
//         default:
//             return state;
//     }
// };


const workspaceDocuments = combineReducers({
    documentsTableItemsExpanded,
    documentsTableItemsEditing,
    documentsTableItemsEditingLocked,
    documentsTableNewItemNodeType,
    documentsTableNewItemParentId,
    documentsTableNewItemSubmitting,
    documentsTableItemsDeleting,
    documentsTableItemMoving,
    documentsTableDraggingItem,
    documentsTableDraggingItemClickCallback,
    documentsTableDragOverPosition
});



export default workspaceDocuments;
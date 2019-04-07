// reducers.js
import { combineReducers } from 'redux'
import types from './types';
// import { workspacesTypes } from '../../dashboard/duck';
import { union, cloneDeep, merge, orderBy, forEach } from 'lodash';
import dateFuncs from '../../../utils/dateFuncs';

// A collection of all nodeIds with each containing an array of children nodes for the
// the respective node.
const childrenIdsByParentId = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_WORKSPACE_NODES_SUCCESS:
            var nextState = {}; // Want completly fresh state, no merging from old to new.

            action.response.forEach(node => {
                if(node.parent_id) {
                    if(!nextState.hasOwnProperty(node.parent_id)) {
                        nextState[node.parent_id] = [];
                    }
                    nextState[node.parent_id] = union(nextState[node.parent_id], [node.id]);
                }
            });

            return Object.assign({}, merge({}, nextState)) 

        // case types.MOVE_WORKSPACE_NODE__SUCCESS:
        //     var nextState = {...state };

        //     return Object.assign({}, state, merge({}, state, nextState)); 

        case types.ADD_WORKSPACE_NODE__SUCCESS:
            var nextState = {...state };
            nextState[action.response.parent_id] = union([action.response.id], state[action.response.parent_id]); 
            return Object.assign({}, state, merge({}, state, nextState)); 
        
        case types.DELETE_WORKSPACE_NODE__SUCCESS:
            var nextState = {...state };
            forEach(nextState, function(value, key) {
                const nodeToRemoveIndex = value.indexOf(action.response.id);
                
                // TODO: Thos way of removing a node will remove it from ANY parent. So
                // should I implement duplicate nodes then this would remove the duplicates
                // as well.
                if(nodeToRemoveIndex >= 0 && key !== action.response.parent_id) {
                    nextState[key].splice(nodeToRemoveIndex, 1);
                }
            })

            return Object.assign({}, state, merge({}, state, nextState)); 
        default:
            return state;
    }
}


// Note that the order of the children array is used to order nodeTableLists
const byId = (state = {}, action) => {
    switch (action.type) {
        case types.FETCH_WORKSPACE_NODES_SUCCESS:
            var nextState = {...state };
            action.response.forEach(workspaceNode => {
                nextState[workspaceNode.id] = workspaceNode;
            });

            action.response.forEach(node => {
                if(node.lastEdited) {
                    nextState[node.id].lastEditedAge = dateFuncs.convertDateToAge(new Date(node.lastEdited));
                }
                
                if(node.createdAt) {
                    nextState[node.id].createdAtAge = dateFuncs.convertDateToAge(new Date(node.createdAt));
                }
            });
            
            return Object.assign({}, state, merge({}, state, nextState)) 
        case types.ADD_WORKSPACE_NODE__SUCCESS:
            var nextState = {...state };
            // Add new node
            nextState[action.response.id] = action.response;
            
            if(action.response.lastEdited) {
                nextState[action.response.id].lastEditedAge = dateFuncs.convertDateToAge(new Date(action.response.lastEdited));
            }
            
            if(action.response.createdAt) {
                nextState[action.response.id].createdAtAge = dateFuncs.convertDateToAge(new Date(action.response.createdAt));
            }

            return Object.assign({}, state, merge({}, state, nextState)) 
            // return Object.assign({}, state, merge({}, state.byId, {[action.response.data.result.workspace.id]: action.response.data.result.workspace})) 
        case types.RENAME_WORKSPACE_NODE__SUCCESS:
            var nextState = {...state };
            
            // First have to create a new node obj for redux to listen to the ref change.
            const editedNode = merge({}, state[action.response.node_id], {title: action.response.title}); 

            // Second, apply  new node obj ref to our new byId obj ref;
            nextState[action.response.node_id] = editedNode;

            // Now mapStateToProps will cause rerender when listening to only a specific node
            return nextState;
        default:
            return state;
    }
}

// const allIdsORDERED TEST CRAPP = (state = [], action) => {
//     switch (action.type) {
//         case types.FETCH_WORKSPACE_NODES_SUCCESS:
//         // case workspacesTypes.FETCH_WORKSPACES_SUCCESS:
//             console.log('ACTION MAN!!!', action.response);
//             const orderedArray = orderBy(action.response, ['title'], ['asc']);
//             console.log('ACTION MAN!!!', orderedArray);
//             return union([...state], orderedArray.map(workspaceNode => workspaceNode.id));
//         case types.ADD_WORKSPACE_NODE__SUCCESS:
//             return [action.response.id, ...state];
//         default:
//             return state;
//     }
// };


const allIds = (state = [], action) => {
    switch (action.type) {
        case types.FETCH_WORKSPACE_NODES_SUCCESS:
        // case workspacesTypes.FETCH_WORKSPACES_SUCCESS:
            return union([...state], action.response.map(workspaceNode => workspaceNode.id));
        case types.ADD_WORKSPACE_NODE__SUCCESS:
            return [action.response.id, ...state];
        default:
            return state;
    }
};

const allWorkspaces = (state = [], action) => {
    switch (action.type) {
        case types.FETCH_WORKSPACE_NODES_SUCCESS:
        // case workspacesTypes.FETCH_WORKSPACES_SUCCESS:

            var newState = [];
            action.response.forEach(workspaceNode => {
                if(workspaceNode.type === 'workspace') {
                    newState.push(workspaceNode.id);
                }
            });

            return union([...state], newState);
        case types.ADD_WORKSPACE_NODE__SUCCESS:
            if(action.response.type === 'workspace')
                return [...state, action.response.id];
        default:
            return state
    }
}


// function nodeIdsByWorkspace(state = {}, action) {
//     switch (action.type) {
//         case types.INVALIDATE_WORKSPACE:
//         case types.FETCH_WORKSPACE_NODES_SUCCESS:
//         case types.FETCH_WORKSPACE_NODES_REQUEST:
//         case types.FETCH_WORKSPACE_NODES_FAILURE:
//             return Object.assign({}, state, {
//                 [action.workspaceId]: workspacesNodes(state[action.workspaceId], action)
//             })
//         default:
//             return state
//     }
// }


function findNodesChildren(parent, nodes) {


}


function unflatten(state, arr) {
    var tree = [],
    // var tree = cloneDeep(state),
        mappedArr = {},
        arrElem,
        mappedElem;

    // First map the nodes of the array to an object -> create a hash table.
    for (var i = 0, len = arr.length; i < len; i++) {
        arrElem = arr[i];
        mappedArr[arrElem.id] = arrElem;
        mappedArr[arrElem.id]['children'] = [];
    }


    for (var id in mappedArr) {
        if (mappedArr.hasOwnProperty(id)) {
            mappedElem = mappedArr[id];
            // If the element is not at the root level, add it to its parent array of children.
            console.log('mappedArr', mappedArr, mappedElem);
            if (mappedElem.parent_id && mappedArr[mappedElem['parent_id']]) {
                mappedArr[mappedElem['parent_id']]['children'].push(mappedElem);
            }
            // If the element is at the root level, add it to first level elements array.
            else {
                tree.push(mappedElem);
            }
        }
    }
    return tree;
}


// SHOULD THE API ALWAYS RETURN A NODE'S PARENT WORKSPACE REGARDLESS OF WHAT LEVEL OF THE
// TREE THE API IS LOOKING AT!!!??? WOULD SOLVE THIS ISSUE IF IT DID.
const idsByHierarchy = (state = [], action) => {
    switch (action.type) {
        case types.FETCH_WORKSPACE_NODES_SUCCESS:
        // case workspacesTypes.FETCH_WORKSPACES_SUCCESS:

            // var hashTable = 
            // var newState = {};

            // action.response.forEach(workspaceNode => {
            //     if(workspaceNode.type === 'workspace') {
            //         newState.push(workspaceNode.id);
            //     }
            // });

            return unflatten(state, action.response);

            return allWorkspaces(state, action);
            // return Object.assign({}, state, {
            //     [action.workspaceId]: workspacesNodes(state[action.workspaceId], action)
            // })


            // var newState = [];
            // action.response.forEach(workspaceNode => {
            //     if(workspaceNode.type === 'workspace') {
            //         newState.push(workspaceNode.id);
            //     }
            // });

            // return union([...state], newState);
        // case types.ADD_WORKSPACE_NODES_SUCCESS:
            // if(action.response.type === 'workspace')
            //     return [...state, action.response.id];
        default:
            return state
    }
}

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
    byId,
    allIds,
    childrenIdsByParentId,
    allWorkspaces,
    // idsByHierarchy,
    didInvalidate,
    isFetching,
    lastUpdated,
    errorMessage
});



// function nodeIdsByWorkspace(state = {}, action) {
//     switch (action.type) {
//         case types.INVALIDATE_WORKSPACE:
//         case types.FETCH_WORKSPACE_NODES_SUCCESS:
//         case types.FETCH_WORKSPACE_NODES_REQUEST:
//         case types.FETCH_WORKSPACE_NODES_FAILURE:
//             return Object.assign({}, state, {
//                 [action.workspaceId]: workspacesNodes(state[action.workspaceId], action)
//             })
//         default:
//             return state
//     }
// }

export default workspacesNodes;
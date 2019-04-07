import { cloneDeep, union, filter, find, orderBy } from 'lodash';

// selectors.js
const getIds = (state = []) => state.ids;
// const getChildren = (state = []) => state.children;
const getTitle = (state = '') => state.title;
const getContentId = (state = '') => state.content_id;
const getNodeType = (state = '') => state.type;



// const getNodesByWorkspace = (state, workspaceId) => {
//     const nodeIds = getIds(state.nodeIdsByWorkspace[workspaceId]);
//     // We can't assume nodeIdsByWorkspace[workspaceId] has been initialised.
//     return nodeIds ? nodeIds.map(id => state.entities.workspaceNodesById[id]) : [];
// }


// const getIsFetchingWorkspaceNodes = (state, workspaceId) => {
//     if(state.nodeIdsByWorkspace[workspaceId]) {
//         return state.nodeIdsByWorkspace[workspaceId].isFetching;    
//     }
//     return false;
// }

// const getErrorMessageWorkspaceNodes = (state, workspaceId) => {
//     if(state.nodeIdsByWorkspace[workspaceId]) {
//         return state.nodeIdsByWorkspace[workspaceId].errorMessage;    
//     }
//     return false;
// }



const getAllWorkspaces = (state, workspaceId) => {
    return state
}


const getNodesInWorkspaces = (state, workspaceId) => {
    return
}

const getWorkspaces = (state) => {
    console.log('Entities length', state.entities.workspaceNodes.allWorkspaces.length)
    const workspacesIds = state.entities.workspaceNodes.allWorkspaces;
    console.log('Workspaces length', workspaces)
    var workspaces = workspacesIds.map(id => state.entities.workspaceNodes.byId[id])
    
    return workspaces.map(node => {        
        var newNode = cloneDeep(node);
        newNode['children'] = getNodeChildren(state, node.id)
        return newNode;
    });
}

const getFirstNodeOfType = (state, type) => {
    console.log('1', state.entities.workspaceNodes.byId);
    console.log('LOOK HERE', find(state.entities.workspaceNodes.byId, ['type', type]));
    const nodesOfType = find(state.entities.workspaceNodes.byId, ['type', type]);
    return nodesOfType ? nodesOfType : {};
}

const getNodesOfType = (state, type) => {
    console.log('1', state.entities.workspaceNodes.byId);
    console.log('LOOK HERE', filter(state.entities.workspaceNodes.byId, ['type', type]));
    const nodesOfType = filter(state.entities.workspaceNodes.byId, ['type', type]);
    return nodesOfType ? nodesOfType : [];
}

// Returns immediant children of node.
const getNodeChildren = (state, nodeId) => {
    // Commenting out for old way of grabbing children from within node obj.
    // const childrenNodeIds = getChildren(state.entities.workspaceNodes.byId[nodeId]);
    const childrenNodeIds = getNodeChildrenById(state, nodeId);
    return childrenNodeIds ? childrenNodeIds.map(id => state.entities.workspaceNodes.byId[id]) : [];
}

// Returns immediant children of node.
const getNodeChildrenIds = (state, nodeId) => {
    // Commenting out for old way of grabbing children from within node obj.
    // const childrenNodeIds = getChildren(state.entities.workspaceNodes.byId[nodeId]);
    const childrenNodeIds = getNodeChildrenById(state, nodeId);
    return childrenNodeIds ? childrenNodeIds : [];
}

// Returns immediant children of node.
const getNodeChildrenIdsOrderedByOrder = (state, nodeId) => {
    const childrenNodeIds = getNodeChildrenById(state, nodeId);

    const childrenNodes = childrenNodeIds ? childrenNodeIds.map(id => state.entities.workspaceNodes.byId[id]) : [];
    const orderedChildrenNodes = orderBy(childrenNodes, ['order'], ['asc']);
    const orderedChildrenNodeIds = orderedChildrenNodes.map(childNode => childNode.id);

    return orderedChildrenNodeIds ? orderedChildrenNodeIds : [];
}

// Returns immediant children ordered by the childs title.
const getNodeChildrenIdsOrderedByTitle = (state, nodeId) => {
    // Commenting out for old way of grabbing children from within node obj.
    // const childrenNodeIds = getChildren(state.entities.workspaceNodes.byId[nodeId]);
    const childrenNodeIds = getNodeChildrenById(state, nodeId);

    const childrenNodes = childrenNodeIds ? childrenNodeIds.map(id => state.entities.workspaceNodes.byId[id]) : [];
    const orderedChildrenNodes = orderBy(childrenNodes, ['title'], ['asc']);
    
    const orderedChildrenNodeIds = orderedChildrenNodes.map(childNode => childNode.id);
    return orderedChildrenNodeIds ? orderedChildrenNodeIds : [];
}


// Returns all children of node regardless of depth.
const getNodeChildrenIdsDeep = (state, nodeId) => {
    // Commenting out for old way of grabbing children from within node obj.
    // var childrenNodeIds = getChildren(state.entities.workspaceNodes.byId[nodeId]);
    const childrenNodeIds = getNodeChildrenById(state, nodeId);
    var array = [];

    if(childrenNodeIds) {
        childrenNodeIds.forEach(childId => {
            array = union(getNodeChildrenIdsDeep(state, childId), array);
        });
        array = union(childrenNodeIds, array);
    }
    return array;
}

const getNodeChildrenIdsDeepOfType = (state, nodeId, type) => {
    // Commenting out for old way of grabbing children from within node obj.
    // var childrenNodeIds = getChildren(state.entities.workspaceNodes.byId[nodeId]);
    const childrenNodeIds = getNodeChildrenById(state, nodeId);
    var array = [];

    if(childrenNodeIds) {
        childrenNodeIds.forEach(childId => {
            
            array = union(getNodeChildrenIdsDeepOfType(state, childId, type), array);
            if(getNodeType(state.entities.workspaceNodes.byId[childId]) === 'document') {
                array.push(childId)
            }
        });
        // array = union(childrenNodeIds, array);
    }
    return array;
}


const getNodeChildrenDeep = (state, nodeId) => {
    const nodeIds = getNodeChildrenIdsDeep(state, nodeId);
    return nodeIds ? nodeIds.map(id => state.entities.workspaceNodes.byId[id]) : [];
}

const getNodeChildrenDeepOfType = (state, nodeId, type) => {
    const nodeIds = getNodeChildrenIdsDeepOfType(state, nodeId, type);
    return nodeIds ? nodeIds.map(id => state.entities.workspaceNodes.byId[id]) : [];
}


const getNodeParentIdsHighOfType = (state, nodeId, type) => {
    var currentNode = getNodeById(state, nodeId);
    var parentNodesOfTypeArray = [];
    var breaker = 0;
    while(currentNode && currentNode.parent_id || breaker > 100) {

        currentNode = getNodeById(state, currentNode.parent_id);

        if(currentNode && currentNode.type === 'workspace') {
            parentNodesOfTypeArray.push(currentNode.id);
        }
        breaker++;
    }
    
    return parentNodesOfTypeArray;
}


const getNodeById = (state, nodeId) => { return state.entities.workspaceNodes.byId[nodeId] }
const getNodeTitleById = (state, nodeId) => { return getTitle(state.entities.workspaceNodes.byId[nodeId]) }
const getNodeContentIdById = (state, nodeId) => { return getContentId(state.entities.workspaceNodes.byId[nodeId] )}
const getNodeChildrenById = (state, nodeId) => { return state.entities.workspaceNodes.childrenIdsByParentId[nodeId] }

const getIsFetchingNodes = (state) => state.entities.workspaceNodes.isFetching;
const getErrorMessageNodes = (state) => state.entities.workspaceNodes.errorMessage;


export default {
    getIds,

    getIsFetchingNodes,
    getErrorMessageNodes,

    getWorkspaces,
    getNodesInWorkspaces,

    getNodeById,
    getNodeTitleById,
    getNodeContentIdById,
    getFirstNodeOfType,
    getNodesOfType,
    getNodeChildren,
    getNodeChildrenIds,
    getNodeChildrenIdsOrderedByOrder,
    getNodeChildrenIdsOrderedByTitle,
    getNodeChildrenDeep,
    getNodeChildrenDeepOfType,

    getNodeParentIdsHighOfType
}



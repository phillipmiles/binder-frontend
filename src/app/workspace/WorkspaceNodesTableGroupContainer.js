import { connect } from 'react-redux'
import { workspaceNodesSelectors } from '../duck/workspaceNodes'
import { workspaceDocumentsSelectors } from './duck'
import { NodesTableGroup } from '../common'

import WorkspaceNodesTableNewItemContainer from './WorkspaceNodesTableNewItemContainer'
import WorkspaceNodesTableItemContainer from './WorkspaceNodesTableItemContainer';

const mapStateToProps = (state, { nodeId, depth }) => ({
    nodeId: nodeId,
    depth: depth,
    // childrenNodes: workspaceNodesSelectors.getNodeChildrenIds(state, nodeId),
    // childrenNodes: workspaceNodesSelectors.getNodeChildrenIdsOrderedByTitle(state, nodeId),
    childrenNodes: workspaceNodesSelectors.getNodeChildrenIdsOrderedByOrder(state, nodeId),
    isAddingNode: nodeId === workspaceDocumentsSelectors.getNewDocumentsTableItemParentId(state) ? true : false,

    NodeItemComponent: WorkspaceNodesTableItemContainer,
    NewNodeItemComponent: WorkspaceNodesTableNewItemContainer,
})

const WorkspaceNodesTableGroupContainer = connect(
    mapStateToProps,
)(NodesTableGroup);

export default WorkspaceNodesTableGroupContainer;

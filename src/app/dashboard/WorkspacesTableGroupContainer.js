import { connect } from 'react-redux'
import { workspaceNodesSelectors } from '../duck/workspaceNodes'
import { workspacesSelectors } from './duck'
import WorkspacesGroupComponent from './WorkspacesGroupComponent'

import WorkspacesTableNewItemContainer from './WorkspacesTableNewItemContainer'
import WorkspacesTableItemContainer from './WorkspacesTableItemContainer';

const mapStateToProps = (state, { nodeId }) => ({
    nodeId: nodeId,
    // childrenNodes: workspaceNodesSelectors.getNodeChildrenIds(state, nodeId),
    childrenNodes: workspaceNodesSelectors.getNodeChildrenIdsOrderedByTitle(state, nodeId),
    isAddingNode: workspacesSelectors.isWorkspacesTableAddingNewItem(state),

    NodeItemComponent: WorkspacesTableItemContainer,
    NewNodeItemComponent: WorkspacesTableNewItemContainer
})

const WorkspacesTableGroupContainer = connect(
    mapStateToProps,
)(WorkspacesGroupComponent);

export default WorkspacesTableGroupContainer;

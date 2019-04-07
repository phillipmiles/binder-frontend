import { connect } from 'react-redux'
import { workspaceNodesSelectors } from '../duck/workspaceNodes'
import { workspacesSelectors } from './duck'
import { NodesTableGroup } from '../common'

import BinTableItemContainer from './BinTableItemContainer';

const mapStateToProps = (state, { nodeId }) => ({
    nodeId: nodeId,
    childrenNodes: workspaceNodesSelectors.getNodeChildrenIdsOrderedByTitle(state, nodeId),

    NodeItemComponent: BinTableItemContainer,
})

const BinTableGroupContainer = connect(
    mapStateToProps,
)(NodesTableGroup);

export default BinTableGroupContainer;

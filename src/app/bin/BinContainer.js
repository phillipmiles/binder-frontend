import { connect } from 'react-redux'
import BinComponent from './BinComponent'
import { workspacesOperations } from './duck'
import { workspaceNodesSelectors } from '../duck/workspaceNodes'

const mapStateToProps = (state, { match }) => ({
    // binNodeId: workspaceNodesSelectors.getFirstNodeOfType(state, 'bin').id,
})

const BinContainer = connect(
    // mapStateToProps
)(BinComponent);

export default BinContainer;
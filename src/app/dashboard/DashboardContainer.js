import { connect } from 'react-redux'
import DashboardComponent from './DashboardComponent'
import { workspacesOperations } from './duck'
import { workspaceNodesSelectors } from '../duck/workspaceNodes'

const mapStateToProps = (state, { match }) => ({
    rootNodeId: workspaceNodesSelectors.getFirstNodeOfType(state, 'root').id,
})


const mapDispatchToProps = dispatch => {
    return {
        onAddNodeClick: (id, type) => {
            dispatch(workspacesOperations.startNamingNewWorkspacesTableItem(id, type))
        }
    }
}

const DashboardContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(DashboardComponent);

export default DashboardContainer;
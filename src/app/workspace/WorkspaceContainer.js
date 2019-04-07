import { connect } from 'react-redux'
import WorkspaceComponent from './WorkspaceComponent'
import { workspaceNodesSelectors } from '../duck/workspaceNodes'
import { workspaceDocumentsSelectors, workspaceDocumentsOperations } from './duck'
import { uiOperations } from '../duck/ui'
import { withRouter } from 'react-router'

const mapStateToProps = (state, { match }) => ({
    workspaceId: match.params.workspaceId,
    workspaceTitle: workspaceNodesSelectors.getNodeTitleById(state, match.params.workspaceId),
    numChildNodes: workspaceNodesSelectors.getNodeChildrenDeepOfType(state, match.params.workspaceId, 'document').length
})

const mapDispatchToProps = dispatch => {
    return {
        onAddNodeClick: (id, type) => {
            dispatch(workspaceDocumentsOperations.startNamingNewDocumentsTableItem(id, type))
        }
    }
}

const WorkspaceContainer = withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(WorkspaceComponent));


export default WorkspaceContainer;
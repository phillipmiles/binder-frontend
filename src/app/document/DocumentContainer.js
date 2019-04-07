import React, {Component} from 'react'
import { connect } from 'react-redux'
import DocumentComponent from './DocumentComponent'
import { workspaceNodesSelectors } from '../duck/workspaceNodes'
import { withRouter } from 'react-router'


class DocumentContainer extends Component {
    render = () => {
        return (
            <DocumentComponent
                {...this.props}
                parentNodeTitle={this.props.parentNode ? this.props.parentNode.title : ''}
                parentNodeId={this.props.parentNode ? this.props.parentNode.id : ''}
            />
        )
    }
}


const mapStateToProps = (state, { match }) => ({
    nodeId: match.params.documentId,
    documentTitle: workspaceNodesSelectors.getNodeTitleById(state, match.params.documentId),
    parentNode: workspaceNodesSelectors.getNodeById(state, workspaceNodesSelectors.getNodeParentIdsHighOfType(state, match.params.documentId)[0])
})

DocumentContainer = withRouter(connect(
    mapStateToProps
)(DocumentContainer));

export default DocumentContainer;
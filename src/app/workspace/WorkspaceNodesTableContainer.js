import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { workspaceDocumentsSelectors } from './duck'
import { workspaceNodesOperations, workspaceNodesSelectors } from '../duck/workspaceNodes'
import { userSelectors } from '../duck/user'
import { NodesTable } from '../common'
import FetchErrorComponent from '../common/FetchErrorComponent';
import WorkspaceNodesTableGroupContainer from './WorkspaceNodesTableGroupContainer'

class VisibleWorkspaceNodesTable extends Component {

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.props.fetchWorkspaceNodes(this.props.userId);
  }

  render () {
    const { isFetching, errorMessage, workspaceNodes } = this.props;

    if(isFetching && !workspaceNodes.length) {
      return <p>Loading...</p>
    }
    
    if(errorMessage && !workspaceNodes.length) {
      return (
        <FetchErrorComponent 
          message={errorMessage}
          onRetry={() => this.fetchData()}
        />
      )
    }
    
    return (
 
       <NodesTable 
          rootNodeId={this.props.nodeId}
          GroupContainer={WorkspaceNodesTableGroupContainer}
        />
    )
  }
}

const mapStateToProps = (state, { match }) => ({
  nodeId: match.params.workspaceId,
  userId: userSelectors.getUserId(state),
  workspaceNodes: workspaceNodesSelectors.getNodeChildrenIds(state, match.params.workspaceId),
  isFetching: workspaceNodesSelectors.getIsFetchingNodes(state),
  errorMessage: workspaceNodesSelectors.getErrorMessageNodes(state),
})


VisibleWorkspaceNodesTable = withRouter(connect(
  mapStateToProps,
  { 'fetchWorkspaceNodes': workspaceNodesOperations.fetchWorkspaceNodes }
)(VisibleWorkspaceNodesTable));

export default VisibleWorkspaceNodesTable;

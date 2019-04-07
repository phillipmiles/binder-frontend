import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { workspaceNodesOperations, workspaceNodesSelectors } from '../duck/workspaceNodes'
import { userSelectors } from '../duck/user'
// import { NodesTable, GroupContainer } from '../common'
import FetchErrorComponent from '../common/FetchErrorComponent';
import WorkspacesTableGroupContainer from './WorkspacesTableGroupContainer'

class WorkspacesTableContainer extends Component {

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.props.fetchWorkspaceNodes(this.props.userId);
  }

  render () {
    const { isFetching, errorMessage, workspaceNodes, node } = this.props;
    
    if(isFetching && !workspaceNodes.length || !node.id) {
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
      
      <WorkspacesTableGroupContainer 
        nodeId={node.id}
      />
    )
  }
}

const mapStateToProps = (state, { match }) => ({
  node: workspaceNodesSelectors.getFirstNodeOfType(state, 'root'),
  userId: userSelectors.getUserId(state),
  workspaceNodes: workspaceNodesSelectors.getWorkspaces(state),
  isFetching: workspaceNodesSelectors.getIsFetchingNodes(state),
  errorMessage: workspaceNodesSelectors.getErrorMessageNodes(state),
})


WorkspacesTableContainer = withRouter(connect(
  mapStateToProps,
  { 'fetchWorkspaceNodes': workspaceNodesOperations.fetchWorkspaceNodes }
)(WorkspacesTableContainer));

export default WorkspacesTableContainer;

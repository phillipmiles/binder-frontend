import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { workspaceNodesOperations, workspaceNodesSelectors } from '../duck/workspaceNodes'
import { userSelectors } from '../duck/user'
import { binOperations } from './duck'
import { NodesTable } from '../common'
import FetchErrorComponent from '../common/FetchErrorComponent';
import BinTableGroupContainer from './BinTableGroupContainer'

class BinTableContainer extends Component {

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    this.props.fetchBinnedNodes(this.props.userId);
  }

  render () {
    const { isFetching, errorMessage, workspaceNodes, node } = this.props;
    if(isFetching && !workspaceNodes.length || !node) {
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
        rootNodeId={node.id}
        GroupContainer={BinTableGroupContainer}
      />
    )
  }
}

const mapStateToProps = (state, { match }) => ({
  node: workspaceNodesSelectors.getFirstNodeOfType(state, 'bin'),
  userId: userSelectors.getUserId(state),
  workspaceNodes: workspaceNodesSelectors.getWorkspaces(state),
  isFetching: workspaceNodesSelectors.getIsFetchingNodes(state),
  errorMessage: workspaceNodesSelectors.getErrorMessageNodes(state),
})


BinTableContainer = withRouter(connect(
  mapStateToProps,
  { 'fetchBinnedNodes': binOperations.fetchBinnedNodes }
)(BinTableContainer));

export default BinTableContainer;

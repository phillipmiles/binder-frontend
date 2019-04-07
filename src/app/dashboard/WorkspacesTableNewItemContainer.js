import { connect } from 'react-redux'
import React, { Component } from 'react'
import { workspacesOperations, workspacesSelectors } from './duck';
// import { NodesTableCreateItem } from '../common'
import WorkspaceCardCreateComponent from './WorkspaceCardCreateComponent'

class WorkspacesTableNewItemContainer extends Component {
    constructor(props) {
        super(props);
        this.submitNewItem = this.submitNewItem.bind(this);
        this.cancelNewItem = this.cancelNewItem.bind(this);
    };
    
    submitNewItem(event, value) {
        console.log(value.length)
        if(value.length > 0) {
            this.props.submitNewNode(this.props.parentNodeId, this.props.nodeType, value);
        } else {
            // TODO: Display error message if new value is empty
            this.cancelNewItem();
        }
    }

    cancelNewItem(event) {
        this.props.stopAddingNode();
    }

    render = () => (
        <WorkspaceCardCreateComponent 
            {...this.props}
            placeholder={'New ' + this.props.nodeType + ' name'}
            submitNewItem={this.submitNewItem} 
            cancelNewItem={this.cancelNewItem}
        />
    )
 
}

const mapStateToProps = state => ({
    nodeType: 'workspace',
    isSubmitting: workspacesSelectors.isNewWorkspacesTableItemSubmitting(state)  
})
        
WorkspacesTableNewItemContainer = connect(
    mapStateToProps,
    { 
        'stopAddingNode': workspacesOperations.stopNamingNewWorkspacesTableItem,
        'submitNewNode': workspacesOperations.submitNewWorkspacesTableItem
    }
)(WorkspacesTableNewItemContainer)

export default WorkspacesTableNewItemContainer;




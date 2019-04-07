import { connect } from 'react-redux'
import React, { Component } from 'react'
import { workspaceNodesSelectors } from '../duck/workspaceNodes'
import { workspacesSelectors } from './duck'
import { workspacesOperations } from './duck'
import InputTextForm from '../common/InputTextForm'

class WorkspacesTableItemEditContainer extends Component {
    constructor(props) {
        super(props);
        this.submitEditName = this.submitEditName.bind(this);
        this.cancelEditName = this.cancelEditName.bind(this);

    };

    submitEditName(event, value) {
    
        // Check new title is different
        if(value !== this.props.value) {
          this.props.editNodeContentTitle(this.props.node.id, value);
        }
    
        // TODO: Display error message if new value is empty
    }
    
    cancelEditName(event) {
        if(this.props.isEditing) {
          this.props.stopRenamingNode(this.props.node.id);
        }
    }


    render() {
        return (
            <InputTextForm
                id='inputNodeRename' 
                value={this.props.node.title} 
                placeholder='Set a new title'
                onSubmit={this.submitEditName}
                handleClickAway={this.submitEditName} 
                handleEscKey={this.cancelEditName} 
                disabled={this.props.isSubmitting}
            />
        );
    }
}



const mapStateToProps = (state, { nodeId }) => ({
    node: workspaceNodesSelectors.getNodeById(state, nodeId),  
    isEditing: workspacesSelectors.isWorkspacesTableItemEditing(state, nodeId),
    isSubmitting: workspacesSelectors.isWorkspacesTableItemSubmitting(state, nodeId)
})
        
WorkspacesTableItemEditContainer = connect(
    mapStateToProps,
    {
        'stopRenamingNode': workspacesOperations.stopRenamingWorkspacesTableItem,
        'editNodeContentTitle': workspacesOperations.editWorkspacesTableItemTitle
    }

)(WorkspacesTableItemEditContainer)

export default WorkspacesTableItemEditContainer;




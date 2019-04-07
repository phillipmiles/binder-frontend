import { connect } from 'react-redux'
import React, { Component } from 'react'
import { workspaceNodesSelectors } from '../duck/workspaceNodes'
import { workspaceDocumentsSelectors } from './duck'
import { workspaceDocumentsOperations } from './duck'
import InputTextForm from '../common/InputTextForm'
import styled from 'styled-components'


const NodeEdit_InputTextForm = styled(InputTextForm)`
    padding: 8px 12px;
    margin-left: -12px;
    box-shadow: 0 1px 4px -2px rgba(0,0,0,0.1);
`

class WorkspaceNodesTableItemEditContainer extends Component {
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
            <NodeEdit_InputTextForm
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
    isEditing: workspaceDocumentsSelectors.isDocumentsTableItemEditing(state, nodeId),
    isSubmitting: workspaceDocumentsSelectors.isDocumentsTableItemSubmitting(state, nodeId)
})
        
WorkspaceNodesTableItemEditContainer = connect(
    mapStateToProps,
    {
        'stopRenamingNode': workspaceDocumentsOperations.stopRenamingDocumentsTableItem,
        'editNodeContentTitle': workspaceDocumentsOperations.editDocumentsTableItemTitle
    }

)(WorkspaceNodesTableItemEditContainer)

export default WorkspaceNodesTableItemEditContainer;




import { connect } from 'react-redux'
import React, { Component } from 'react'
import { workspaceDocumentsOperations, workspaceDocumentsSelectors } from './duck';
import { NodesTableCreateItem } from '../common'

class WorkspaceNodesTableNewItemContainer extends Component {
    constructor(props) {
        super(props);
        this.submitNewItem = this.submitNewItem.bind(this);
        this.cancelNewItem = this.cancelNewItem.bind(this);
    };
    
    submitNewItem(event, value) {
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

    tableItemIcon() {
        const { nodeType } = this.props;

        switch (nodeType) {
            case 'subspace':
                return 'folder'
                break;
            case 'document':
                return 'file'
                break;
            default:
                return null;
                break;
        }
    }
    
    iconFill() {
        const { nodeType } = this.props;
        if (nodeType === 'subspace') {
            return true;
        }

        return false;
    }

    render = () => (
        <NodesTableCreateItem 
            {...this.props}
            placeholder={'New ' + this.props.nodeType + ' name'}
            submitNewItem={this.submitNewItem} 
            cancelNewItem={this.cancelNewItem}
            tableItemIcon={this.tableItemIcon()}
            iconFill={this.iconFill()}
        />
    )
 
}

const mapStateToProps = state => ({
    nodeType: workspaceDocumentsSelectors.getNewDocumentsTableItemNodeType(state),
    isSubmitting: workspaceDocumentsSelectors.isNewDocumentsTableItemSubmitting(state)  
})
        
WorkspaceNodesTableNewItemContainer = connect(
    mapStateToProps,
    { 
        'stopAddingNode': workspaceDocumentsOperations.stopNamingNewDocumentsTableItem,
        'submitNewNode': workspaceDocumentsOperations.submitNewDocumentsTableItem
    }
)(WorkspaceNodesTableNewItemContainer)

export default WorkspaceNodesTableNewItemContainer;




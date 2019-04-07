import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { workspaceNodesSelectors } from '../duck/workspaceNodes'
import { uiOperations } from '../duck/ui'
import { workspacesSelectors } from './duck'
import { workspacesOperations } from './duck'
import dateFuncs from '../../utils/dateFuncs';

import WorkspaceCardComponent from './WorkspaceCardComponent'
import WorkspacesTableGroupContainer from './WorkspacesTableGroupContainer'
import WorkspacesTableItemEditContainer from './WorkspacesTableItemEditContainer'

class WorkspaceNodesTableItemContainer extends Component {
    constructor(props) {
        super(props);
        this.onClickItem = this.onClickItem.bind(this);
        this.openSettings = this.openSettings.bind(this);
    };

    getOpenUrl() {
        const { node } = this.props;

        switch (node.type) {
            case 'workspace':
                return '/workspace/' + node.id;
                break;
            case 'document':
                return '/document/' + node.id;
                break;
            default:
                return null;
                break;
        }
    }

    onClickItem(event) {
        const { history, node, isEditing } = this.props;

        // Prevent <a> links from opening before checking that isEditing is false.
        event.preventDefault();

        // Pevent actioning when the user is clicking away from a renaming text field.
        if (!isEditing) {
            switch (node.type) {
                case 'workspace':
                    history.push(this.getOpenUrl());
                    break;
                case 'subspace':
                    this.toggleShowSubItems();
                    break;
                case 'document':
                    history.push(this.getOpenUrl());
                    break;
                default:
                    return null;
                    break;
            }
        }
    }

    tableItemIcon() {
        const { node } = this.props;

        switch (node.type) {
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

    openSettings(event) {
        if (this.props.isEditing || this.props.isSubmitting) {
            return
        }
        event.preventDefault();
        event.stopPropagation();

        const eventX = event.clientX + 'px';
        const eventY = event.clientY + 'px';
        const { node } = this.props;

        var options = [{
            text: 'Rename',
            function: () => {
                this.props.startRenamingNode(this.props.nodeId);
            }
        },
        {
            text: 'Move to bin',
            function: () => {
                this.props.deleteWorkspace(this.props.nodeId);
            }
        }];

        if (node.type === 'subspace') {
            options.unshift({
                text: 'Add document',
                function: () => {
                    if (!this.props.isExpanded) {
                        this.props.expandNode(this.props.nodeId);
                    }
                    this.props.onAddNodeClick(this.props.nodeId, 'document');
                }
            },
                {
                    text: 'Add subspace',
                    function: () => {
                        if (!this.props.isExpanded) {
                            this.props.expandNode(this.props.nodeId);
                        }
                        this.props.onAddNodeClick(this.props.nodeId, 'subspace');
                    }
                });
        }

        this.props.openDropDownMenu(eventX, eventY, options);
    }

    getChildrenLastEdited() {
        const { childrenNodesDeep } = this.props;

        var mostRecent;

        childrenNodesDeep.forEach(child => {
            if (child.lastEditedAge) {
                if (!mostRecent) {
                    mostRecent = child.lastEditedAge;
                } else if (child.lastEditedAge < mostRecent) {
                    mostRecent = child.lastEditedAge;
                }
            }
        });

        if(!mostRecent) {
            if(this.props.node.lastEditedAge) {
                mostRecent = this.props.node.lastEditedAge;
            } else if(this.props.node.createdAtAge) {
                mostRecent = this.props.node.createdAtAge;
            }
        }

        if (this.props.node.lastEditedAge && (this.props.node.lastEditedAge < mostRecent)) {
            mostRecent = this.props.node.lastEditedAge;
        }

        return dateFuncs.convertAgeToSentence(mostRecent);
    }

    isAddingNode() {
        if (this.props.newNode === this.props.nodeId) {
            return true;
        }
        return false;
    }

    iconFill() {
        const { node } = this.props;
        if (node.type === 'subspace') {
            return true;
        }

        return false;
    }

    render = () => (
        <WorkspaceCardComponent
            {...this.props}
            onClickItem={this.onClickItem}
            onClickItemContext={this.openSettings}
            onClickMore={this.openSettings}
            showChildrenNodes={this.props.isExpanded}
            isEditing={this.props.isEditing}
            isAddingNode={this.isAddingNode()}
            tableItemIcon={this.tableItemIcon()}
            iconFill={this.iconFill()}
            nodeLastEdited={this.getChildrenLastEdited()}
            EditNodeItemComponent={WorkspacesTableItemEditContainer}
            NodeItemGroupComponent={WorkspacesTableGroupContainer}
            to={this.getOpenUrl()}
        />
    )
}

const mapStateToProps = (state, { nodeId }) => ({
    node: workspaceNodesSelectors.getNodeById(state, nodeId),
    isExpanded: false,
    isEditing: workspacesSelectors.isWorkspacesTableItemEditing(state, nodeId),
    isSubmitting: workspacesSelectors.isWorkspacesTableItemSubmitting(state, nodeId),
    childrenNodesDeep: workspaceNodesSelectors.getNodeChildrenDeep(state, nodeId),
    newNode: ''
})

WorkspaceNodesTableItemContainer = withRouter(connect(
    mapStateToProps,
    {
        'expandNode': workspacesOperations.expandDocumentsTableItem,
        'collapseNode': workspacesOperations.collapseDocumentsTableItem,
        'openDropDownMenu': uiOperations.openDropDownMenu,
        'onAddNodeClick': workspacesOperations.startNamingNewWorkspacesTableItem,
        'startRenamingNode': workspacesOperations.startRenamingWorkspacesTableItem,
        'deleteWorkspace': workspacesOperations.deleteWorkspacesTableItem
    }
)(WorkspaceNodesTableItemContainer));

export default WorkspaceNodesTableItemContainer;

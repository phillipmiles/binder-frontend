import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { workspaceNodesSelectors } from '../duck/workspaceNodes'
import { uiOperations } from '../duck/ui'
import { workspaceDocumentsSelectors } from './duck'
import { workspaceDocumentsOperations } from './duck'

import { NestedDragItem } from '../common'
import WorkspaceNodesTableGroupContainer from './WorkspaceNodesTableGroupContainer'
import WorkspaceNodesTableItemEditContainer from './WorkspaceNodesTableItemEditContainer'
import dateFuncs from '../../utils/dateFuncs';

import IconSVG from '../common/IconSVG'
import { 
    TableItem, 
    TableItemContent, 
    TableItemHeading,
    TableItemLastEdited,
    TableItemMore,
    TableItemIcon,
    TableItemDragHoverIndicator,
    TableItemDebugBox
} from '../common/styles/NodesTable'


// TODO: MOVE THIS BISNITCH
const DragHoverIndicator = function({dragHoverPos}) {
    if(dragHoverPos === 'below') {
        return (
            <TableItemDragHoverIndicator setBottom/>
        )
    } else if(dragHoverPos === 'above') {
        return (
            <TableItemDragHoverIndicator setTop/>
        )
    } else {
        return null;
    }
}


class WorkspaceNodesTableItemContainer extends Component {
    constructor(props) {
        super(props);
        
        this.onClickItem = this.onClickItem.bind(this);
        this.onMouseDown = this.onMouseDown.bind(this);
        this.openSettings = this.openSettings.bind(this);
        this.onBeginDrag = this.onBeginDrag.bind(this);
        this.onEndDrag = this.onEndDrag.bind(this);
        this.onHover = this.onHover.bind(this);
        this.onDrop = this.onDrop.bind(this);
    };

    toggleShowSubItems() {     
        if(this.props.isExpanded) { 
            this.props.collapseNode(this.props.nodeId);
        } else {
            this.props.expandNode(this.props.nodeId);
        }
    }

    getElemDistanceFromPageTop( elem ) {
        var location = 0;
        if (elem.offsetParent) {
            do {
                location += elem.offsetTop;
                elem = elem.offsetParent;
            } while (elem);
        }
        return location >= 0 ? location : 0;
    }

    onMouseDown(e) {
        this.props.uiDragElem(
            { // initialClickPos
                x: e.pageX,
                y: e.pageY
            }, {  // childPosOffset
                x: e.currentTarget.getBoundingClientRect().x - e.pageX,
                y: e.currentTarget.getBoundingClientRect().y - e.pageY
            });
        this.props.dragTableItem(this.props.nodeId, this.onClickItem);
    }

    onClickItem(props) {
        const { history, node } = this.props;

        // Prevent actioning when the user is clicking away from a renaming text field.
        if (!this.props.isEditing) {
            switch (node.type) {
                case 'workspace':
                    history.push("/workspace/" + node.id)
                    break;
                case 'subspace':
                    this.toggleShowSubItems();
                    break;
                case 'document':
                    history.push("/document/" + node.id)
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

    getContentLastEdited() {
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

        if (this.props.node.lastEditedAge && (this.props.node.lastEditedAge < mostRecent || !mostRecent)) {
            mostRecent = this.props.node.lastEditedAge;
        }

        return dateFuncs.convertAgeToSentence(mostRecent);
    }

    lastEditedPhrase() {
        const { node } = this.props;

        if (!node.lastEditedAge) {
            return false;
        } else if (node.lastEditedAge < 1000) {
            return 'just now';
        } else {
            return dateFuncs.convertAgeToSentence(node.lastEditedAge) + ' ago';
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
                this.props.deleteNode(this.props.nodeId);
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

    isDragging() {
        if (this.props.dragNodeId == this.props.node.id) {
            return true;
        }
        return false;
    }

    isDragHoverOver() {
        if (this.props.nodeDragOverPosition.nodeId == this.props.nodeId) {
            return this.props.nodeDragOverPosition.state;
        }

        return false;
    }

    onBeginDrag() {
        return {
            nodeId: this.props.node.id
        }
    }

    onHover(props, monitor, component, hoverState) {
            
        const previousPos = this.props.nodeDragOverPosition;
        
        if(previousPos.nodeId !== this.props.nodeId 
            || previousPos.state !== hoverState) {
                this.props.setNodeDragHoverOn(this.props.nodeId, hoverState);
        }
    }

    // Is react-dnd endDrag method for dragSource. Using monitor.getDropResult() will
    // return data from the drop target that has been returned from onDragDrop.
    onEndDrag(props, monitor, component) {
    
        const dropResult = monitor.getDropResult();

        this.props.setNodeDragHoverOff();  
    }

    // An event fired from the drop target hovered over when dragged item was released.
    // Returning an object from here will provid the dragged item's endDrag method with
    // details from the dropTarget.
    onDrop(props, monitor, component, dropState) {

        const { nodeId } = monitor.getItem();

        
        const targetNodeId = this.props.node.id,
            targetNodeIndex = this.props.index,
            targetParentNodeId = this.props.parentNodeId,
            targetIsNest = this.canHaveChildren(),
            targetIsExpanded = this.props.isExpanded

        // Check drag was dropped over a drop target.
        if(monitor.getItem()) {

            var newIndex,
                newParentNodeId;

            if (dropState === 'over') {
                console.log('ACTION #1');
                newParentNodeId = targetNodeId;
                newIndex = 0;
            } else if (dropState === 'below' && targetIsNest && targetIsExpanded) {
                console.log('ACTION #2');
                newParentNodeId = targetNodeId;
                newIndex = 0;
            } else {
                console.log('ACTION #3', dropState, targetNodeIndex);
                newParentNodeId = targetParentNodeId;
                newIndex = (dropState === 'above') ? targetNodeIndex : targetNodeIndex + 1;
            }

            this.props.moveNode(nodeId, newParentNodeId, newIndex)
        }
    }

    canHaveChildren() {
        const { node } = this.props;
        
        switch(node.type) {
            case 'subspace': 
                return true;
            case 'workspace': 
                return true;
            default:
                return false;
        }
    }

    render() {
        const {...props} = this.props;
        return ( 
            <NestedDragItem
                isNestedListVisible={this.props.isExpanded}
                isDragging={this.isDragging()}
                isAddingNode={this.isAddingNode()}
                dragHoverPos={this.isDragHoverOver()}

                onBeginDrag={this.onBeginDrag}
                onEndDrag={this.onEndDrag}
                onHover={this.onHover}
                onDrop={this.onDrop}

                NestedListContainer={
                    <WorkspaceNodesTableGroupContainer 
                        depth={props.depth}
                        nodeId={props.node.id}
                    />
                }
                isNest={this.canHaveChildren()}
            >
                <TableItemContent
                    isEditing={this.props.isEditing} 
                    onClick={this.onClickItem} 
                    onContextMenu={this.openSettings}
                    isDragging={this.isDragging()}
                    dragHoverPos={this.isDragHoverOver()}
                >   
                    <TableItemIcon iconFill={this.iconFill()}>
                        <IconSVG icon={this.tableItemIcon()}/>
                    </TableItemIcon>
                    
                    <TableItemHeading>
                        {this.props.isEditing ? (
                            <WorkspaceNodesTableItemEditContainer 
                                nodeId={this.props.node.id}
                            />
                        ) : (
                            <React.Fragment>{this.props.node.title}</React.Fragment>
                        )}
                    </TableItemHeading>
                                 
                    {this.lastEditedPhrase() && 
                        <TableItemLastEdited>
                            Last edited {this.lastEditedPhrase()}
                        </TableItemLastEdited>
                    }
                                   
                    <TableItemMore onClick={this.openSettings}>
                        <IconSVG icon='more-horizontal'/>
                    </TableItemMore>
                    

                    {this.isDragHoverOver() &&
                        <DragHoverIndicator dragHoverPos={this.isDragHoverOver()}/>
                    }

                    {/* {debug &&
                        <TableItemDebugBox>
                            <p><strong>Node id:</strong> {this.props.node.id}</p>
                            <p><strong>Order:</strong> {this.props.node.order}</p>
                            <p><strong>Index:</strong> {this.props.index}</p>
                        </TableItemDebugBox>
                    } */}
                </TableItemContent>
            </NestedDragItem>
        )
    }
}


const mapStateToProps = (state, { nodeId, depth }) => ({
    node: workspaceNodesSelectors.getNodeById(state, nodeId),  
    depth: depth,
    // childrenNodesDeep: workspaceNodesSelectors.getNodeChildrenDeepOfType(state, nodeId),
    isExpanded: workspaceDocumentsSelectors.isDocumentsTableItemExpanded(state, nodeId),
    isEditing: workspaceDocumentsSelectors.isDocumentsTableItemEditing(state, nodeId),
    isSubmitting: workspaceDocumentsSelectors.isDocumentsTableItemSubmitting(state, nodeId),
    isDeleting: workspaceDocumentsSelectors.isDocumentsTableItemDeleting(state, nodeId),
    nodeDragOverPosition: workspaceDocumentsSelectors.getDocumentsTableDragOverPosition(state),

    //?
    dragNodeId: workspaceDocumentsSelectors.getDraggedTableItemId(state),
    //?

    newNode: workspaceDocumentsSelectors.getNewDocumentsTableItemParentId(state),
})

WorkspaceNodesTableItemContainer = withRouter(connect(
    mapStateToProps,
    { 
        'expandNode': workspaceDocumentsOperations.expandDocumentsTableItem,
        'collapseNode': workspaceDocumentsOperations.collapseDocumentsTableItem,
        'openDropDownMenu': uiOperations.openDropDownMenu,
        'onAddNodeClick': workspaceDocumentsOperations.startNamingNewDocumentsTableItem,
        'startRenamingNode': workspaceDocumentsOperations.startRenamingDocumentsTableItem,
        'deleteNode': workspaceDocumentsOperations.deleteDocumentsTableItem,
        'setNodeDragHoverOn': workspaceDocumentsOperations.setNodeDragHoverOn,
        'setNodeDragHoverOff': workspaceDocumentsOperations.setNodeDragHoverOff,
        'moveNode': workspaceDocumentsOperations.moveDocumentsTableItem,
        //?
        'uiDragElem': uiOperations.startDraggingElem,
        'dragTableItem': workspaceDocumentsOperations.dragDocumentsTableItem
        //?
        

    }
)(WorkspaceNodesTableItemContainer));

export default WorkspaceNodesTableItemContainer;

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
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
} from './styles/NodesTable'
import { findDOMNode } from 'react-dom'


// ============



export const ItemTypes = {
    NODE: 'node'
};


function collect(connect, monitor) {
    console.log('collect source');
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }
}


// ============


const DragHoverIndicator = function({dragHoverPos}) {
    // console.log('what am i ', dragHoverPos)
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

const TableItemContentWrap = function(props) {
    const {   node, 
        nodeLastEdited,
        onClickItem, 
        onMouseDown,
        onClickItemContext,
        onClickMore, 
        showChildrenNodes, 
        isEditing, 
        isDragging,
        isAddingNode, 
        tableItemIcon, 
        iconFill,
        draggable,
        dragHoverPos,
    
        NodeItemGroupComponent,
        EditNodeItemComponent,
        tableItemContentRef,
        debug,
        index
    } = props;
    return (
        <TableItemContent ref={tableItemContentRef} dragHoverPos={dragHoverPos} isDragging={isDragging}  isEditing={isEditing} onClick={onClickItem} onContextMenu={onClickItemContext}>
            {tableItemIcon &&
                <TableItemIcon iconFill={iconFill}>
                    <IconSVG icon={tableItemIcon}/>
                </TableItemIcon>
            }
            <TableItemHeading>
                {isEditing ? (
                    <EditNodeItemComponent 
                        nodeId={node.id}
                    />
                ) : (
                    <React.Fragment>{node.title}</React.Fragment>
                )}
            </TableItemHeading>
            
            {nodeLastEdited &&
                <TableItemLastEdited>
                    Last edited {nodeLastEdited}
                </TableItemLastEdited>
            }
            {onClickMore &&
                <TableItemMore onClick={onClickMore}>
                    <IconSVG icon='more-horizontal'/>
                </TableItemMore>
            }

            {dragHoverPos &&
                <DragHoverIndicator dragHoverPos={dragHoverPos}/>
            }

            {debug &&
                <TableItemDebugBox>
                    <p><strong>Node id:</strong> {node.id}</p>
                    <p><strong>Order:</strong> {node.order}</p>
                    <p><strong>Index:</strong> {index}</p>
                </TableItemDebugBox>
            }
    
        </TableItemContent>
    )
}



const NodesTableItem = (props) => { 
    const { 
        node, 
        nodeLastEdited,
        onClickItem, 
        onMouseDown,
        onClickItemContext,
        onClickMore, 
        showChildrenNodes, 
        isEditing, 
        isDragging,
        isAddingNode, 
        tableItemIcon, 
        iconFill,
        draggable,
        dragHoverPos,
    
        NodeItemGroupComponent,
        EditNodeItemComponent,
        connectDragSource,
        connectDropTarget,
        depth,
        debug
    } = props;

    return (
        connectDropTarget(
            <li>
                <TableItem>
                    {draggable ? (
                        <React.Fragment>
                            {connectDragSource(
                                <div>
                                    <TableItemContent ref={tableItemContentRef} dragHoverPos={dragHoverPos} isDragging={isDragging}  isEditing={isEditing} onClick={onClickItem} onContextMenu={onClickItemContext}>
                                        {children}

                                        {dragHoverPos &&
                                            <DragHoverIndicator dragHoverPos={dragHoverPos}/>
                                        }                                
                                    </TableItemContent>
                                </div>
                            )}
                        </React.Fragment>
                    ):( 
                        <TableItemContent ref={tableItemContentRef} dragHoverPos={dragHoverPos} isDragging={isDragging}  isEditing={isEditing} onClick={onClickItem} onContextMenu={onClickItemContext}>
                            {children}

                            {dragHoverPos &&
                                <DragHoverIndicator dragHoverPos={dragHoverPos}/>
                            }                                
                        </TableItemContent>
                    )}

                    {showChildrenNodes && 
                        <NodeItemGroupComponent
                            depth={depth}
                            nodeId={node.id}
                        />
                    }
                </TableItem >
            </li>
        )
    )
}

// NodesTableItem = DropTarget(ItemTypes.NODE, nodeTarget, collect2)(NodesTableItem)

NodesTableItem.propTypes = {
    node: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired
    }),
    
    onClickItem: PropTypes.func,
    onClickItemContext: PropTypes.func,
    onClickMore: PropTypes.func,
    tableItemIcon: PropTypes.string,
    iconFill: PropTypes.bool,
    EditNodeItemComponent: PropTypes.func,
    NodeItemGroupComponent: PropTypes.func,
    showChildrenNodes: PropTypes.bool,
    isEditing: PropTypes.bool
}

export default NodesTableItem;

// export default DragSource(ItemTypes.NODE, nodeSource, collect)(NodesTableItem);
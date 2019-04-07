import React from 'react'
import PropTypes from 'prop-types'
import DragDropTarget from './DragDropTarget';
import DraggableItem from './DraggableItem';

class NestedDragItem extends React.Component {
    constructor(props) {
        super(props);
        this.tableItemContentRef = React.createRef();
        
        this.onHover = this.onHover.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.onBeginDrag = this.onBeginDrag.bind(this);
        this.onEndDrag = this.onEndDrag.bind(this);
    }

    getHoverState(targetRef, mousePos = {'x': null, 'y': null}, targetCanHoverOn) {
        let state;
    
        const hoverBoundingRect = targetRef.getBoundingClientRect();
    
        // Get vertical middle
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    
        // Get pixels to the top
        const hoverClientY = mousePos.y - hoverBoundingRect.top
        
        
    
        // Only perform the move when the mouse has crossed half of the items height
        // When dragging downwards, only move when the cursor is below 50%
        // When dragging upwards, only move when the cursor is above 50%
    
        // Dragging downwards
        // if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        // 	return
        // }
    
        // console.log('YOPE COMPONENT', component);
    
        // console.log(props, component, component.props.node.type, hoverClientY, hoverMiddleY, hoverBoundingRect.top)
        if(targetCanHoverOn 
            && hoverClientY > (hoverMiddleY - 8) 
            &&  hoverClientY < (hoverMiddleY + 8)) {
            return 'over'; 
        } else if(hoverClientY < hoverMiddleY) {
            return 'above';
        } else if(hoverClientY > hoverMiddleY) {
            return 'below';
        }
    }

    onHover(props, monitor, component) {
        // TODO: Reduce the frequency that this is called when mouse moves.


        // Determine rectangle on screen
        const itemHeadEl = this.tableItemContentRef.current;
        const mousePos = monitor.getClientOffset();

        const targetGetHoverOn = this.props.isNest ? true : false;
        
        const state = this.getHoverState(itemHeadEl, mousePos, targetGetHoverOn);
       
        this.props.onHover(props, monitor, component, state);
    }

    onDrop(props, monitor, component) {
    
        // Prevent propagation of dropTargets.
        if(monitor.didDrop()) {
            return undefined;
        }

        const itemHeadEl = this.tableItemContentRef.current;
        const mousePos = monitor.getClientOffset();   

        const targetGetHoverOn = this.props.isNest === true ? true : false;

        const state = this.getHoverState(itemHeadEl, mousePos, targetGetHoverOn);
        
        return this.props.onDrop(props, monitor, component, state)
    }

    onBeginDrag(props, monitor, component) {
        return this.props.onBeginDrag(props, monitor, component);
    }

    onEndDrag(props, monitor, component) {
        this.props.onEndDrag(props, monitor, component);
    }


    render() {
        const {...props} = this.props;
        const isDraggable = props.isDraggable === undefined ? true : props.isDraggable;
        const isNestedListVisible = props.isNestedListVisible === undefined ? true : props.isNestedListVisible;

        return (
            <DragDropTarget 
                onHover={this.onHover}
                onDrop={this.onDrop}
            >
                {isDraggable ? (
                    <DraggableItem
                        onEndDrag={this.onEndDrag}
                        onBeginDrag={this.onBeginDrag}
                    >
                        <div ref={this.tableItemContentRef}>   
                            {props.children}
                        </div>
                    </DraggableItem>
                ):( 
                    props.children
                )}

                {isNestedListVisible && 
                    props.NestedListContainer
                }
            </DragDropTarget>
        )
    }
}

NestedDragItem.propTypes = {
    NestedListContainer: PropTypes.object,
    isNestedListVisible: PropTypes.bool,
    onBeginDrag: PropTypes.func,
    onEndDrag: PropTypes.func,
    onHover: PropTypes.func,
    onDrop: PropTypes.func
}

export default NestedDragItem;
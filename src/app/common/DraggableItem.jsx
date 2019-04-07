import React from 'react';
import { DragSource } from 'react-dnd';

export const ItemTypes = {
    NODE: 'node'
};

function collect(connect, monitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    }
}

const nodeSource = {
    beginDrag(props, monitor, component) {
        return props.onBeginDrag(props, monitor, component);
    },

    endDrag(props, monitor, component) {
        props.onEndDrag(props, monitor, component);
	}
};


class DraggableItem extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const { props } = this;
        
        return (
            props.connectDragSource(
                // react-dnd will add its own ref to this div.
                <div>
                    {props.children}
                </div>
            )
        )       
    }
}

export default DragSource(ItemTypes.NODE, nodeSource, collect)(DraggableItem);
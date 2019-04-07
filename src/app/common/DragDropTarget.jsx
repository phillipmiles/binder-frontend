import React from 'react';

import { DropTarget } from 'react-dnd';

export const ItemTypes = {
    NODE: 'node'
};

function collect(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop()
    }
}

const dropTarget = {
    hover(props, monitor, component) {
        // TODO:: Debounce this shit. It's making the drag indicator a bit laggy.
        
        // Make sure we have access to the drop target componet;
        if (!component) {
			return null
        }

        // Only care about the top level nested drop target.
        if(!monitor.isOver({ shallow: true })) {
            return null
        }

        component.props.onHover(props, monitor, component);
    },

    drop(props, monitor, component) {
        // Prevent further dropTargets further down the tree running drop code.
        if(monitor.didDrop()) {
            return undefined;
        }

        return component.props.onDrop(props, monitor, component);
    }
};


class DragDropTarget extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        const { props } = this;
        return (
            props.connectDropTarget(
                <div>
                    {props.children}
                </div>
            )
        )       
    }
}

export default DropTarget(ItemTypes.NODE, dropTarget, collect)(DragDropTarget);
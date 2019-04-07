import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { TableGroup, TableGroupEmpty } from './styles/NodesTable'

const NodesTableGroup = ({
    NewNodeItemComponent, 
    NodeItemComponent, 
    nodeId, 
    childrenNodes, 
    isAddingNode,
    depth
}) => {
    depth = depth >= 0 ? depth + 1 : 0;
    return (
        <TableGroup depth={depth}>     
            {isAddingNode &&
                <NewNodeItemComponent parentNodeId={nodeId}/>
            }
            {childrenNodes.length > 0 &&
                <React.Fragment>
                    {childrenNodes.map((childrenNodeId, index) =>
                        <NodeItemComponent
                            key={childrenNodeId}
                            index={index}
                            nodeId={childrenNodeId}
                            parentNodeId={nodeId}
                            depth={depth}
                        />
                    )}
                </React.Fragment>
            }

            {(childrenNodes.length == 0 && !isAddingNode) &&
                <TableGroupEmpty depth={depth}>
                    <div>[ This folder is empty ]</div>
                </TableGroupEmpty>
            }
        </TableGroup>
    )
}

NodesTableGroup.propTypes = {
    nodeId: PropTypes.string.isRequired,
    depth: PropTypes.number,
    childrenNodes: PropTypes.arrayOf(PropTypes.string),
    isAddingNode: PropTypes.bool,
    NewNodeItemComponent: PropTypes.func,
    NodeItemComponent: PropTypes.func
}


export default NodesTableGroup
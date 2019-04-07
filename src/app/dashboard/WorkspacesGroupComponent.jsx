import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { TableGroup, TableGroupEmpty } from '../common/styles/NodesTable'


export const WorkspacesGroup = styled.div`
    /* display: flex;
    flex-wrap: wrap;
    width: 100%; */
    border: none;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 32px 32px;

    @media (max-width: 960px) {
        grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 720px) {
        grid-template-columns: repeat(1, 1fr);
    }
`

const NodesTableGroup = ({
    NewNodeItemComponent, 
    NodeItemComponent, 
    nodeId, 
    childrenNodes, 
    isAddingNode
}) => (
    <WorkspacesGroup>     
        {isAddingNode &&
            <NewNodeItemComponent parentNodeId={nodeId}/>
        }
        {childrenNodes.length > 0 ? (
            <React.Fragment>
                {childrenNodes.map((childrenNodeId, index) =>
                    <NodeItemComponent
                        key={childrenNodeId}
                        index={index}
                        nodeId={childrenNodeId}
                        parentNodeId={nodeId}
                    />
                )}
            </React.Fragment>
        ) : (
            <TableGroupEmpty>[ This folder is empty ]</TableGroupEmpty>
        )}
    </WorkspacesGroup>
)

NodesTableGroup.propTypes = {
    nodeId: PropTypes.string.isRequired,

    childrenNodes: PropTypes.arrayOf(PropTypes.string),
    isAddingNode: PropTypes.bool,
    NewNodeItemComponent: PropTypes.func,
    NodeItemComponent: PropTypes.func
}


export default NodesTableGroup
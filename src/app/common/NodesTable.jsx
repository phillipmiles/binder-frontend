import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { StyledNodesTable } from './styles/NodesTable'

const NodesTable = ({ rootNodeId, GroupContainer }) => (
    <StyledNodesTable>
        {rootNodeId &&
            <GroupContainer nodeId={rootNodeId}/>
        }
    </StyledNodesTable>
)

NodesTable.propTypes = {
    rootNodeId: PropTypes.string,
}

export default NodesTable
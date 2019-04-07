import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { InputTextForm } from './'
import IconSVG from '../common/IconSVG'

import {  
    TableItemContent, 
    TableItemHeading,
    TableItemIcon
} from './styles/NodesTable'




const NodeEdit_InputTextForm = styled(InputTextForm)`
    padding: 8px 12px;
    margin-left: -12px;
    box-shadow: 0 1px 4px -2px rgba(0,0,0,0.1);
`

const NodesTableCreateItem = ({ 
    placeholder, 
    submitNewItem, 
    cancelNewItem, 
    isSubmitting,
    tableItemIcon,
    iconFill
}) => (
    <div>
        <TableItemContent isEditing={true}>
            {tableItemIcon &&
                <TableItemIcon iconFill={iconFill}>
                    <IconSVG icon={tableItemIcon}/>
                </TableItemIcon>
            }
            <TableItemHeading>
                <NodeEdit_InputTextForm 
                id='nodeTableAddItem' 
                    placeholder={placeholder} 
                    value=''
                    onSubmit={submitNewItem} 
                    handleClickAway={submitNewItem} 
                    handleEscKey={cancelNewItem} 
                    disabled={isSubmitting}
                />
            </TableItemHeading>
        </TableItemContent>
    </div>
)

NodesTableCreateItem.propTypes = {
    submitNewItem: PropTypes.func.isRequired,
    cancelNewItem: PropTypes.func.isRequired
}

export default NodesTableCreateItem  
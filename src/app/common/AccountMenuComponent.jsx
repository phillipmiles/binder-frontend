import React from 'react'
import PropTypes from 'prop-types'
import IconSVG from '../common/IconSVG'
import styled from 'styled-components'
import { DropDownBox, DropDownItem } from './styles/Dropdown'

const StyledAccountMenu = styled.div`
    position: relative;
`

const AccountMenuHeader = styled.div`
    
    padding: 0px 16px;
    cursor: pointer;

    svg {
        /* width: 20px; */
        stroke-width: 1.5px;
    }

    &:hover {
        color: ${props => props.theme.color_primary};
    }
`

const AccountMenuItem = styled.div`
    cursor: pointer;
    &:hover {
        color: ${props => props.theme.color_primary};
    }
`
const Label = styled.span`
    margin-left: 16px;
`

const AccountMenuOptions = styled(DropDownBox)`
    position: absolute;
    background-color: #FFF;
    width: 200px;
    text-align: left;
    top: 56px;
    
    right: 0;

    &:after {
        content: '';
        height: 16px;
        width: 16px;
        border-left: 2px solid ${props => props.theme.color_primary};
        border-top: 2px solid ${props => props.theme.color_primary};
        position: absolute;
        top: -10.5px;
        right : 24px;
        background-color: #FFF;
        transform: rotate(45deg);
    }
`

const AccountMenuComponent = ({ user, onClickAccount, isExpanded, onClickAccountSettings, onClickTrash, logOff}) => (
    <StyledAccountMenu>
        <AccountMenuHeader onClick={onClickAccount}>
            <IconSVG icon='user'/>
            <Label data-cy={'user-firstname'}>{ user.firstName }</Label>
        </AccountMenuHeader>
        {isExpanded && 
            <AccountMenuOptions>
                <DropDownItem onClick={onClickAccountSettings}>
                    Account settings
                </DropDownItem>
                <DropDownItem onClick={onClickTrash}>
                    Bin
                </DropDownItem>
                <DropDownItem onClick={logOff}>
                    Log off
                </DropDownItem>
            </AccountMenuOptions>
        }
    </StyledAccountMenu>
)

AccountMenuComponent.propTypes = {
    user: PropTypes.object.isRequired,
}

export default AccountMenuComponent
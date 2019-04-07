import React from 'react'
import styled from 'styled-components'
import IconSVG from './IconSVG.jsx'

import { DropDownBox, DropDownItem } from './styles/Dropdown'

const StyledDropDownMenu = styled(DropDownBox)`
    position: absolute;
    left: ${props => props.x || '0'};
    top: ${props => props.y || '0'};
    z-index: 9999;

    &:after {
        content: '';
        height: 16px;
        width: 16px;
        border-left: 2px solid ${props => props.theme.color_primary};
        border-top: 2px solid ${props => props.theme.color_primary};
        position: absolute;
        top: -10.5px;
        left: 12px;
        background-color: #FFF;
        transform: rotate(45deg);
    }
`

const DropDownShield = styled.div`
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background-color: rgba(0,0,0,0.0);
`

function DropDownMenu({posX, posY, options, closeDropDownMenu}) {
    
    return (
        <React.Fragment>
            <StyledDropDownMenu x={posX} y={posY}>
                {options.map((option, index) =>
                    <DropDownItem
                        key={index} 
                        onClick={() => { 
                            closeDropDownMenu();
                            option.function();
                        }}>{option.text}
                    </DropDownItem>
                )}
                {/* {icon &&
                    <IconSVG icon={icon}/>
                }
                <Text>{text}</Text> */}
            </StyledDropDownMenu>
            <DropDownShield/>
        </React.Fragment>
    );
}

export default DropDownMenu;
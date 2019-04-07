import React from 'react'
import styled from 'styled-components'
import IconSVG from './IconSVG.jsx'

const Button = styled.button`
    padding: 0px 24px;
    /* border-radius: 4px; */
    font-size: 16px;
    font-weight: ${props => props.theme.font_semibold};
    /* line-height: 48px; */
    /* border: 2px solid ${props => props.theme.color_primary}; */
    /* color: ${props => props.theme.color_primary}; */
    display: inline-block;
    cursor: pointer;

    


    /* border-radius: ${props => props.square ? '4px' : '56px'}; */
    border-radius: 4px;
    background-color: ${props => props.theme.color_primary};
    position: relative;
    color: #FFF;
    line-height: 48px;
    /* background: linear-gradient(165deg, #f32672, ${props => props.theme.color_primary}); */
    border: none;

    transition: box-shadow 300ms;

    &:hover {
        background: linear-gradient(165deg, #d6135b,#bd044b);
        /* box-shadow: 0 2px 4px -2px #bd044b; */
        color: #ffb4d0;
    }

`


const Text = styled.span`
    display: inline-block;
    padding-left: ${props => (props.withIcon ? '12px' : '0')};
`

function preventOutline(event) {
    event.preventDefault();
}

function ButtonComponent({ text, onClick, icon }) {
    return (
        <Button onClick={onClick} onMouseDown={preventOutline}>
            {icon &&
                <IconSVG icon={icon}/>
            }
            <Text withIcon={icon}>{text}</Text>
        </Button>
    );
}

export default ButtonComponent;
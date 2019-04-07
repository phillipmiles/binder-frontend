import styled from 'styled-components'

export const DropDownBox = styled.div`
    box-shadow: 0 2px 16px -4px rgba(38, 130, 219, 0.5);
    border: 2px solid ${props => props.theme.color_primary};
    border-radius: 4px;
    background-color: #FFF;
    line-height: normal;
    color: ${props => props.theme.color_black};
`

export const DropDownItem = styled.div`
    padding: 8px 16px;
    cursor: pointer;
    position: relative;
    z-index: 1;
    line-height: auto;

    &:hover {
        background-color: ${props => props.theme.color_primary};
        color: #FFF;
    }

`
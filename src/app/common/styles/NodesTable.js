import styled from 'styled-components'

export const StyledNodesTable = styled.div`
    padding-bottom: 64px;
    border-top: 1px solid ${props => props.theme.color_grey_10};
`;

export const TableGroupEmpty = styled.div`
    color: ${props => props.theme.color_grey};
    height: 64px;
    display: flex;
    border-bottom: 1px solid ${props => props.theme.color_grey_10};


    > div {
        /* margin-left: 56px; */
        padding: 20px ${props => props.theme.content_panel_padding};
        padding-left: ${props => (52 + (52 * props.depth))}px;
        /* align-items: center; */
    }
`

export const TableItemContent = styled.div`
    cursor: pointer;
    position: relative;
    height: 64px;
    font-size: 18px;
    padding: 20px ${props => props.theme.content_panel_padding};
    background-color: ${props => props.isDragging || props.isEditing || props.dragHoverPos === 'over' ? props.theme.color_lightgrey : 'transparent'};
    border-bottom: 1px solid ${props => props.theme.color_grey_10};

    display: flex;
    align-items: center;
    /* justify-content: space-between; */


    > div {
        display: flex;
    }

    &:hover {
        background-color: ${props => props.isDragging || props.isEditing ? props.theme.color_lightgrey : props.theme.color_grey_0};
    }
`

export const TableItemHeading = styled.div`
    -webkit-touch-callout: none; 
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;

    margin-left: 30px;

    width: 65%;
    flex-grow: 2;

    /* position: absolute; */
    /* top: 50%; */
    /* transform: translateY(-50%); */

    
    ${TableItemContent}:hover & {
        color: ${props => props.theme.color_primary};
    }
`

export const TableItemExtras = styled.div`
    color: ${props => props.theme.color_grey};
    font-size: 14px;
    /* flex-grow: 1; */
    /* position: absolute; */
    /* top: 50%; */
    /* transform: translateY(-50%); */
    /* right: ${props => props.theme.content_panel_padding}; */
`

export const TableItemLastEdited = styled.span`
    color: ${props => props.theme.color_grey};
    font-size: 14px;
    padding: 0 24px;
    min-width: 220px;
`


export const TableItemMore = styled.div`
    /* position: absolute; */
    /* right: 0;
    top: 50%;
    transform: translateY(-50%); */
    opacity: 0;
    color: ${props => props.theme.color_grey};
    border: 1px solid transparent;
    /* border-radius: 34px; */
    width: 34px;
    height: 34px;
    text-align: center;

    
    &:hover {
        color: ${props => props.theme.color_primary};
        /* border-color: ${props => props.theme.color_grey_20};  */
    }

    ${TableItemContent}:hover & {
        opacity: 1;
    }
`

// TODO: Replace icons with that other open source type font icons face.

export const TableItemIcon = styled.div`
    /* position: absolute; */
    /* left: -52px; */
    /* top: 50%; */
    /* transform: translateY(-50%); */
    color: ${props => props.theme.color_grey};

    svg {
        width: 20px;
        fill: ${props => props.iconFill ? props.theme.color_grey : "transparent"};
    }

    ${TableItemContent}:hover & {
        svg {
            color: ${props => props.theme.color_primary};
            fill: ${props => props.iconFill ? props => props.theme.color_primary : "transparent"};
        }
    }
`

export const TableItemDragHoverIndicator = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    height: 2px;
    background-color: ${props => props.theme.color_primary};

    top: ${props => props.setTop ? '-1px' : 'auto'};
    bottom: ${props => props.setBottom ? '-1px' : 'auto'};
`

export const TableGroup = styled.div`
    padding: 0;

    ${TableItemContent} {
        padding-left: ${props => (52 + (52 * props.depth))}px;
    }

    /* > div:first-child ${TableItemContent} {
        border-top: 1px solid green;
        background: red;
    }
    
    ${TableGroup} {
        > div:first-child ${TableItemContent} {
            border-top: none;
            background: transparent;
        }
    } */
    

    /* Gives top border to very first item in table. */
    /* li:first-child {
        border-top: 1px solid ${props => props.theme.color_grey_10};
    }
    ul {
        li:first-child {
            border-top: none;
            background: transparent;
        }
    } */
`

export const TableItemDebugBox = styled.div`
    font-size: 10px;
`
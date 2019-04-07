// import React from 'react'
// import PropTypes from 'prop-types'
import styled, { keyframes }from 'styled-components'
// import IconSVG from '../common/IconSVG'
// import { 
//     TableItemIcon,
//     TableItemDragHoverIndicator
// } from '../common/styles/NodesTable'
// import { findDOMNode } from 'react-dom'
import { Link } from 'react-router-dom'


import React from 'react'
import PropTypes from 'prop-types'
import { InputTextAreaForm } from '../common'
import IconSVG from '../common/IconSVG'

import {  
    TableItemContent, 
    TableItemHeading,
    TableItemIcon
} from '../common/styles/NodesTable'


export const WorkspaceCardWrap = styled.div`

    /* padding: 16px 24px; */

    /* width: 33%; */
    display: flex; /* Causes all flex item's height to be the same. */

    /* 3 wide - Left */
    /* &:nth-child(3n - 2) {
        padding-left: 0;
    } */
    
    /* 3 wide - Middle */
    /* &:nth-child(3n - 1) { 
        padding-left: 8px;
        padding-right: 8px;
    } */

    /* 3 wide - Right */
    /* &:nth-child(3n) {
        padding-right: 0;
    } */
`


const fadeIn = keyframes`
    0% {
        opacity: 0;
        transform: scale(0.75, 0.5);
        /* transition: opacity 241ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 161ms cubic-bezier(0.4, 0, 0.2, 1) 80ms; */
    }
    100% {
        opacity: 1;
        transform: scale(1, 1) translateZ(0px);
        /* transition: opacity 241ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 161ms cubic-bezier(0.4, 0, 0.2, 1) 0ms; */
    }
`;


export const WorkspaceCard = styled.div`
    background-color: #FFF;
    position: relative;
    width: 100%;
    padding: 24px 24px;
    border-radius: 8px;
    box-shadow: 0 4px 8px -4px rgba(0,0,0,0.15);
    min-height: 240px;
    padding: 40px 30px;
    text-align: center;
    cursor: pointer;

    /* Center cards vertically. */
    display: flex;
    align-items: center;
    justify-content: center;

    
    /* opacity: 0; */
    transition: all 300ms;

    &:hover {
        box-shadow: 0 8px 24px -4px rgba(0,0,0,0.10);
        transform: scale(1.02);
        transition: all 100ms;
    }

    /* animation: 2s ${fadeIn} linear; */
    animation: 250ms ${fadeIn} ease-out;
    animation-fill-mode: backwards;
    animation-delay: ${props => props.animationDelay}ms;
/*    
    animation: 1s ease-out 0s 1 slideInFromLeft; */
`



export const WorkspaceCardInner = styled.div`
    /* align-items: center; */
`

export const WorkspaceCardHeading = styled.div`
    font-size: 24px;
    font-weight: 600;
    margin: 8px 0;
    /* margin-right: 36px; */
    color: #2f2f2f;
`

export const WorkspaceCardDetails = styled.div`
    
    p {
        color: #888;
        font-size: 15px;
        margin-bottom: 24px;
    }
`

export const WorkspaceCardMore = styled.div`
    position: absolute;
    right: 24px;
    /* top: 32px; */
    top: 24px;
    /* transform: translateY(-50%); */
    opacity: 0;
    color: ${props => props.theme.color_grey};
    border: 1px solid transparent;
    /* border-radius: 34px; */
    width: 34px;
    height: 34px;
    text-align: center;
    cursor: pointer;

    &:hover {
        color: ${props => props.theme.color_primary};
        /* border-color: ${props => props.theme.color_grey_20};  */
    }

    ${WorkspaceCard}:hover & {
        opacity: 1;
    }
`

export const Button = styled.a`
    padding: 10px 28px;
    /* background-color: #006c8c; */
    /* background-color: #2682DB; */
    border: 1.4px solid #2682DB;
    color: #2682DB;
    background-color: #FFF;
    background: #FFF;
    
    border-radius: 4px;
    /* border: none; */
    /* color: #FFF; */
    font-size: 16px;
    font-weight: 600;
    
    /* position: absolute;
    bottom: 24px;
    right: 24px; */
    /* outline: none; */
    cursor: pointer;

    &:hover {
        background-color: #2682DB;
        color: #FFF;
    }
`


const StyledLink = styled(Link)`
    text-decoration: none;
       padding: 10px 28px;
    /* background-color: #006c8c; */
    /* background-color: #2682DB; */
    border: 1.4px solid #2682DB;
    color: #2682DB;
    background-color: #FFF;
    background: #FFF;
    
    border-radius: 4px;
    /* border: none; */
    /* color: #FFF; */
    font-size: 16px;
    font-weight: 600;
    
    /* position: absolute;
    bottom: 24px;
    right: 24px; */
    /* outline: none; */
    cursor: pointer;

    &:hover {
        background-color: #2682DB;
        color: #FFF;
    }
`;


// const WorkspaceCardComponent = (props) => { 
//     const { 
//         node, 
//         index,
//         nodeLastEdited,
//         onClickItem, 
//         onMouseDown,
//         onClickItemContext,
//         onClickMore, 
//         showChildrenNodes, 
//         isEditing, 
//         isAddingNode, 
//         tableItemIcon, 
//         iconFill,
    
//         NodeItemGroupComponent,
//         EditNodeItemComponent,
//         to,
//     } = props;

//     return (
//         <WorkspaceCardWrap>
//             <WorkspaceCard onClick={onClickItem} onContextMenu={onClickItemContext} animationDelay={(index * 100)}>
//                 <WorkspaceCardInner>
//                     <WorkspaceCardHeading>
//                         {isEditing ? (
//                             <EditNodeItemComponent 
//                                 nodeId={node.id}
//                             />
//                         ) : (
//                             <React.Fragment>{node.title}</React.Fragment>
//                         )}
//                     </WorkspaceCardHeading>
//                     <WorkspaceCardDetails>
//                         {nodeLastEdited &&
//                             <p>
//                                 Last edited {nodeLastEdited}
//                             </p>
//                         }
                    
//                         {tableItemIcon &&
//                             <TableItemIcon iconFill={iconFill}>
//                                 <IconSVG icon={tableItemIcon}/>
//                             </TableItemIcon>
//                         }
//                     </WorkspaceCardDetails>
//                     {onClickMore &&
//                         <WorkspaceCardMore onClick={onClickMore}>
//                             <IconSVG icon='more-vertical'/>
//                         </WorkspaceCardMore>
//                     }
//                     <StyledLink to={to} onClick={onClickItem}>Open</StyledLink>
//                 </WorkspaceCardInner>
//             </WorkspaceCard>
//         </WorkspaceCardWrap >
//     )
// }

// WorkspaceCardComponent.propTypes = {
//     node: PropTypes.shape({
//         id: PropTypes.string.isRequired,
//         title: PropTypes.string.isRequired
//     }),
    
//     onClickItem: PropTypes.func,
//     onClickItemContext: PropTypes.func,
//     onClickMore: PropTypes.func,
//     tableItemIcon: PropTypes.string,
//     iconFill: PropTypes.bool,
//     EditNodeItemComponent: PropTypes.func,
//     NodeItemGroupComponent: PropTypes.func,
//     isEditing: PropTypes.bool
// }


// export default WorkspaceCardComponent;








const NodeEdit_InputTextAreamForm = styled(InputTextAreaForm)`
    padding: 8px 12px;
    margin-left: -12px;
    box-shadow: 0 1px 4px -2px rgba(0,0,0,0.1);
`

const WorkspaceCardCreateComponent = ({ 
    placeholder, 
    submitNewItem, 
    cancelNewItem, 
    isSubmitting,
    tableItemIcon,
    iconFill
}) => (
    <WorkspaceCardWrap>
        {/* <WorkspaceCard animationDelay={(index * 100)}> */}
        <WorkspaceCard>
            <WorkspaceCardInner>
                <WorkspaceCardHeading>
                    <NodeEdit_InputTextAreamForm 
                    id='nodeTableAddItem' 
                        placeholder={placeholder} 
                        value=''
                        onSubmit={submitNewItem} 
                        handleClickAway={submitNewItem} 
                        handleEscKey={cancelNewItem} 
                        disabled={isSubmitting}
                    />
{/*                     
                    {isEditing ? (
                        <EditNodeItemComponent 
                            nodeId={node.id}
                        />
                    ) : (
                        <React.Fragment>{node.title}</React.Fragment>
                    )} */}
                </WorkspaceCardHeading>
                {/* <WorkspaceCardDetails>
                    {nodeLastEdited &&
                        <p>
                            Last edited {nodeLastEdited}
                        </p>
                    }
                
                    {tableItemIcon &&
                        <TableItemIcon iconFill={iconFill}>
                            <IconSVG icon={tableItemIcon}/>
                        </TableItemIcon>
                    }
                </WorkspaceCardDetails>
                {onClickMore &&
                    <WorkspaceCardMore onClick={onClickMore}>
                        <IconSVG icon='more-vertical'/>
                    </WorkspaceCardMore>
                }
                <StyledLink to={to} onClick={onClickItem}>Open</StyledLink> */}
            </WorkspaceCardInner>
        </WorkspaceCard>
    </WorkspaceCardWrap >


    // <div>
    //     <TableItemContent isEditing={true}>
    //         {tableItemIcon &&
    //             <TableItemIcon iconFill={iconFill}>
    //                 <IconSVG icon={tableItemIcon}/>
    //             </TableItemIcon>
    //         }
    //         <TableItemHeading>
    //             <NodeEdit_InputTextForm 
    //             id='nodeTableAddItem' 
    //                 placeholder={placeholder} 
    //                 value=''
    //                 onSubmit={submitNewItem} 
    //                 handleClickAway={submitNewItem} 
    //                 handleEscKey={cancelNewItem} 
    //                 disabled={isSubmitting}
    //             />
    //         </TableItemHeading>
    //     </TableItemContent>
    // </div>
)

WorkspaceCardCreateComponent.propTypes = {
    submitNewItem: PropTypes.func.isRequired,
    cancelNewItem: PropTypes.func.isRequired
}

export default WorkspaceCardCreateComponent;
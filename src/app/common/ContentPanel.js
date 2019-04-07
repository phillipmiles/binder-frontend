import React from 'react';
import styled, {keyframes, css} from "styled-components";



const slideIn = keyframes`
    0% {
        /* opacity: 0.8; */
        transform: translateY(16px);
        /* transition: opacity 241ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 161ms cubic-bezier(0.4, 0, 0.2, 1) 80ms; */
    }
    100% {
        opacity: 1;
        transform: translateY(0px);
        /* transition: opacity 241ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 161ms cubic-bezier(0.4, 0, 0.2, 1) 0ms; */
    }
`;


const fadeIn = keyframes`
    0% {
        opacity: 0;
        /* transform: translateY(205px); */
        /* transition: opacity 241ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 161ms cubic-bezier(0.4, 0, 0.2, 1) 80ms; */
    }
    100% {
        opacity: 1;
        /* transform: translateY(0px); */
        /* transition: opacity 241ms cubic-bezier(0.4, 0, 0.2, 1) 0ms, transform 161ms cubic-bezier(0.4, 0, 0.2, 1) 0ms; */
    }
`;

const animateSlideInMixin = css`
    animation: 400ms ${slideIn} ease-out;
    animation-fill-mode: backwards;
`

const animateFadeInMixin = css`
    animation: 600ms ${fadeIn} ease;
    animation-fill-mode: backwards;
`

const ContentPanelInner = styled.div`

`

const ContentPanel = styled.div`
    background: white;
    border-radius: 8px;
    /* box-shadow: 0 2px 12px -4px rgba(0,0,0,0.3); */
    
    box-shadow: 0 1px 4px -4px rgba(0,0,0,0.3), 0 16px 80px 0 rgba(0,0,0,0.05);
    position: relative;

    ${props => props.animateIn ? animateSlideInMixin : 'animation: none;'};

    /* animation-delay: ${props => props.animationDelay}ms; */
    /* ${props => props.animateIn} */

    ${ContentPanelInner} {
        ${props => props.animateIn ? animateFadeInMixin : 'animation: none;'};
    }
`



const ContentPanelHeader = styled.div`
    position: relative;
    padding: ${props => props.paddingHeader ? props.paddingHeader : props.theme.content_panel_padding};
`

const ContentPanelBody = styled.div`
    position: relative;
    padding: ${props => props.paddingBody ? props.paddingBody : props.theme.content_panel_padding};
`


function ContentPanelComponent({ children, header, paddingHeader, paddingBody, animateIn }) {
    return (
        <ContentPanel animateIn={animateIn}>
            <ContentPanelInner>
                {header &&                
                    <ContentPanelHeader paddingHeader={paddingHeader}>
                        {header}                
                    </ContentPanelHeader>
                }

                <ContentPanelBody paddingBody={paddingBody}>
                    {children}
                </ContentPanelBody>
            </ContentPanelInner>
        </ContentPanel>
    );
}





export default ContentPanelComponent;
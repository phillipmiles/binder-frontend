import React from 'react';
import styled from "styled-components";

const ContentCenter = styled.div`
    margin: 0 4%;
    /* margin: auto; */
    display: flex;
    padding-top: 64px; /* Navbar height */
    height: 100vh;
`

const ContentCenterInner = styled.div` 
    max-width: ${props => (props.narrow ? '512px' : '1024px')};
    margin: auto auto;
    padding: 32px 0 64px;
    width: 100%;
`


const ContentCenterComponent = (props) => (
    <ContentCenter>
        <ContentCenterInner narrow={props.narrow}>
            {props.children}
        </ContentCenterInner>
    </ContentCenter>
);
export default ContentCenterComponent;
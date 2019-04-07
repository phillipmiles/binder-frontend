import React from 'react';
import styled from 'styled-components';

const StyledBlockToolBar = styled.div`

    position: absolute;
    height: 48px;
    width: 48px;
    margin-top: -24px;
    border: 1px solid #BBB;
    border-radius: 500px;
    z-index: 400;
    top: ${props => props.top}px;
    left: ${props => props.left}px;
    opacity: ${props => props.opacity};
`


const DocumentBlockToolbarComponent = ({ 
    top, 
    left,
    opacity,
    onActivateHandler,
    codeBlockHandler,
    isActive
}) => (
    <StyledBlockToolBar id='toolbar2' top={top} left={left} opacity={opacity}>
        {/* <button onClick={this.boldHandler}/> */}
        <button onClick={onActivateHandler}>+</button>

        {isActive &&
            <div>
                <button onClick={codeBlockHandler}>Code</button>
                {/* // <button class="ql-bold"></button> */}
                {/* <button class="ql-italic"></button> */}
            </div>
        }
    </StyledBlockToolBar>
);

export default DocumentBlockToolbarComponent;
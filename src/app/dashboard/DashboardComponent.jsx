import React from 'react'
import { GlobalOverrideStyles, H1, NavBar, Content, ContentPanel, PageHeader, Button, ButtonGroupInline } from './../common';
import CreateWorkspace from './CreateWorkspace';
import WorkspacesTableContainer from './WorkspacesTableContainer';
import styled from 'styled-components'


// const H1 = styled.h1`
//     console.log('woopy');
//     /* font-size: ${props => props.theme.font_size_heading1} */
//     font-size: 12px;
// `





// A new component based on Button, but with some override styles
const H1Inline = styled(H1)`
    display: inline-block;
    vertical-align: middle;
    margin-right: 24px;
`;



function DashboardComponent({ onAddNodeClick, rootNodeId }) {
    return (
        <div>
            <GlobalOverrideStyles backgroundColour={props => props.theme.color_background}/>
            <NavBar></NavBar>
            <Content>
                <PageHeader>
                    {/* <H1Inline asH2>Workspaces</H1Inline> */}
                    <H1Inline>Workspaces</H1Inline>
                    <ButtonGroupInline>
                        <Button 
                            text='New workspace' 
                            onClick={() => onAddNodeClick(rootNodeId, 'workspace')}>
                        </Button>
                    </ButtonGroupInline>
                </PageHeader>
                {/* <ContentPanel> */}
                    <WorkspacesTableContainer></WorkspacesTableContainer>
                {/* </ContentPanel> */}
            </Content>
        </div>
    );
}



export default DashboardComponent;

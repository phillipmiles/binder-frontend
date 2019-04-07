import React from 'react'
import { GlobalOverrideStyles, H2, NavBar, Content, ContentPanel, PageHeader, ButtonGroupInline } from './../common';
import WorkspaceNodesTableContainer from './WorkspaceNodesTableContainer';
import Button from '../common/Button';
import WorkspaceHeaderComponent from './WorkspaceHeaderComponent.jsx';
// import ButtonGroupComponent from '../common/ButtonGroup'
import styled from 'styled-components'




const PageWrapper = styled.div`
    
`


const ContentSpaceTop = styled(Content)`
    margin-top: 402px;
`

const ButtonGroupRight = styled(ButtonGroupInline)`
    position: absolute;
    top: 50%;
    right: ${props => props.theme.content_panel_padding};
    transform: translateY(-50%);

    button {
        margin-left: 24px;
    }
`;


function WorkspaceComponent({ numChildNodes, workspaceId, workspaceTitle, onAddNodeClick }) {

    return (
        <PageWrapper>
            <GlobalOverrideStyles backgroundColour={props => props.theme.color_background}/>
            <NavBar backButtonLink={'/dashboard'} backButtonLabel={'Workspaces'} />

                <WorkspaceHeaderComponent 
                    workspaceTitle={workspaceTitle}
                    numChildNodes={numChildNodes}
                />

            <ContentSpaceTop>
                <ContentPanel
                    animateIn={true}
                    header={
                        <React.Fragment>
                            <H2 asH3>Documents</H2>
                            <ButtonGroupRight>
                                <Button 
                                    text='New document' 
                                    onClick={() => onAddNodeClick(workspaceId, 'document')}
                                    icon='file-plus'></Button>
                                <Button text='New subspace' onClick={() => onAddNodeClick(workspaceId, 'subspace')} icon='folder-plus'></Button>
                            </ButtonGroupRight>
                        </React.Fragment>
                    }
                    paddingBody={'0'}
                >      
                    <WorkspaceNodesTableContainer/>
                </ContentPanel>
            </ContentSpaceTop>
        </PageWrapper>
    );
}


export default WorkspaceComponent;
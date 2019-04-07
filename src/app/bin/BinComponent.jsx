import React from 'react'
import { GlobalOverrideStyles, NavBar, Content, ContentPanel, PageHeader, H1 } from './../common';
import BinTableContainer from './BinTableContainer';
import styled from 'styled-components'


function BinComponent() {
    return (
        <div>
            <GlobalOverrideStyles backgroundColour={props => props.theme.color_background}/>
            <NavBar backButtonLink={'/dashboard'} backButtonLabel={'Workspaces'} />
            <Content>
                <ContentPanel
                    animateIn={true}
                    header={
                        <React.Fragment>
                            <H1 asH2>Bin</H1>
                        </React.Fragment>
                    }
                    paddingBody={'0'}
                >      
                    <BinTableContainer/>
                </ContentPanel>
            </Content>
        </div>

        // <div>
        //     <GlobalOverrideStyles backgroundColour={props => props.theme.color_lightgrey}/>
        //     <NavBar></NavBar>
        //     <Content>
        //         <PageHeader>
        //             <h1>Bin</h1>
        //         </PageHeader>
        //         <ContentPanel>
        //             <BinTableContainer></BinTableContainer>
        //         </ContentPanel>
        //     </Content>
        // </div>
    );
}



export default BinComponent;

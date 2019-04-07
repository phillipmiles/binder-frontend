import React from 'react';
import { Link } from 'react-router-dom';
import { GlobalOverrideStyles, NavBar, Content, ContentCenter, ContentPanel, PageHeader } from './../common';
import { FormExtras, FormExtra } from './../common/styles/Form';
import LoginFormContainer from './LoginFormContainer';
import styled from 'styled-components'


// const Subtle = styled.p`
//     font-size: 14px;
//     color: #7F7F7F;
// `

// const Title = styled.h1`
//     margin-bottom: 16px;

// `


function LoginComponent() {
    return (
        <div>
            <GlobalOverrideStyles backgroundColour={props => props.theme.color_primary}/>
            <NavBar></NavBar>
            {/* <Content narrow> */}
                <ContentCenter narrow>
                    <ContentPanel animateIn>
                        <PageHeader>
                            <h1>Login</h1>
                            {/* <Subtle>Don't have an account? <Link to="/register">Create your free one now.</Link></Subtle> */}
                            
                        </PageHeader>
                        <LoginFormContainer/>
                        <FormExtras>
                            <FormExtra>
                                Don't have an account? <Link to="/register">Create your free one now.</Link>
                            </FormExtra>
                        </FormExtras>
                    </ContentPanel>
                </ContentCenter>
            {/* </Content> */}
        </div>
    )
}

export default LoginComponent;

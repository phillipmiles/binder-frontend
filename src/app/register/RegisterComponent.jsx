import React from 'react';
import { Link } from 'react-router-dom';
import RegisterFormContainer from './RegisterFormContainer';
import { GlobalOverrideStyles, NavBar, ContentCenter, ContentPanel, PageHeader } from './../common';
import { FormExtras, FormExtra } from './../common/styles/Form';

const RegisterComponent = () => (
    <div>
        <GlobalOverrideStyles backgroundColour={props => props.theme.color_primary}/>
        <NavBar></NavBar>
        <ContentCenter narrow>
            <ContentPanel animateIn>
                <PageHeader>
                    <h1>Register</h1>
                </PageHeader>
                <RegisterFormContainer></RegisterFormContainer>
                <FormExtras>
                    <FormExtra>
                        Or <Link to="/login">login to your account.</Link>
                    </FormExtra>
                </FormExtras>
            </ContentPanel>
        </ContentCenter>
    </div>
);

export default RegisterComponent;
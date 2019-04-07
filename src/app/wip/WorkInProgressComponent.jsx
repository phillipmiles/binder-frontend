import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { GlobalOverrideStyles, NavBar, Content, ContentCenter, ContentPanel, PageHeader } from './../common';
import { FormExtras, FormExtra } from './../common/styles/Form';
import styled from 'styled-components'


// const Subtle = styled.p`
//     font-size: 14px;
//     color: #7F7F7F;
// `

// const Title = styled.h1`
//     margin-bottom: 16px;

// `

const WorkInProgressComponent = ({
    onClickBack
}) => (
    
    // const {backLink} = this.props;
    // console.log('woop', linkBack);
    // return (
        <div>
            <GlobalOverrideStyles backgroundColour={props => props.theme.color_primary}/>
            <NavBar></NavBar>
            <ContentCenter narrow>
                <ContentPanel animateIn>
                    <PageHeader>
                        <h1>Work in progress</h1>
                        <p>This page or feature is still in development.</p>
                        <p><a href="/" onClick={onClickBack}>Return to previous page.</a></p>
                        
                    </PageHeader>
                    
                </ContentPanel>
            </ContentCenter>
        </div>
    )


export default WorkInProgressComponent;

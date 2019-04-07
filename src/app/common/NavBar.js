import React, { Component } from 'react';
import { connect } from 'react-redux'
import { userSelectors } from '../duck/user';
import { Link } from 'react-router-dom';
import { AccountMenu } from './';
import { withRouter } from 'react-router'
import styled from 'styled-components'
import IconSVG from '../common/IconSVG'

const NavBarWrapper = styled.div`
  text-align: center;
  height: 64px;
  line-height: 64px;
  /* padding: 0 48px; */
    padding: 0 4%;
  background-color: ${props => props.theme.color_foreground};
  color: ${props => props.theme.color_grey};
  box-shadow: 0 4px 8px -4px rgba(0,0,0,0.13);
  position: fixed;
  z-index: 500;
  top: 0;
  left: 0;
  right: 0;

    @media (min-width: 1200px) {
        padding: 0 48px;
    }

`

const NavItem = styled.div`
    display: inline-block;
    cursor: pointer;

    &:hover {
        color: ${props => props.theme.color_primary};
    }

    a {
        text-decoration: none;
        color: inherit;
        padding: 0px 16px;
        display: block;
    }

    svg {
        margin-right: 16px;
        stroke-width: 1.5px;
    }
`

const Logo = styled.div`
    display: inline-block;
 
    font-weight: ${props => props.theme.font_semibold};
    color: ${props => props.theme.color_black};
    font-size: 24px;
    cursor: pointer;

    &:hover {
        color: ${props => props.theme.color_primary};
    }

    a {
        text-decoration: none;
        color: inherit;
        padding: 0 16px;   
        display: block;
    }
`

const NavBarLeft = styled.div`
    float: left;
`

const NavBarRight = styled.div`
    float: right;
`


const NavigationComponent = ({ isLoggedIn, backButtonLink, backButtonLabel, documentTitle }) => {
    
    // const backButtonLabel =  backButtonLabel ? backButtonLabel : 'Back';

    return (

        <NavBarWrapper>
            <NavBarLeft>
                {isLoggedIn ? (
                    <React.Fragment>
                        {backButtonLink ? (
                            <NavItem><Link to={backButtonLink}>
                                <IconSVG icon='chevron-left'/>
                                <span>{backButtonLabel ? backButtonLabel : 'Back'}</span>
                            </Link></NavItem>
                        ) : (
                            <Logo><Link to="/dashboard">Binder</Link></Logo>
                        )}
                    </React.Fragment>
                ) : (
                    <Logo><Link to="/">Binder</Link></Logo>
                )}            
            </NavBarLeft>
            {documentTitle &&
                <React.Fragment> 
                    {documentTitle} 
                </React.Fragment>
            }
            <NavBarRight>
                {isLoggedIn ? (
                    <React.Fragment>
                        {/* <NavItem>Bell</NavItem> */}
                        <AccountMenu></AccountMenu>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <NavItem><Link to="/login">Login</Link></NavItem>
                        <NavItem><Link to="/register">Register</Link></NavItem>
                    </React.Fragment>
                )}
            </NavBarRight>
            
        </NavBarWrapper>

    )
}




const mapStateToProps = state => ({
    isLoggedIn: userSelectors.isLoggedIn(state)
})

const NavigationContainer = withRouter(connect(
    mapStateToProps,
)(NavigationComponent));




export default NavigationContainer;
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import LoginComponent from './LoginComponent'


class LoginContainer extends Component {
    state = {
        redirectToReferrer: false
    }

    constructor(props) {
        super(props);
        const { from } = this.props.location.state || { from: { pathname: '/' } }
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer === true) {
            return <Redirect to={from} />
        }
    }
}

LoginContainer = connect()(LoginComponent)

export default LoginContainer;

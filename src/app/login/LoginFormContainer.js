import React, { Component } from 'react'
import { connect } from 'react-redux'
import LoginFormComponent from './LoginFormComponent'
import { withRouter } from 'react-router'
import { userSelectors, userOperations } from '../duck/user'


class LoginFormContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            emailErrorMessage: '',
            passwordErrorMessage: '',
            formErrorMessage: ''
        };
    
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.props.clearLoginError();
    }

    handleEmailChange(event) {
        if(this.state.emailErrorMessage) {
            this.setState({emailErrorMessage: ''});
        }
        this.setState({email: event.target.value});
    }

    handlePasswordChange(event) {
        if(this.state.passwordErrorMessage) {
            this.setState({passwordErrorMessage: ''});
        }
        this.setState({password: event.target.value});
    }

    handleSubmit(event) {
        const { isFetchingUser } = this.props;

        event.preventDefault();
     
        this.props.clearLoginError();
        
        if(isFetchingUser)
            return

        if(this.validateEmail() && this.validatePassword()) {
            this.props.userLogin({username: this.state.email, password: this.state.password});
        }
    }

    validateEmail() {
        if(!this.state.email) {
            this.setState({emailErrorMessage: 'No email provided.'});
            return false;
        }
        return true;
    }

    validatePassword() {
        if(!this.state.password) {
            this.setState({passwordErrorMessage: 'No password provided.'});
            return false;
        }
        return true;
    }

    getFormErrorMessage() {
        if(this.props.loginErrorMessage)
            return 'Error: ' + this.props.loginErrorMessage;
        return false;
    }

    render() {
        return (
            <LoginFormComponent
                onSubmit={this.handleSubmit}
                onEmailChange={this.handleEmailChange}
                onPasswordChange={this.handlePasswordChange}
                isSubmitting={this.props.isFetchingUser}
                emailValue={this.state.email}
                passwordValue={this.state.password}
                emailErrorMessage={this.state.emailErrorMessage}
                passwordErrorMessage={this.state.passwordErrorMessage}
                formErrorMessage={this.props.loginErrorMessage}
            />
        );
    }
}


const mapStateToProps = state => ({
    isFetchingUser: userSelectors.getIsFetchingLogin(state),
    loginErrorMessage: userSelectors.getLoginError(state)
})


LoginFormContainer = withRouter(connect(
    mapStateToProps,
    {
        'userLogin': userOperations.userLogin,
        'clearLoginError': userOperations.clearError
    }
)(LoginFormContainer));

export default LoginFormContainer;

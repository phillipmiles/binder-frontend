import React, { Component } from 'react';
import { connect } from 'react-redux';
import RegisterFormComponent from './RegisterFormComponent';
import { userRegisterOperations, userRegisterSelectors } from './duck';

class RegisterFormContainer extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            password: '',
            passwordRepeat: '',
            emailErrorMessage: '',
            firstNameErrorMessage: '',
            lastNameErrorMessage: '',
            passwordErrorMessage: '',
            passwordRepeatErrorMessage: ''
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handleFirstNameChange = this.handleFirstNameChange.bind(this);
        this.handleLastNameChange = this.handleLastNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handlePasswordRepeatChange = this.handlePasswordRepeatChange.bind(this);
    }

    componentWillMount() {
        this.props.clearRegisterError();
    }

   


    validateEmail() {
        if(!this.state.email) {
            this.setState({emailErrorMessage: 'No email provided.'});
            return false;
        }
        return true;
    }

    validateFirstName() {
        if(!this.state.firstName) {
            this.setState({firstNameErrorMessage: 'No first name provided.'});
            return false;
        }
        return true;
    }

    validateLastName() {
        if(!this.state.lastName) {
            this.setState({lastNameErrorMessage: 'No last name provided.'});
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

    validatePasswordRepeat() {
        if(!this.state.passwordRepeat || this.state.passwordRepeat !== this.state.password) {
            this.setState({passwordRepeatErrorMessage: 'Your passwords don\'t match'});
            return false;
        }
        return true;
    }



    validate() {
        if(!this.validateEmail() || !this.validateFirstName()
            || !this.validateLastName()
            || !this.validatePassword()
            || !this.validatePasswordRepeat()
        ) {
            return false;
        }

        return true;
    }

    handleEmailChange(event) {
        this.setState({
            email: event.target.value,
            emailErrorMessage: ''
        });
    }

    handleFirstNameChange(event) {
        this.setState({
            firstName: event.target.value,
            firstNameErrorMessage: ''
        });
    }

    handleLastNameChange(event) {
        this.setState({
            lastName: event.target.value,
            lastNameErrorMessage: ''
        });
    }

    handlePasswordChange(event) {
        console.log(event);
        this.setState({
            password: event.target.value,
            passwordErrorMessage: ''
        });
    }

    handlePasswordRepeatChange(event) {
        this.setState({
            passwordRepeat: event.target.value,
            passwordRepeatErrorMessage: ''
        });
    }
    
    handleSubmit(event) {
        const { isFetchingRegister } = this.props;

        event.preventDefault();
     
        this.props.clearRegisterError();
        
        if(isFetchingRegister)
            return
     
        if(this.validate()) {
            this.props.userRegisterAccount(
                {
                    email: this.state.email,
                    firstName: this.state.firstName,
                    lastName: this.state.lastName,
                    password: this.state.password,
                }
            );
        }
    }

    render() {
        return (
            <RegisterFormComponent
                onSubmit={this.handleSubmit}
                isSubmitting={this.props.isFetchingRegister}
                formErrorMessage={this.props.registerErrorMessage}

                onEmailChange={this.handleEmailChange}
                onFirstNameChange={this.handleFirstNameChange}
                onLastNameChange={this.handleLastNameChange}
                onPasswordChange={this.handlePasswordChange}
                onPasswordRepeatChange={this.handlePasswordRepeatChange}

                emailValue={this.state.email}
                firstNameValue={this.state.firstName}
                lastNameValue={this.state.lastName}
                passwordValue={this.state.password}
                passwordRepeatValue={this.state.passwordRepeat}

                emailErrorMessage={this.state.emailErrorMessage}
                firstNameErrorMessage={this.state.firstNameErrorMessage}
                lastNameErrorMessage={this.state.lastNameErrorMessage}
                passwordErrorMessage={this.state.passwordErrorMessage}
                passwordRepeatErrorMessage={this.state.passwordRepeatErrorMessage}
            />
        );
    }
}


const mapStateToProps = state => ({
    isFetchingRegister: userRegisterSelectors.getIsFetchingRegister(state),
    registerErrorMessage: userRegisterSelectors.getRegisterError(state)
})


RegisterFormContainer = connect(
    mapStateToProps,
    {
        'userRegisterAccount': userRegisterOperations.userRegisterAccount,
        'clearRegisterError': userRegisterOperations.clearError
    }
)(RegisterFormContainer);


export default RegisterFormContainer;
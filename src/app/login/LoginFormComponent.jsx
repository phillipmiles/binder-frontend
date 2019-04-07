import React from 'react';
import { Link } from 'react-router-dom';
import { Form, FormGroup, InputTextForm } from './../common';
import { FormInputText } from './../common/styles/Form';
import styled from 'styled-components'

const LoginFormComponent = ({ 
    onSubmit, 
    onEmailChange, 
    onPasswordChange, 
    isSubmitting,
    emailValue, 
    passwordValue,
    emailErrorMessage,
    passwordErrorMessage,
    formErrorMessage
}) => (
    <Form 
        onSubmit={onSubmit}
        isSubmitting={isSubmitting}
        formErrorMessage={formErrorMessage}>
        <FormGroup 
            InputComponent={
                <FormInputText type="text" 
                    value={emailValue} 
                    onChange={onEmailChange}
                    name={'email'}
                    placeholder={'Email'}
                />
            }
            errorMessage={emailErrorMessage}
        />
        <FormGroup 
            InputComponent={
                <FormInputText type="password" 
                    value={passwordValue} 
                    onChange={onPasswordChange} 
                    name={'password'}
                    placeholder={'Password'} 
                />
            }
            FormGroupExtraComponent={
                <Link to="/forgot">Forgot your password?</Link>
            }
            errorMessage={passwordErrorMessage}
        />
    </Form>
);

export default LoginFormComponent;
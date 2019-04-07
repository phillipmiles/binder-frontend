import React from 'react';
import { Form, FormGroup, InputTextForm } from './../common';
import { FormInputText } from './../common/styles/Form';
import styled from 'styled-components'

const RegisterFormComponent = ({ 
    onSubmit, 
    isSubmitting,
    formErrorMessage,

    onEmailChange, 
    onFirstNameChange, 
    onLastNameChange, 
    onPasswordChange,
    onPasswordRepeatChange, 

    emailValue,
    firstNameValue,
    lastNameValue, 
    passwordValue,
    passwordRepeatValue,

    emailErrorMessage,
    firstNameErrorMessage,
    lastNameErrorMessage,
    passwordErrorMessage,
    passwordRepeatErrorMessage,
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
                    placeholder={'Email'}
                />
            }
            errorMessage={emailErrorMessage}
        />
        <FormGroup 
            InputComponent={
                <FormInputText type="text" 
                    value={firstNameValue} 
                    onChange={onFirstNameChange}
                    placeholder={'First name'}
                />
            }
            errorMessage={firstNameErrorMessage}
        />
        <FormGroup 
            InputComponent={
                <FormInputText type="text" 
                    value={lastNameValue} 
                    onChange={onLastNameChange}
                    placeholder={'Last name'}
                />
            }
            errorMessage={lastNameErrorMessage}
        />
        <FormGroup 
            InputComponent={
                <FormInputText type="password" 
                    value={passwordValue} 
                    onChange={onPasswordChange} 
                    placeholder={'Password'} 
                />
            }
            errorMessage={passwordErrorMessage}
        />
        <FormGroup 
            InputComponent={
                <FormInputText type="password" 
                    value={passwordRepeatValue} 
                    onChange={onPasswordRepeatChange} 
                    placeholder={'Repeat password'} 
                />
            }
            errorMessage={passwordRepeatErrorMessage}
        />
    </Form>
);

export default RegisterFormComponent;
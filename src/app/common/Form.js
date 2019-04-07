import React, { Component } from 'react';
import { FormError, SubmitButton } from './styles/Form';
import styled from 'styled-components'

function preventOutline(event) {
    event.preventDefault();
}
        
function GetSubmitButton(props) {
    const { isSubmitting } = props;

    if (isSubmitting) {
        return <SubmitButton type="submit" value="loading..." disabled/>;
    } else {
        return <SubmitButton type="submit" value="Submit" onMouseDown={preventOutline}/>;
        
    }
}

const FormComponent = ({ 
    onSubmit, 
    isSubmitting,
    formErrorMessage,
    children
}) => (
    <form onSubmit={onSubmit}>
        {formErrorMessage &&
            <FormError>{formErrorMessage}</FormError>
        }
        {children}
        <GetSubmitButton isSubmitting={isSubmitting}/>
    </form>
);

export default FormComponent;
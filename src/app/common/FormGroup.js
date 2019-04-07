import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { 
    FormGroup,
    FormGroupExtras, 
    FormGroupError,
    FormGroupExtra
} from './styles/Form'

const FormGroupComponent = ({ 
    name,
    label,
    errorMessage,

    InputComponent,
    FormGroupExtraComponent
}) => (

    <FormGroup errorMessage>
        <label>
            {label &&
                <span>{label}</span>
            }
            {InputComponent}
        </label>
        {errorMessage &&
            <FormGroupError data-cy={'form-group-error-' + name}>
                {errorMessage}
            </FormGroupError>
        }
        {FormGroupExtraComponent &&
            <FormGroupExtras>
                <FormGroupExtra>
                    {FormGroupExtraComponent}
                </FormGroupExtra>
            </FormGroupExtras>
        }
    </FormGroup>
)

FormGroupComponent.propTypes = {
    label: PropTypes.string,
    errorMessage: PropTypes.string,
    InputComponent: PropTypes.object,
    FormGroupExtraComponent: PropTypes.object
}

export default FormGroupComponent;
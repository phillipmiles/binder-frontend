// Form.js

import styled from 'styled-components'


export const FormError = styled.div`
    color: ${props => props.theme.color_error};
    margin-bottom: 12px;
`

export const FormExtras = styled.div`
    margin-top: 24px;
    font-size: 14px;
    color: ${props => props.theme.color_grey};
`

export const FormExtra = styled.div`
    text-align: center;
`


export const FormInputText = styled.input`
    width: 100%;
    display: block;
    padding: 8px 12px;
    font-size: 18px;
    outline: none;
    border-radius: 4px;
    border: 1px solid ${props => props.theme.color_grey_30};

    height: 56px;

    &:hover {
        border-color: ${props => props.theme.color_primary};
    }

    &:focus {
        border-color: ${props => props.theme.color_primary};
    }

    &::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
        color: ${props => props.theme.color_grey};
        opacity: 1; /* Firefox */
    }

    &:-ms-input-placeholder { /* Internet Explorer 10-11 */
        color: ${props => props.theme.color_grey};
    }

    &::-ms-input-placeholder { /* Microsoft Edge */
        color: ${props => props.theme.color_grey};
    }

    &[disabled] {
        color: ${props => props.theme.color_grey};
        -webkit-transition: color 1000ms; /* Safari */
        transition: color 1000ms;
    }
`

export const SubmitButton = styled.input`
    padding: 0px 24px;
    font-size: 14px;
    font-weight: ${props => props.theme.font_semibold};
    display: inline-block;
    cursor: pointer;
    
    background-color: ${props => props.theme.color_primary};
    position: relative;
    color: #FFF;
    line-height: 56px;
    /* box-shadow: 0 10px 10px -6px rgba(234, 78, 138, 0.6); */
    box-shadow: 0 10px 10px -6px rgba(78, 143, 234, 0.6);
    /* background: linear-gradient(165deg, #f32672, ${props => props.theme.color_primary}); */
    background: ${props => props.theme.color_primary};
    border: none;
    min-width: 200px;
    margin: auto;
    transition: box-shadow 300ms;

    /* Unique to here */
    border-radius: 4px;
    width: 100%;
    font-size: 16px;
    /* Unique to here */

    &:hover:not([disabled]) {
        background: linear-gradient(165deg, #d6135b,#bd044b);
        box-shadow: 0 2px 4px -2px #bd044b;
        color: #ffb4d0;
    }

    /* Unique to here */
    &[disabled] {
        background: linear-gradient(165deg, #DDD,#AAA);
        box-shadow: 0 2px 4px -2px #888;
    }
    /* Unique to here */
`



export const FormGroup = styled.div`
    margin-bottom: 26px;
`

export const FormGroupError = styled.div`
    color: ${props => props.theme.color_error};
    padding: 6px 0;
`

export const FormGroupExtras = styled.div`
    padding: 6px 0;
    font-size: 14px;
    color: ${props => props.theme.color_grey_40};

    a {
        color: ${props => props.theme.color_grey_40};
    }
`

export const FormGroupExtra = styled.div`
    text-align: right;
`
import React, { Component } from 'react'
import styled from 'styled-components'

const TextAreaInput = styled.textarea`
    font-size: inherit;
    font-weight: inherit;
    border: none;
    color: ${props => props.theme.color_primary};
    outline: none;
    text-align: inherit;
    width: inherit;
    resize: none;

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

const TextInput__Form = styled.form`
    width: 100%;
`

class InputTextAreaForm extends Component {
    constructor(props) {
        super(props);
        this.state = { value: this.props.value };
        this.handleWindowCick = this.handleWindowCick.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    };

    
    componentDidMount() {
        document.getElementById(this.props.id).focus();

        window.addEventListener("keyup", this.handleKeyUp);
    
        // Prevent the same click that enabled edit mode from also disabling it
        // in the same tick.
        setTimeout(function() {
            console.log('setting windowClick event')
            window.addEventListener("click", this.handleWindowCick);
        }.bind(this), 0);
        
    }

    componentWillUnmount() {
        window.removeEventListener("click", this.handleWindowCick);
        window.removeEventListener("keyup", this.handleKeyUp);
    }

    handleWindowCick(event) {
        if(event.target !== document.getElementById(this.props.id)) {
            this.props.onSubmit(event, this.state.value)
        }
    }

    handleKeyUp(event) {
        if(event.keyCode === 27) {  // ESC
            this.props.handleEscKey(event);
        }
    }

    handleChange(event) {
        this.setState({value: event.target.value});
    }

    handleSubmit(event) {
        event.preventDefault();
        this.props.onSubmit(event, this.state.value)
    }
    

    render = () => (
        <TextInput__Form onSubmit={this.handleSubmit}>
            <TextAreaInput 
                id={this.props.id} 
                type="text" 
                name={this.props.name} 
                defaultValue={this.props.value} 
                placeholder={this.props.placeholder} 
                onChange={this.handleChange} 
                disabled={this.props.disabled}
                className={this.props.className}
            />
        </TextInput__Form>
    )
}

export default InputTextAreaForm;




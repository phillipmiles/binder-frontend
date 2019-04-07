import { createGlobalStyle } from 'styled-components';

const GlobalOverrideStyles = createGlobalStyle`
    html {
        /* background-color: ${props => (props.backgroundGrey ? '#f1f1f1' : '#FFF')}; */
        background-color: ${props => (props.backgroundColour ? props.backgroundColour : '#FFF')};
    }
`

export default GlobalOverrideStyles;
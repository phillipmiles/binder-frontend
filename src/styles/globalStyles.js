import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`

    @import url('https://fonts.googleapis.com/css?family=Open+Sans:300,400,600,700,800');

    * {
        box-sizing: border-box;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }

    html, body {
        margin: 0;
        padding: 0;
    }

    body {
        font-family: ${props => props.theme.font_family};
        color: ${props => props.theme.color_black};
    }

    h1, h2, h3, h4, h5, h6 {
        font-weight: ${props => props.theme.font_semibold};
    }

    h1 {
        font-size: ${props => props.theme.heading1_font_size};
        /* font-weight: ${props => props.theme.font_semibold}; */
        letter-spacing: -0.5px;
        margin-bottom: 24px;
    }

    h2 {
        font-size: ${props => props.theme.heading2_font_size};
        letter-spacing: -0.5px;
    }

    h3 {
        font-size: ${props => props.theme.heading3_font_size};
    }

    h4 {
        font-size: ${props => props.theme.heading4_font_size};
    }

    input {
        font-family: ${props => props.theme.font_family};
        padding: 0;
    }

    ul, li {
        padding: 0;
        margin: 0;
    }

    a {
        color: ${props => props.theme.color_primary};

        &:hover {
            color: ${props => props.theme.color_primary};
        }
    }
`

export default GlobalStyle;
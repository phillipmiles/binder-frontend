
import styled from "styled-components";

const Content = styled.div`
    box-sizing: content-box; /* Allows us to add x padding without altering max-width values. */
    max-width: ${props => (props.narrow ? '512px' : '1024px')};
    margin: auto;
    padding-top: 108px;
    padding-left: 64px;
    padding-right: 64px;
    padding-bottom: 128px;

    margin-top: 64px; /* Navbar height */
`

export default Content;
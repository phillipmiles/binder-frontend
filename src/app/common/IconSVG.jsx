import React from 'react'
import styled from 'styled-components'

const feather = require('feather-icons');

const Span = styled.span`
    position: relative;
    top: 5px;
`
function createIconMarkup(icon, settings) {
    return {__html: feather.icons[icon].toSvg(settings)};
}

function IconSVG({ icon }) {
    return (
        <Span dangerouslySetInnerHTML={createIconMarkup(icon)} />
    );
}

export default IconSVG

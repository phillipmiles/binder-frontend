import styled from "styled-components";

export const H1 = styled.h1.attrs({
    size: props => {
        if(props.asH2) 
            return props.theme.heading2_font_size;
        if(props.asH3) 
            return props.theme.heading3_font_size;
        if(props.asH4) 
            return props.theme.heading4_font_size;
        if(props.asH5) 
            return props.theme.heading5_font_size;
        if(props.asH6) 
            return props.theme.heading6_font_size;
        if(props.fontSize)
            return props.fontSize
        return props.theme.heading1_font_size;
    },
    weight: props => {
        if(props.asH2) 
            return props.theme.heading2_font_weight;
        if(props.asH3) 
            return props.theme.heading3_font_weight;
        if(props.asH4) 
            return props.theme.heading4_font_weight;
        if(props.asH5) 
            return props.theme.heading5_font_weight;
        if(props.asH6) 
            return props.theme.heading6_font_weight;
        if(props.fontWeight)
            return props.fontWeight
        return props.theme.heading1_font_weight;
    },
})`
    font-size: ${props => props.size};
    font-weight: ${props => props.weight};
    color: ${props => props.color ? props.color : 'inital'};
`;




export const H2 = styled.h2.attrs({
    size: props => {
        if(props.asH1) 
            return props.theme.heading1_font_size;
        if(props.asH3) 
            return props.theme.heading3_font_size;
        if(props.asH4) 
            return props.theme.heading4_font_size;
        if(props.asH5) 
            return props.theme.heading5_font_size;
        if(props.asH6) 
            return props.theme.heading6_font_size;
        if(props.fontSize)
            return props.fontSize
        return props.theme.heading2_font_size;
    },
    weight: props => {
        if(props.asH1) 
            return props.theme.heading1_font_weight;
        if(props.asH3) 
            return props.theme.heading3_font_weight;
        if(props.asH4) 
            return props.theme.heading4_font_weight;
        if(props.asH5) 
            return props.theme.heading5_font_weight;
        if(props.asH6) 
            return props.theme.heading6_font_weight;
        if(props.fontWeight)
            return props.fontWeight
        return props.theme.heading2_font_weight;
    },
})`
    font-size: ${props => props.size};
    font-weight: ${props => props.weight};
    color: ${props => props.color ? props.color : 'inital'};
`;



export const H3 = styled.h3.attrs({
    size: props => {
        if(props.asH1) 
            return props.theme.heading1_font_size;
        if(props.asH3) 
            return props.theme.heading2_font_size;
        if(props.asH4) 
            return props.theme.heading4_font_size;
        if(props.asH5) 
            return props.theme.heading5_font_size;
        if(props.asH6) 
            return props.theme.heading6_font_size;
        if(props.fontSize)
            return props.fontSize
        return props.theme.heading3_font_size;
    },
    weight: props => {
        if(props.asH1) 
            return props.theme.heading1_font_weight;
        if(props.asH3) 
            return props.theme.heading2_font_weight;
        if(props.asH4) 
            return props.theme.heading4_font_weight;
        if(props.asH5) 
            return props.theme.heading5_font_weight;
        if(props.asH6) 
            return props.theme.heading6_font_weight;
        if(props.fontWeight)
            return props.fontWeight
        return props.theme.heading3_font_weight;
    },
})`
    font-size: ${props => props.size};
    font-weight: ${props => props.weight};
    color: ${props => props.color ? props.color : 'inital'};
`;

export const H4 = styled.h4.attrs({
    size: props => {
        if(props.asH1) 
            return props.theme.heading1_font_size;
        if(props.asH3) 
            return props.theme.heading2_font_size;
        if(props.asH4) 
            return props.theme.heading3_font_size;
        if(props.asH5) 
            return props.theme.heading5_font_size;
        if(props.asH6) 
            return props.theme.heading6_font_size;
        if(props.fontSize)
            return props.fontSize
        return props.theme.heading4_font_size;
    },
    weight: props => {
        if(props.asH1) 
            return props.theme.heading1_font_weight;
        if(props.asH3) 
            return props.theme.heading2_font_weight;
        if(props.asH4) 
            return props.theme.heading3_font_weight;
        if(props.asH5) 
            return props.theme.heading5_font_weight;
        if(props.asH6) 
            return props.theme.heading6_font_weight;
        if(props.fontWeight)
            return props.fontWeight
        return props.theme.heading4_font_weight;
    },
})`
    font-size: ${props => props.size};
    font-weight: ${props => props.weight};
    color: ${props => props.color ? props.color : 'inital'};
`;

export const H5 = styled.h5.attrs({
    size: props => {
        if(props.asH1) 
            return props.theme.heading1_font_size;
        if(props.asH3) 
            return props.theme.heading2_font_size;
        if(props.asH4) 
            return props.theme.heading3_font_size;
        if(props.asH5) 
            return props.theme.heading4_font_size;
        if(props.asH6) 
            return props.theme.heading6_font_size;
        if(props.fontSize)
            return props.fontSize
        return props.theme.heading5_font_size;
    },
    weight: props => {
        if(props.asH1) 
            return props.theme.heading1_font_weight;
        if(props.asH3) 
            return props.theme.heading2_font_weight;
        if(props.asH4) 
            return props.theme.heading3_font_weight;
        if(props.asH5) 
            return props.theme.heading4_font_weight;
        if(props.asH6) 
            return props.theme.heading6_font_weight;
        if(props.fontWeight)
            return props.fontWeight
        return props.theme.heading5_font_weight;
    },
})`
    font-size: ${props => props.size};
    font-weight: ${props => props.weight};
    color: ${props => props.color ? props.color : 'inital'};
`;


export const H6 = styled.h6.attrs({
    size: props => {
        if(props.asH1) 
            return props.theme.heading1_font_size;
        if(props.asH3) 
            return props.theme.heading2_font_size;
        if(props.asH4) 
            return props.theme.heading3_font_size;
        if(props.asH5) 
            return props.theme.heading4_font_size;
        if(props.asH6) 
            return props.theme.heading5_font_size;
        if(props.fontSize)
            return props.fontSize
        return props.theme.heading6_font_size;
    },
    weight: props => {
        if(props.asH1) 
            return props.theme.heading1_font_weight;
        if(props.asH3) 
            return props.theme.heading2_font_weight;
        if(props.asH4) 
            return props.theme.heading3_font_weight;
        if(props.asH5) 
            return props.theme.heading4_font_weight;
        if(props.asH6) 
            return props.theme.heading5_font_weight;
        if(props.fontWeight)
            return props.fontWeight
        return props.theme.heading6_font_weight;
    },
})`
    font-size: ${props => props.size};
    font-weight: ${props => props.weight};
    color: ${props => props.color ? props.color : 'inital'};
`;

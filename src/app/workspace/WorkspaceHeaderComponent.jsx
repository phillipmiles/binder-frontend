import React, { Component } from 'react';
import { Content } from './../common';
import styled from 'styled-components'


const WorkspaceDocumentCounter = styled.div`
    font-size: 16px;
    line-height: 48px;
    opacity: 0.6;
    font-weight: ${props => props.theme.font_semibold};
`

const WorkspaceHeader = styled.div`
    background-color: ${props => props.theme.color_primary};
    background: linear-gradient(300deg, #02A4B5, #2682DB, #6063FF);
    color: #FFF;
    height: 640px;
    position: absolute;
    top: 0;
    transform: translate3d(0px, ${props => props.topOffset}px, 0px);
    z-index: 0;
    left: 0;
    right: 0;
    text-align: center;

    h1 {
        font-family: 'Libre Baskerville';
    }
`

// const WorkspaceHeaderContentWrap = styled.div`
    
// `

const WorkspaceHeaderContent = styled(Content)`
    position: absolute;
    top: 50%;
    left:50%;
    transform: translate(-50%, -50%);
    margin-top: ${props => props.titleTopOffset}px;
    opacity: ${props => props.titleOpacity};
    filter: blur(${props => props.titleBlur}px);
`







class WorkspaceHeaderComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            titleOpacity: 1,
            titleBlur: 0,
            titleTopOffset: 0,
            topOffset: 0,
            tick: false
        };
        this.onScroll = this.onScroll.bind(this);
        this.updateParallax = this.updateParallax.bind(this);
    };
    
    componentDidMount() {
        window.addEventListener('scroll', this.onScroll);
    }
    
    componentDidUpdate() {
        // console.log('hi');
        if(this.state.ticking) {
            this.setState({
                ticking: false
            });
        }

    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }
    // tableItemIcon(node) {
    //     switch(node.type) {
    //       case 'subspace':
    //         return 'folder'
    //         break;
    //       case 'document':
    //         return 'file'
    //         break;
    //       default:
    //         return null;
    //         break;
    //     }
    // }

    // lastEditedPhrase(node) {
    //     if(!node.lastEditedAge) {
    //       return false;
    //     } else if(node.lastEditedAge < 1000 ) {
    //       return 'just now';
    //     } else {
    //       return dateFuncs.convertAgeToSentence(node.lastEditedAge) + ' ago';
    //     }
    // }

    // onReleaseDrag(node) {
    //     console.log('Release drag');
    //     this.props.releaseDragDocumentsTableItem();
    // }

    // onCancelDrag() {
    //     console.log('Cancel drag');
    //     this.props.releaseDragDocumentsTableItem();
    // }

    onScroll(e) {
        if(!this.state.ticking) {
            window.requestAnimationFrame(this.updateParallax);
        }
        this.setState({ticking: true});
    }

    updateParallax() {
        var scrolled = window.pageYOffset;

        var distanceFromToThatEqualsAnimationEnd = 300;
        

        const blur = Math.floor(scrolled / distanceFromToThatEqualsAnimationEnd * 10 * 5) / 10;
        const opacity = 1 - Math.floor(scrolled / distanceFromToThatEqualsAnimationEnd * 10) / 10;
        // const titleTopOffset = Math.floor(scrolled / distanceFromToThatEqualsAnimationEnd * 160);
        const topOffset = Math.floor(scrolled / distanceFromToThatEqualsAnimationEnd * 40);

        this.setState({
            // titleTopOffset: titleTopOffset >= 0 ? titleTopOffset : 0,
            titleOpacity: opacity >= 0 ? opacity : 0,
            titleBlur: blur >= 0 ? blur : 0,
            topOffset: topOffset >= 0 ? topOffset : 0,
        }) 
    }

    render() {

        const {numChildNodes, workspaceTitle } = this.props;

        return (
            <WorkspaceHeader topOffset={this.state.topOffset}>
                {/* <WorkspaceHeaderContentWrap> */}
                    <WorkspaceHeaderContent 
                        titleOpacity={this.state.titleOpacity} 
                        titleBlur={this.state.titleBlur}
                        titleTopOffset={this.state.titleTopOffset}
                    >
                        <h1>{workspaceTitle}</h1>
                        <WorkspaceDocumentCounter>{numChildNodes} documents</WorkspaceDocumentCounter>
                    </WorkspaceHeaderContent>
                {/* <WorkspaceHeaderContentWrap> */}
            </WorkspaceHeader>
        )
    }
}


export default WorkspaceHeaderComponent;
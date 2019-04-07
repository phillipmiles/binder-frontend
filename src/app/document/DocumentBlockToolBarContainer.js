import React, { Component } from 'react'
import { connect } from 'react-redux'
import { workspaceNodesOperations, workspaceNodesSelectors } from '../duck/workspaceNodes'
import { websocketOperations, websocketSelectors } from '../duck/websocket'
import { userSelectors } from '../duck/user'
import DocumentBlockToolbarComponent from './DocumentBlockToolbarComponent';

class DocumentBlockToolBarContainer extends Component {

    constructor(props) {
        super(props);
        
        this.state = {
            'posY': null,
            'posX': null,
            'isVisible': false,
            'isActive': false,
            'visibleRange': 300,
            'locationIndex': 0,
            'editorEl': document.getElementsByClassName('ql-editor')[0]
        }

        this.boldHandler = this.boldHandler.bind(this);
        this.codeBlockHandler = this.codeBlockHandler.bind(this);
        this.handleMouseMove = this.handleMouseMove.bind(this);
        this.onActivateHandler = this.onActivateHandler.bind(this);
        this.updatePosition = this.updatePosition.bind(this);
    };

    componentDidMount() {
        const { quill } = this.props;
        
        window.addEventListener('mousemove', this.handleMouseMove);
        this.state.editorEl.addEventListener('scroll', this.updatePosition);

        quill.on('text-change', function (delta, oldDelta, source) {
            this.updatePosition();
        }.bind(this));
    }

    componentDidUpdate(prevProps) {
        console.log('update toolbar');
    }

    componentWillUnmount() {
        window.removeEventListener('mousemove', this.handleMouseMove);
        window.removeEventListener('scroll', this.updatePosition);

    }

    updateLocationIndex(mouseX, mouseY) {
        const { editorEl } = this.state;
        
        const mouseDocPosY = mouseY + editorEl.scrollTop;

        for (let i = 0; i < editorEl.children.length; i++) {
            const editorChildEl = editorEl.children[i];

            if(mouseDocPosY < editorChildEl.offsetTop + editorChildEl.clientHeight) {
                if(mouseDocPosY - editorChildEl.offsetTop < (editorChildEl.offsetTop + editorChildEl.clientHeight) - mouseDocPosY) {
                    this.setState({
                        'locationIndex': i
                    });
                } else {
                    this.setState({
                        'locationIndex': i + 1
                    })
                }
                
                break;
            }        
        }
    }

    updatePosition() {        
        const { editorEl, locationIndex } = this.state;

        
    
        var GAP = 24;

        if(locationIndex === editorEl.children.length) {
            const editorChildEl = editorEl.children[locationIndex - 1];
            this.setState({
                'posY': editorChildEl.offsetTop + editorChildEl.clientHeight + GAP - editorEl.scrollTop,
                'posX': editorChildEl.offsetLeft - 128
            })
        } else {
            const editorChildEl = editorEl.children[locationIndex];
            this.setState({
                'posY': editorChildEl.offsetTop - GAP - editorEl.scrollTop,
                'posX': editorChildEl.offsetLeft - 128
            })
        }
    }
    calcPosition() {

    }

    updateModal() {
        
    }
    

    handleMouseMove(e) {

        const { isActive, isVisible, visibleRange, editorEl } = this.state;
        
        if(!isActive) {
            if(editorEl && editorEl.children && editorEl.children[0].offsetLeft - e.x < visibleRange && editorEl.children[0].offsetLeft - e.x > visibleRange * -1) {
                console.log('make visible')
                
                this.setState({
                    'isVisible': true,
                    'opacity': 1
                });

                this.updateLocationIndex(e.x, e.y);
                this.updatePosition();

                
            } else if(isVisible) {
                this.setState({
                    'isVisible': false,
                    'opacity': 0
                });
            }
        }
    }


    boldHandler() {
        console.log('handle')
        this.props.quill.format('bold', true);
    }

    onActivateHandler() {
        this.setState({
            isActive: true
        })
    }

    codeBlockHandler() {
        
        const { quill } = this.props;

        const text = quill.getText(0, 500);
        console.log('text', text)
        const selection = text.indexOf('\n');

        quill.insertText(selection, '\n', 'user');
        
        quill.setSelection(selection + 1, 0, 'user');

        // quill.getBounds(7)
        // quill.insertText(selection, '\n', 'user');
        
        // console.log(quill.getText(0, 500))
        quill.format('code-block', true, 'user');
        // quill.focus();

        // quill.updateContents(new Delta()
        //     .retain(100)                  // Keep 'Hello '
        //     // .delete(5)                  // 'World' is deleted
        //     .insert('Quill')
        //     .retain(1, { codeblock: true })  // Apply bold to exclamation mark
        // );
        // quill.format('code-block', true);

        // quill.getFormat(range: Range = current): { [String]: any }
        // getFormat(index: Number, length: Number = 0): { [String]: any }

    }
   
    render() {
        if(this.state.isVisible) {
            return (
                <DocumentBlockToolbarComponent 
                    id='toolbar2' 
                    top={this.state.posY} 
                    left={this.state.posX}
                    onActivateHandler={this.onActivateHandler}
                    codeBlockHandler={this.codeBlockHandler}
                    isVisible={this.state.isVisible}
                    isActive={this.state.isActive}
                    opacity={this.state.opacity}
                />
            )
        } else {
            return null;
        }
    }
}

// const mapStateToProps = (state, { match }) => ({
//     docId: workspaceNodesSelectors.getNodeContentIdById(state, match.params.documentId),
//     // workspaceNodes: getNodesListByWorkspace(state, match.params.workspaceId), // CHANGE SECOND ARG TO USE URI PARAM
//     userId: userSelectors.getUserId(state),
//     socketAuthState: websocketSelectors.getWebsocketAuthState(state),
//     deltas: websocketSelectors.getDeltas(state),
//     subscribedDocId: websocketSelectors.getSubscribedDocId(state),
//     isSubscribing: websocketSelectors.getIsSubscribingToDoc(state),
//     errorMessage: websocketSelectors.getErrorMessageWebsocket(state)
// })

// DocumentEditor = withRouter(connect(
//     mapStateToProps,
//     {
//         'fetchWorkspaceNodes': workspaceNodesOperations.fetchWorkspaceNodes,
//         'documentSubscribe': websocketOperations.documentSubscribe,
//         'documentUnsubscribe': websocketOperations.documentUnsubscribe,
//         'documentSubmitOp': websocketOperations.documentSubmitOp
//     }
// )(DocumentEditor));

export default DocumentBlockToolBarContainer;


import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import { workspaceNodesOperations, workspaceNodesSelectors } from '../duck/workspaceNodes'
import { websocketOperations, websocketSelectors } from '../duck/websocket'
import { userSelectors } from '../duck/user'
import DocumentEditorComponent from './DocumentEditorComponent'
import FetchErrorComponent from '../common/FetchErrorComponent';

var Quill = require('quill');

class DocumentEditor extends Component {

    constructor(props) {
        super(props);
        this.nextOpIndex = 0;   // TODO: Why isn't this state?
        this.state = {
            loadedInitContent: false
            // subscribing: false,
        }
    }

    componentDidMount() {
        var options = {
            debug: 'info',
            modules: {
                // toolbar: '#toolbar' // Replaces bubble toolbar...
                // toolbar: {
                //     container: '#toolbar2'
                // }
            },
            placeholder: 'Start writing...',
            readOnly: false,
            theme: 'bubble',
            // TODO: Caution, ommited formats are not enforced server side.
            // ommited are 'font', 'size', 'formula', 'image' and 'video'
            formats: ['background','bold','color','code','italic','link','strike','script','underline','blockquote','header','indent','list','align','direction','code-block']
          };

        this.quill = new Quill('#editor', options);
        this.quill.focus();


        // TODO: Don't really want to fetch all of the nodes, just this one. Need to do
        // this if user attempts to navigate to this page directly as workspaceNodes 
        // entities won't populate.
        this.props.fetchWorkspaceNodes(this.props.userId);
        console.log('Mount state: ', this.state.subscribing);
        if (!this.props.subscribedDocId && this.props.docId && !this.props.isSubscribing && this.props.socketAuthState) {
            // console.log('Component did mount', this.props.subscribedDocId);
            console.log('mount subscribe', this.state.subscribing);
            this.subscribeTo(this.props.docId);
            this.consumeNewDeltas();
        }

    }

    componentDidUpdate(prevProps) {
        console.log('Update state: ', this.state.subscribing);
        if (!this.props.subscribedDocId && this.props.docId && !this.props.isSubscribing && this.props.socketAuthState) {
            console.log('update subscribe', this.state.subscribing);
            // console.log('Component did update', this.props.subscribedDocId);
            this.subscribeTo(this.props.docId);
        }
        
        this.consumeNewDeltas();
        
        console.log('PHIL HERE', this.state.loadedInitContent, this.props.subscribedDocId)
        // Reset quills history AFTER having consumed inital deltas from server.
        
    }

    componentWillUnmount() {

        // TODO: All of the things.
        // Dispatch SHAREDB_DOC_UNSUBSCRIBE THINGY
        //  -> Remove subsribtions from redux
        // Kill quill history
        // All of the other things. 
        this.unsubscribe();
    }

    consumeNewDeltas() {
        while (this.nextOpIndex < this.props.deltas.length) {
            this.quill.updateContents(this.props.deltas[0]);
            this.nextOpIndex++;

            if(!this.state.loadedInitContent && this.props.subscribedDocId) {
                console.log('clear all of the deltas');
                this.quill.history.clear();
                this.setState({
                    loadedInitContent: true
                })
            }
            // TODO: Consider removing consumed deltas from the Redux store.
        }
    }

    submitOp(delta) {
        this.props.documentSubmitOp(delta);
    }

    unsubscribe() {
        if (this.props.subscribedDocId) {
            this.props.documentUnsubscribe();
        }

        // Stops the bug where switching documents would treat the replacement of the old
        // doc's content with the new doc as an entry in the quill history. Undoing an action
        // would cause the new doc's content to get replaced with the old. This must be called 
        // setContents as this is the action that gets added to the history log.
        // Because each document's history doesn't get saved, the user does lose the undo capability
        // should they switch documents. Essentially saving a 'snapshot' of the doc when they do so.
        // This is a user experience consideration to make. 
        this.quill.history.clear();
    }

    subscribeTo(docId) {

        // TODO: FOR SOME REASON WE ARE SUBSCRIBING TWICE WHEN LOADING ONTO DOCUMENT PAGE!!!!! 
        if (docId && this.props.socketAuthState) {
            console.log('lets subscribe')

            this.props.documentSubscribe(docId);

            // TODO: Stop trying to submit OP if websocket returns a failed document authentication.
            this.quill.on('text-change', function (delta, oldDelta, source) {
                if (source === 'api') {
                    console.log("An API call triggered this change.");
                    // this.submitOp(delta);x
                } else if (source === 'user') {
                    console.log("A user action triggered this change.");
                    // DISPATCH ACTION including delta.
                    this.submitOp(delta);

                }
            }.bind(this));
        }



        // if(this.props.shareWrapper) {
        //   console.log('shareWrapper', this.props.shareWrapper);
        //   var doc = this.props.shareWrapper.get('documents', 'richtext');

        //   console.log('Got wrapper', doc);



        // doc.subscribe(function(err) {
        // socket.send({data: 'Heres some text that the server is urgently awaiting!'});
        // console.log('YAAAY??');
        // if (err) {
        //     console.log(err); // handle the error
        // }
        // console.log('+++');
        // console.log(doc);
        // if (!doc.data) { // does not exist so we create the document and replace the code editor content by the document content
        //     // WE DON"T NEED THIS ANYMORE AS DOCS GET CREATED ON SERVER NOT HERE!
        //     console.log('Create new doc');
        //     // This needs to be rich-text else if fails to create new doc.
        //     doc.create({ insert: "Text" }, 'rich-text', function(err) {
        //         if(err) {
        //             console.log('Error in creating new doc.', err);
        //         }
        //     });

        // } else { // it exist, we set the code editor content to the latest document snapshot
        //     // code_editor.setValue(sharedb_doc.data);
        //     this.quill.setContents(doc.data);
        //     // Stops the bug where switching documents would treat the replacement of the old
        //     // doc's content with the new doc as an entry in the quill history. Undoing an action
        //     // would cause the new doc's content to get replaced with the old. This must be called 
        //     // setContents as this is the action that gets added to the history log.
        //     // Because each document's history doesn't get saved, the user does lose the undo capability
        //     // should they switch documents. Essentially saving a 'snapshot' of the doc when they do so.
        //     // This is a user experience consideration to make. 
        //     this.quill.history.clear();    
        // }

        // // this.enableEditor();
        // // we listen to the "op" event which will fire when a change in content (an operation) is applied to the document, "source" argument determinate the origin which can be local or remote (false)
        // doc.on('op', function(op, source) {
        //     if (source === false) { // we integrate the operation if it come from the server
        //       this.quill.updateContents(op);
        //     }
        // });
        // // }.bind(this));

        // doc.on('del', function(data, source) {
        //     console.log('ON DELETE COMING FROM SERVER');
        //     console.log('ON DELETE COMING FROM SERVER');
        //     console.log('ON DELETE COMING FROM SERVER');
        //     console.log(data);
        //     console.log(source);   
        // });

        // doc.on('create', function(data, source) {
        //     console.log('ON CREATE COMING FROM SERVER');
        //     console.log('ON CREATE COMING FROM SERVER');
        //     console.log('ON CREATE COMING FROM SERVER');
        //     console.log(data);
        //     console.log(source);   
        // });

        // this.quill.on('text-change', function(delta, oldDelta, source) {
        //     console.log('DOC CHANGE!!!');
        //     if(doc) {
        //         if (source === 'api') {
        //             console.log("An API call triggered this change.");
        //         } else if (source === 'user') {
        //             console.log(doc);
        //             console.log(delta.ops );
        //             doc.submitOp( delta );
        //             //socket.emit('pagesEvent', { event: 'UserSignedUp', data: { username: delta} });
        //             console.log("A user action triggered this change.");
        //         }
        //     }
        // });
        // });
        // }
        // this.props.fetchWorkspaceNodes(this.props.workspaceId);
    }

    render() {
        // const { match, history, workspaces, isFetching, errorMessage } = this.props;
        const { errorMessage, deltas } = this.props;

        // if(isFetching && !workspaceNodes.length) {
        //   return <p>Loading...</p>
        // }
        // if(errorMessage && !deltas.length) {
        if (errorMessage) {
            return (
                <FetchErrorComponent
                    message={errorMessage}
                // onRetry={() => this.fetchData()}
                />
            )
        }

        return (
            <DocumentEditorComponent {...this.props} quill={this.quill} />
        )
    }
}

const mapStateToProps = (state, { match }) => ({
    docId: workspaceNodesSelectors.getNodeContentIdById(state, match.params.documentId),
    // workspaceNodes: getNodesListByWorkspace(state, match.params.workspaceId), // CHANGE SECOND ARG TO USE URI PARAM
    userId: userSelectors.getUserId(state),
    socketAuthState: websocketSelectors.getWebsocketAuthState(state),
    deltas: websocketSelectors.getDeltas(state),
    subscribedDocId: websocketSelectors.getSubscribedDocId(state),
    isSubscribing: websocketSelectors.getIsSubscribingToDoc(state),
    errorMessage: websocketSelectors.getErrorMessageWebsocket(state)
})

DocumentEditor = withRouter(connect(
    mapStateToProps,
    {
        'fetchWorkspaceNodes': workspaceNodesOperations.fetchWorkspaceNodes,
        'documentSubscribe': websocketOperations.documentSubscribe,
        'documentUnsubscribe': websocketOperations.documentUnsubscribe,
        'documentSubmitOp': websocketOperations.documentSubmitOp
    }
)(DocumentEditor));

export default DocumentEditor;


import React from 'react'
import './css/quill.core.css';
import './css/quill.bubble.css';
import styled from 'styled-components'
import DocumentBlockToolbar from './DocumentBlockToolBarContainer';

export const EditorOverrider = styled.div`
    overflow: hidden;   /* Prevents block toolbar from causing second scrollbar to appear */
    position: relative; /* Prevents block toolbar from causing second scrollbar to appear */
    div {
        .ql-editor {

            height: 100vh;
            padding: 256px 0;
            font-size: 18px;

            h1, h2, h3, h4, h5, h6, p, blockquote, pre {
                max-width: 860px;
                margin: auto;
            }

            h1 {
                margin-bottom: 48px; 
                font-family: ${props => props.theme.font_family};
                font-size: ${props => props.theme.heading1_font_size};
                line-height: 1.2em;
            }

            h2 {
                margin-bottom: 24px;
                font-family: ${props => props.theme.font_family};
                font-size: ${props => props.theme.heading2_font_size}
            }

            p {
                font-family: 'Noto serif';
                font-size: inherit;
                margin-bottom: 32px;
                line-height: 1.8em;
            }

            blockquote {
                font-family: 'Noto serif';
                font-size: inherit;
                margin-bottom: 48px;
                line-height: 1.8em;
            }

            pre {
                margin-bottom: 48px;
                padding: 24px;
                border-radius: 4px;

                &.ql-syntax {
                    background-color: #F7F7F7;
                    border: 1px solid #CBCBCB;
                    color: #202020;
                }
            }

            /* Placeholder text */
            &.ql-blank {
                &:before {
                    max-width: 860px;
                    margin: auto;
                    font-size: 18px;
                    font-family: 'Noto serif';
                    line-height: 1.8em;
                }
            }
        }

    }
`

export const Editor = styled.div``

const DocumentEditorComponent = ({ workspaces, openWorkspace, quill, subscribedDocId }) => (
    <EditorOverrider>
        {/* {subscribedDocId &&
            <React.Fragment>
                <DocumentBlockToolbar quill={quill}/>
                
            </React.Fragment>
            
        } */}
        <Editor id='editor'/>
    </EditorOverrider>
)

export default DocumentEditorComponent
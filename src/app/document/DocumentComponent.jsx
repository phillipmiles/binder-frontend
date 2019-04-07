import React from 'react'
import { NavBar } from './../common';
import DocumentEditorContainer from './/DocumentEditorContainer';

function DocumentComponent({nodeId, documentTitle, parentNodeTitle, parentNodeId}) {
    return (
        <div>
            {/* <GlobalOverrideStyles backgroundColour={props => props.theme.color_background}/> */}
            <NavBar 
                backButtonLink={'/workspace/' + parentNodeId} 
                backButtonLabel={parentNodeTitle} 
                documentTitle={documentTitle}
            />
            <DocumentEditorContainer />
        </div>
    );
}

export default DocumentComponent;
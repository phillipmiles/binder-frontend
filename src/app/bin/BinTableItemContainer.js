import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { workspaceNodesSelectors } from '../duck/workspaceNodes'
import { uiOperations } from '../duck/ui'
import { binSelectors, binOperations } from './duck'

import IconSVG from '../common/IconSVG'
import { 
    TableItem, 
    TableItemContent, 
    TableItemHeading,
    TableItemLastEdited,
    TableItemMore,
    TableItemIcon,
    TableItemDragHoverIndicator,
    TableItemDebugBox
} from '../common/styles/NodesTable'
import BinTableGroupContainer from './BinTableGroupContainer'

class BinNodesTableItemContainer extends Component {
  constructor(props) {
    super(props);
    this.onClickItem = this.onClickItem.bind(this);
    this.openSettings = this.openSettings.bind(this);
  };
  
  toggleShowSubItems() {     
    if(this.props.isExpanded) { 
      this.props.collapseNode(this.props.nodeId);
    } else {
      this.props.expandNode(this.props.nodeId);
    }
  }

  onClickItem(props) {
    const { history, node } = this.props;

    // Pevent actioning when the user is clicking away from a renaming text field.
    if(!this.props.isEditing) {
      switch(node.type) {
        case 'workspace':
          // history.push("/workspace/" + node.id) // Should docs be made using the doc id or docs node id???
          // Need to show modal with error message.
          break;
        case 'subspace':
          this.toggleShowSubItems();
          // Need to show modal with error message.
          break;
        case 'document':
          // history.push("/document/" + node.id) // Should docs be made using the doc id or docs node id???
          // Need to show modal with error message.
          break;
        default:
          return null;
          break;
      }
    }
  }

  tableItemIcon() {
    const { node } = this.props;

    switch (node.type) {
        case 'subspace':
            return 'folder'
            break;
        case 'document':
            return 'file'
            break;
          case 'workspace':
            return 'book'
            break;
        default:
            return null;
            break;
    }
}

  openSettings(event) {
    const { history } = this.props;
    if(this.props.isEditing || this.props.isSubmitting) {
      return
    }
    event.preventDefault();
    event.stopPropagation();
    
    const eventX = event.clientX + 'px';
    const eventY = event.clientY + 'px';
    const { node } = this.props;

    var options = [
      {
        text: 'Move from bin',
        function: () => {
          // console.log('Move from bin')
          history.push("/wip") 
        }
      },
      {
        text: 'Delete permanently',
        function: () => {
          // console.log('Deleted permanently')
          history.push("/wip") 
        }
      }
    ];
    
    this.props.openDropDownMenu(eventX, eventY, options);
  }

  iconFill() {
    const { node } = this.props;
    if(node.type === 'subspace') {
      return true;
    }

    return false;
  }

  render = () => (
    
    <TableItemContent
        onClick={this.openSettings} 
        onContextMenu={this.openSettings}
    >   
        <TableItemIcon iconFill={this.iconFill()}>
            <IconSVG icon={this.tableItemIcon()}/>
        </TableItemIcon>
        
        <TableItemHeading>

          <React.Fragment>{this.props.node.title}</React.Fragment>
        </TableItemHeading>
                      
        {/* {this.lastEditedPhrase() && 
            <TableItemLastEdited>
                Last edited {this.lastEditedPhrase()}
            </TableItemLastEdited>
        } */}
                        
        <TableItemMore onClick={this.openSettings}>
            <IconSVG icon='more-horizontal'/>
        </TableItemMore>
        


        {/* {debug &&
            <TableItemDebugBox>
                <p><strong>Node id:</strong> {this.props.node.id}</p>
                <p><strong>Order:</strong> {this.props.node.order}</p>
                <p><strong>Index:</strong> {this.props.index}</p>
            </TableItemDebugBox>
        } */}
    </TableItemContent>
    // <BinTableGroupContainer 
    //           depth={props.depth}
    //           nodeId={props.node.id}
    //       />

  
    // <NestedDragItem 
    //   {...this.props} 
    //   onClickItem={this.onClickItem} 
    //   onClickItemContext={this.openSettings}
    //   onClickMore={this.openSettings}
    //   showChildrenNodes={this.props.isExpanded}
    //   tableItemIcon={this.tableItemIcon()}
    //   iconFill={this.iconFill()}
      
    //   NodeItemGroupComponent={BinTableGroupContainer}
    // />
  )
}

const mapStateToProps = (state, { nodeId }) => ({
  node: workspaceNodesSelectors.getNodeById(state, nodeId),  
  isExpanded: binSelectors.isBinTableItemExpanded(state, nodeId),
})

BinNodesTableItemContainer = withRouter(connect(
  mapStateToProps,
  { 
    'expandNode': binOperations.expandBinTableItem,
    'collapseNode': binOperations.collapseBinTableItem,
    'openDropDownMenu': uiOperations.openDropDownMenu
  }
)(BinNodesTableItemContainer));

export default BinNodesTableItemContainer;

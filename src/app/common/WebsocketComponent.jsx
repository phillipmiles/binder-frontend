import { Component } from 'react'
import { connect } from 'react-redux'
import { websocketOperations } from '../duck/websocket';
import { websocketSelectors } from '../duck/websocket'
import { userSelectors } from '../duck/user';

class WebsocketComponent extends Component {
  componentDidMount() {
    const { user, wsIsFetching } = this.props;

    if(user.isLoggedIn && !user.didInvalidate && !wsIsFetching) {
      console.log('mount WS')
      this.requestWebsocket();
    }
  }

  componentDidUpdate(prevProps) {
    const { user, websocketRequest, wsIsFetching } = this.props;
    
    // if (!this.props.subscribedDocId && this.props.docId && !this.props.isSubscribing && this.props.socketAuthState) {
    console.log('WEBSOCKET GUARD', user.isLoggedIn, user.didInvalidate, user.isFetching, websocketRequest, wsIsFetching)
    if(user.isLoggedIn && !user.didInvalidate && !user.isFetching && !websocketRequest && !wsIsFetching) {
      console.log('update WS', user.isFetching)
      this.requestWebsocket();
    }

    // if(websocketRequest && !websocket) {
    //   console.log('Clear to connect to ', websocketRequest.url)
    //   // const ws = new WebSocket(websocketRequest.url);
    //   // this.props.openWebsocket(ws);
    //   // this.props.setShareDBConnection();

    //   // this.props.connectWebsocket(websocketRequest.url)
  
    // }

    // if(websocket) {
    //   websocket.addEventListener('open', function (event) {
    //     console.log('connection state?', event);
    //     websocket.send('{ "type": "authToken", "token": "' + websocketRequest.token + '"}');

    //   });
    // }
  }

  componentWillUnmount() {
    
    // Websocket is closed cleanly from with the middleware.  
    
  }

  requestWebsocket() {
    console.log('Requesting websocket token');
    this.props.requestWebsocket();
  }

  render () {    
    return null;
  }
}

const mapStateToProps = state => ({ 
  user: userSelectors.getUser(state),
  wsIsFetching: websocketSelectors.getIsFetchingWebsocket(state),
  websocketRequest: websocketSelectors.getWebsocketRequest(state),
  websocket: websocketSelectors.getWebsocket(state)
})

WebsocketComponent = connect(
  mapStateToProps,
  { 
    'requestWebsocket': websocketOperations.requestWebsocket, 
    // 'writeToSocket': writeToSocket
  }
)(WebsocketComponent)

export default WebsocketComponent;

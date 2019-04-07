
import React, { Component } from 'react';
import { connect } from 'react-redux'
import { 
    Router, 
    Route, 
    // Link,
    Switch,
    // Redirect 
} from 'react-router-dom'
import { TransitionGroup, CSSTransition } from "react-transition-group";

import history from './utils/history'

// import Views from './components/Routes/Routes.jsx';
import { Home } from './app/home';
import { Register } from './app/register';
import { Login } from './app/login';
import { Dashboard } from './app/dashboard';
import { Workspace } from './app/workspace';
import { Document } from './app/document';
import { Bin } from './app/bin';
import { WorkInProgress } from './app/wip';

import { PrivateRoute, PublicRoute, Websocket, DropDownMenu } from './app/common';

import { uiSelectors } from './app/duck/ui';

// const routesData = [
//     {
//       path: "/",
//       exact: true,
//       sidebar: () => <div>home!</div>,
//       main: () => <h2>Home</h2>
//     },
//     {
//       path: "/bubblegum",
//       sidebar: () => <div>bubblegum!</div>,
//       main: () => <h2>Bubblegum</h2>
//     },
//     {
//       path: "/shoelaces",
//       sidebar: () => <div>shoelaces!</div>,
//       main: () => <h2>Shoelaces</h2>
//     }
// ];

class RoutesComponent extends Component {
    
    state = {
        loading: true
    };

    componentDidMount() {
        // simulates an async action, and hides the spinner
        // setTimeout(() => this.setState({ loading: false }), 1500); 

        // Move this into App or middleware? to pause rendering until user is 
        // either fetched from store or API call.

        // TODO: Can't this get passed from the server when serving this html page?
        // console.log('REDUX STATE: ', Store.getState())
        // if(Store.getState().user) {
        //     this.setState({ loading: false })
        // } else {
        //     // fetch user from session.
        //     this.setState({ loading: false })
        // }
    }

    render () {
        // let { loading } = this.state;
        // if (loading) {
        //     return <h1>Loading</h1>;
        // } else {
            return (
                <Router history={history} >
                    <div className="content">
                        {/* This Route does nothing but expose the location object */}
                        <Route render={({ location, history }) => ( 
                            // <TransitionGroup>
                            //     <CSSTransition
                            //         key={location.pathname}
                            //         classNames="fade"
                            //         timeout={0}
                            //         >
                                    // {/* <React.Fragment> */}
                                        <Switch location={location}>
                                            <PublicRoute exact path="/" component={Login} />
                                            <PublicRoute exact path="/register" component={Register} />
                                            <PublicRoute exact path="/login" component={Login} />
                                            {/* <PublicRoute exact path="/WorkInProgress" component={WorkInProgress} /> */}
                                            <PrivateRoute exact path="/dashboard" component={Dashboard} />
                                            <PrivateRoute exact path="/workspace/:workspaceId" component={Workspace} />
                                            <PrivateRoute exact path="/document/:documentId" component={Document} />
                                            <PrivateRoute exact path="/bin" component={Bin} />
                                            <Route path="/" component={WorkInProgress} history={history} />
                                        </Switch>
                                        
                                    // {/* </React.Fragment> */}
                            //     </CSSTransition>
                            // </TransitionGroup>
                        )}/>
                        <Websocket />
                        {this.props.dropDownObj &&
                            <DropDownMenu />
                        }
                    </div>
                </Router>
            );
        // }
    }
}


const mapStateToProps = state => ({
    dropDownObj: uiSelectors.getDropDownObj(state)
})

const Routes = connect(
    mapStateToProps,
)(RoutesComponent)

export default Routes
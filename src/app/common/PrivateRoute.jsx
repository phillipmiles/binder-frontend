import React, { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'
import { userSelectors } from '../duck/user'

class PrivateRoute extends Component {
    render() {
        const { component: Component, user, ...rest } = this.props
            return (
                <Route {...rest} render={props => (
                    user.didInvalidate ? (
                        <Redirect to={{
                            pathname: '/login',
                            state: { from: props.location }
                        }}/>
                    ) : (
                        <Component {...props}/>
                    )
                )}/>
            )
        }
  }

  

const mapStateToProps = state => ({
    user: userSelectors.getUser(state)
})
  
PrivateRoute = connect(
    mapStateToProps
)(PrivateRoute)


  export default PrivateRoute;
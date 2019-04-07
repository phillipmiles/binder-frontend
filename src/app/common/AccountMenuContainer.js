import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import AccountMenuComponent from './AccountMenuComponent.jsx'
import { uiOperations, uiSelectors } from '../duck/ui';
import { userOperations, userSelectors } from '../duck/user';


class AccountMenuContainer extends Component {
    constructor(props) {
        super(props);
        this.onClickAccount = this.onClickAccount.bind(this);
    };

    onClickAccount = (event) => {

        event.preventDefault();
        event.stopPropagation();
        
        if(this.props.isExpanded) {
            window.removeEventListener("click", this.handleWindowClick);
            this.props.closeNavAccountMenu();
        } else {
            window.addEventListener("click", this.handleWindowClick);
            this.props.openNavAccountMenu();
        }
    }

    handleWindowClick = () => {
        this.props.closeNavAccountMenu();
    }

    onClickAccountSettings = (event) => {
        const { history } = this.props;
        history.push("/account") 
    }
    
    onClickTrash  = (event) => {
        const { history } = this.props;

        history.push("/bin") 
    }
    
    logOff = (event) => {
        const { history } = this.props;
        this.props.userLogout();
    }


    render = () => (
        <AccountMenuComponent 
          {...this.props} 
          onClickAccount={this.onClickAccount}
          onClickAccountSettings={this.onClickAccountSettings}
          onClickTrash={this.onClickTrash}
          logOff={this.logOff}
        />
    );
}

const mapStateToProps = state => ({
    user: userSelectors.getUser(state).data,
    isExpanded: uiSelectors.isNavAccountMenuOpen(state)
})

AccountMenuContainer = withRouter(connect(
    mapStateToProps,
    {
        'openNavAccountMenu': uiOperations.openNavAccountMenu,
        'closeNavAccountMenu': uiOperations.closeNavAccountMenu,
        'userLogout': userOperations.userLogout
    }
)(AccountMenuContainer));

export default AccountMenuContainer;
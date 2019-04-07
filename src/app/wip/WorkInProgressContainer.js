import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom';
import WorkInProgressComponent from './WorkInProgressComponent'


class WorkInProgressContainer extends Component {


    constructor(props) {
        super(props);
        this.onClickBack = this.onClickBack.bind(this);
    }

    onClickBack(e) {
        e.preventDefault();
        
        this.props.history.goBack();
    }

    render() {
        // const { from } = this.props.location.state || { from: { pathname: '/' } }
        // console.log('from', this.props.history.goBack())
        return (
            <WorkInProgressComponent 
                onClickBack={this.onClickBack}
            />
        )
    }
}



// WorkInProgressContainer = connect()(WorkInProgressComponent)

export default WorkInProgressContainer;

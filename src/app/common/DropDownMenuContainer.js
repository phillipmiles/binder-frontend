import { connect } from 'react-redux'
import React, { Component } from 'react'
import DropDownMenuComponent from './DropDownMenuComponent.jsx'
import { uiSelectors } from '../duck/ui';
import { uiOperations } from '../duck/ui';


class DropDownMenuContainer extends Component {
    constructor(props) {
        super(props);
        this.handleWindowCick = this.handleWindowCick.bind(this);
    };

    
    componentDidMount() {
        window.addEventListener("click", this.handleWindowCick);
    }

    componentWillUnmount() {
        window.removeEventListener("click", this.handleWindowCick);
    }

    handleWindowCick(event) {        
        // WARN: Does not check if window click occurs over the drop down or not.
        // This means ANY click ANYWHERE will cause the dropdown to close.
        this.props.closeDropDownMenu();
    }
    
    calcPosX() {
        return parseInt(this.props.dropDownObj.x, 10) + window.scrollX - 24 + 'px';
    }

    calcPosY() {
        return parseInt(this.props.dropDownObj.y, 10) + window.scrollY + 10 + 'px';
    }

    render() {
        const {closeDropDownMenu, dropDownObj} = this.props;
        return (<DropDownMenuComponent 
            closeDropDownMenu={closeDropDownMenu} 
            options={dropDownObj.options}
            posX={this.calcPosX()}
            posY={this.calcPosY()}
        />);
    }
}

const mapStateToProps = state => ({
    dropDownObj: uiSelectors.getDropDownObj(state)
})
        
DropDownMenuContainer = connect(
    mapStateToProps,
    { 'closeDropDownMenu': uiOperations.closeDropDownMenu }

)(DropDownMenuContainer)

export default DropDownMenuContainer;




// reducers.js
import { combineReducers } from 'redux'
import types from './types';
import { pull, union } from 'lodash';

const showModal = (state = false, action) => {
    switch (action.type) {
        case types.UI_OPEN_MODAL:
            return true;
        case types.UI_CLOSE_MODAL:
            return false;
        default:
            return state;
    }
};

const modalActions = (state = null, action) => {
    switch (action.type) {
        case types.UI_OPEN_MODAL:
            return action.modalActions;
        case types.UI_CLOSE_MODAL:
            return null;
        default:
            return state;
    }
};

const modalTitle = (state = null, action) => {
    switch (action.type) {
        case types.UI_OPEN_MODAL:
            return action.title;
        case types.UI_CLOSE_MODAL:
            return null;
        default:
            return state;
    }
};

const modalContent = (state = null, action) => {
    switch (action.type) {
        case types.UI_OPEN_MODAL:
            return action.content;
        case types.UI_CLOSE_MODAL:
            return null;
        default:
            return state;
    }
};

const dragInitialClickPos = (state = null, action) => {
    switch (action.type) {
        case types.UI_DRAGGING_ELEM__START:
            return action.initialClickPos
        case types.UI_DRAGGING_ELEM__STOP:
            return null
        default:
            return state;
    }
}

const dragChildPosOffset = (state = null, action) => {
    switch (action.type) {
        case types.UI_DRAGGING_ELEM__START:
            return action.childPosOffset
        case types.UI_DRAGGING_ELEM__STOP:
            return null
        default:
            return state;
    }
}


const dropDownMenu = (state = null, action) => {
    switch (action.type) {
        case types.UI_DROP_DOWN_MENU__OPEN:
            return {
                x: action.x,
                y: action.y,
                options: action.options
            }
        case types.UI_DROP_DOWN_MENU__CLOSE:
            return null;
        default:
            return state;
    }
}

const showNavAccountMenu = (state = false, action) => {
    switch (action.type) {
        case types.UI_NAV_ACCOUNT_MENU__OPEN:
            return true
        case types.UI_NAV_ACCOUNT_MENU__CLOSE:
            return false;
        default:
            return state;
    }
}

const uiReducer = combineReducers({
    showModal,
    dragInitialClickPos,
    dragChildPosOffset,
    dropDownMenu,
    showNavAccountMenu
});


export default uiReducer;
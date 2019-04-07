
// actions.js
import types from './types.js';

function openModal(title, content, actions) {
    return { 
        type: types.UI_OPEN_MODAL,
        title: title,
        content: content,
        modalActions: actions
    }
}

function closeModal(title, content, actions) {
    return { type: types.UI_CLOSE_MODAL }
}

function startDraggingElem(initialClickPos, childPosOffset) {
    return { 
        type: types.UI_DRAGGING_ELEM__START,
        initialClickPos: {
            x: initialClickPos.x,
            y: initialClickPos.y
        },
        childPosOffset: {
            x: childPosOffset.x,
            y: childPosOffset.y
        } 
    }
}

function stopDraggingElem(nodeId) {
    return { 
        type: types.UI_DRAGGING_ELEM__STOP,
        nodeId: nodeId,
    }
}


// TODO: For some reason calling this action or the close action when viewing a 
// workspaces documents table causes all visible table items to rerender...
function openDropDownMenu(x, y, options) { 
    return { 
        type: types.UI_DROP_DOWN_MENU__OPEN,
        x,
        y,
        options
    }
}
function closeDropDownMenu() { return { type: types.UI_DROP_DOWN_MENU__CLOSE }}


function openNavAccountMenu() { return { type: types.UI_NAV_ACCOUNT_MENU__OPEN }}
function closeNavAccountMenu() { return { type: types.UI_NAV_ACCOUNT_MENU__CLOSE }}


export default {
    openModal,
    closeModal,
    startDraggingElem,
    stopDraggingElem,
    openDropDownMenu,
    closeDropDownMenu,
    openNavAccountMenu,
    closeNavAccountMenu
}
// operations.js
// operations, thunks, sagas, epics, etc (essentially just more action creators.)
import Creators from './actions';


const openModal = Creators.openModal;
const closeModal = Creators.closeModal;
const startDraggingElem = Creators.startDraggingElem;
const stopDraggingElem = Creators.stopDraggingElem;
const openDropDownMenu = Creators.openDropDownMenu;
const closeDropDownMenu = Creators.closeDropDownMenu;
const openNavAccountMenu = Creators.openNavAccountMenu;
const closeNavAccountMenu = Creators.closeNavAccountMenu;
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
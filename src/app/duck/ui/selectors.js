// selectors.js

const getDropDownObj = (state) => state.ui.dropDownMenu;

const isNavAccountMenuOpen = (state) => state.ui.showNavAccountMenu;

const getDragInitialClickPos = (state) => state.ui.dragInitialClickPos;
const getDragChildPosOffset = (state) => state.ui.dragChildPosOffset;

export default {
    getDropDownObj,
    isNavAccountMenuOpen,
    getDragInitialClickPos,
    getDragChildPosOffset
};
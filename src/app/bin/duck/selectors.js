// selectors.js
const isBinTableItemExpanded = (state, nodeId) => {
    if(state.bin.binTableItemsExpanded.indexOf(nodeId) >= 0) {
        return true;
    }
    return false;
}


export default {
    isBinTableItemExpanded
}



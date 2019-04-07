// reducers.js
import { combineReducers } from 'redux'
import types from './types';
import { pull, union } from 'lodash';

const binTableItemsExpanded = (state = [], action) => {
    switch (action.type) {
        case types.UI_BIN_TABLE_ITEM__EXPAND:
            return union(state, [action.nodeId]);
        case types.UI_BIN_TABLE_ITEM__COLLAPSE:
            return pull([...state], action.nodeId);
        default:
            return state;
    }
};




const binReducer = combineReducers({
    binTableItemsExpanded
});

export default binReducer;
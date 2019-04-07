// reducers.js
import { combineReducers } from 'redux'
import merge from 'lodash/merge'
import { workspacesTypes } from '../../dashboard/duck';

import workspaceNodesReducer from '../workspaceNodes';

const entitiesReducer = combineReducers({
    workspaceNodes: workspaceNodesReducer
});

export default entitiesReducer;
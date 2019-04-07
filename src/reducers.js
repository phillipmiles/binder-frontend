import { combineReducers } from 'redux';
import merge from 'lodash/merge'

import workspacesReducers from './app/dashboard/duck';
import binReducers from './app/bin/duck';
import workspaceDocumentsReducers from './app/workspace/duck';
import userRegisterReducers from './app/register/duck';
import commonReducers from './app/duck';

const rootReducer = combineReducers(
    merge({
        workspaces: workspacesReducers,
        bin: binReducers,
        workspaceDocuments: workspaceDocumentsReducers,
        userRegister: userRegisterReducers
    }, 
    commonReducers,
));

export default rootReducer;
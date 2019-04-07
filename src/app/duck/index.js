import userReducer from './user'
import entitiesReducer from './entities'
import websocketReducer from './websocket'
import uiReducer from './ui'

export default {
    entities: entitiesReducer,
    user: userReducer,
    websocket: websocketReducer,
    ui: uiReducer
};
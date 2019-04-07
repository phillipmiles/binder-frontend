import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import websocketShared from '../middleware/websocketShared/index.js'
// import promise from 'redux-promise'
// import websocket from '@samuelcastro/redux-websocket'
import { createStore, applyMiddleware } from 'redux'
// import rootReducer from './../reducers'
import rootReducer from '../reducers.js'
// LOCAL STORAGE https://egghead.io/lessons/javascript-redux-persisting-the-state-to-the-local-storage
// TODO: Consider using react-persist npm module to handle this instead
// of my own code.
import { loadState, saveState } from './localStorage'
import throttle from 'lodash/throttle';

// const loggerMiddleware = createLogger()

// const socketMiddleware = createWebsocketMiddleware({
//     defaultEndpoint: 'ws://127.0.0.1:5000'
// })

console.log('root reducer', rootReducer)
const configureStore = () => {

    const persistedState = loadState();
    const middlewares = [thunkMiddleware, websocketShared];

    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger());
    }

    const store = createStore(
        rootReducer,
        persistedState,
        applyMiddleware(...middlewares) 
    )

    // Throttle is used to prevent writting to local storage for
    // EVERY change made to the store. Instead it will only do it
    // after at most every second. react-persist may have a better
    // way of doing this.
    store.subscribe(throttle(() => {
        saveState({
            user: store.getState().user
        });
    }, 1000));

    return store;
}

export default configureStore;
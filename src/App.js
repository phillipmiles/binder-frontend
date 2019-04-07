import React, { Component } from 'react'
// import './App.css';

import configureStore from './stores/appStore.js';
import { Provider } from 'react-redux';
import Routes from './Routes.jsx';

import { ThemeProvider } from 'styled-components'
import { theme, GlobalStyle } from './styles';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
// import TouchBackend from 'react-dnd-touch-backend';
// import logo from './logo.svg';

const store = configureStore();

export default class App extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
            <React.Fragment>
                <GlobalStyle />
                <Provider store={store}>
                    <DragDropContextProvider backend={HTML5Backend}>
                    {/* <DragDropContextProvider backend={TouchBackend}> */}
                        <Routes/>
                    </DragDropContextProvider>
                    
                </Provider>
            </React.Fragment>
            </ThemeProvider>
        )
    }
}
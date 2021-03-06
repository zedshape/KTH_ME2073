import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from "react-router-dom";
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-chat-elements/dist/main.css';
import './Styles/index.css';

import App from './App';
import * as serviceWorker from './serviceWorker';
// import configureStore from './Store/configureStore';
import rootReducer from './Reducers/Index';


const store = configureStore();


render(
    <Provider store={store}>
        <BrowserRouter >
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
serviceWorker.register();

function configureStore() {
    return createStore(
      rootReducer,
      applyMiddleware(thunk)
      );
  }
import React from 'react';

import ReactDOM from 'react-dom/client';

import './styles/index.css';

import App from './App';

import thunk from 'redux-thunk';

import reportWebVitals from './reportWebVitals';

import { createStore, applyMiddleware, compose } from 'redux';

import rootReducer from './store/reducers/index';

import { Provider } from 'react-redux';

// Redux Setup
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)))

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(

  <React.StrictMode>

    <Provider store={store}>

      <App />

    </Provider>

  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';

import { BrowserRouter as Router } from 'react-router-dom';

import Message from './controllers/Messages/Message';

import GlobalStyles from './components/general/GlobalStyles';

import store from './store/store';

import { Provider } from 'react-redux';

import ReactDOM from 'react-dom/client';

import App from './App';

import reportWebVitals from './reportWebVitals';


const root = ReactDOM.createRoot(

  document.getElementById('root') as HTMLElement

);

root.render(

  <React.StrictMode>

    <Provider store={store}>

      <Router>

        <GlobalStyles />

        <App />

        <Message />

      </Router>

    </Provider>

  </React.StrictMode>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reducers from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';
import './App.css';





ReactDOM.render(<BrowserRouter><App/></BrowserRouter> , document.querySelector('#root'));

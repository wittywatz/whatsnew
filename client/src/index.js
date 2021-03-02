import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
// import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'tachyons';

import App from './App';
import 'jquery/dist/jquery.js';
import 'popper.js/dist/umd/popper.js';

import reducers from '../src/redux/reducers';
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk];
if (process.env.NODE_ENV === 'development') {
  middleware.push(logger);
}
export const store = createStore(
  reducers,
  {},
  composeEnhancers(applyMiddleware(...middleware))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

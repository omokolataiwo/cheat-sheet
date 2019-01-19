import React from 'react';
import ReactDOM from 'react-dom';
import jwt from 'jsonwebtoken';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize';
import 'rc-tooltip/assets/bootstrap_white.css';
import App from './App';
import configureStore from './store';
import './style.css';
import { fetchAllCategoriesWithCheats } from './actions/cheat';
import { SIGNIN_SUCCESSFUL, INITIAL_USER_STATE } from './actions/type';

const store = configureStore();
const token = localStorage.getItem('token');

store.dispatch(fetchAllCategoriesWithCheats());

if (token) {
  store.dispatch({ type: SIGNIN_SUCCESSFUL, user: jwt.decode(token) });
  store.dispatch({ type: INITIAL_USER_STATE });
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Route path="/" component={App} />
    </BrowserRouter>
  </Provider>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept();
}

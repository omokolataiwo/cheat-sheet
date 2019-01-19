import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeart, faBars } from '@fortawesome/free-solid-svg-icons';
import Home from './components/pages/Home';
import AuthUser from './components/pages/AuthUser';
import NavigationBar from './components/container/NavigationBar';
import { logout } from './actions/user';

library.add(faHeart, faBars);

export class App extends Component {
  state = {};

  render() {
    const {
      logout,
      history: { push }
    } = this.props;

    return (
      <div>
        <NavigationBar adminBar={!!localStorage.getItem('token')} />
        <Switch>
          <Route path="/home" component={Home} />
          <Route path="/user" component={AuthUser} />
          <Route
            path="/logout"
            component={() => {
              logout();
              push('/home');
              return null;
            }}
          />
          <Redirect to="/home" />
        </Switch>
      </div>
    );
  }
}

export default connect(
  ({ user }) => ({ user }),
  { logout }
)(App);

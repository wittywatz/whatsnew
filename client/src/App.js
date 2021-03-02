import React, { Component } from 'react';

import { Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Header from './pages/Header/Header';
import Landing from './pages/Landing/Landing';
import './App.css';
import Footer from './pages/Footer/Footer';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Dashboard from './pages/Dashboard/Dashboard';

import { currentUser } from '../src/redux/selectors/userSelector';
import { Usertoken } from './redux/actions';
import CreateProfile from './pages/CreateProfile/CreateProfile';
console.log(localStorage.jwtToken);
class App extends Component {
  async componentDidMount() {
    await this.props.Usertoken(this.props.history);
  }
  render() {
    return (
      <div className="App">
        <Header />

        <Route
          exact
          path={'/'}
          render={() =>
            this.props.currentUser && this.props.currentUser ? (
              <Redirect to="/dashboard" />
            ) : (
              <Landing />
            )
          }
        />
        <Route
          exact
          path={'/register'}
          render={() =>
            this.props.currentUser ? <Redirect to="/dashboard" /> : <Register />
          }
        />
        <Route
          exact
          path={'/login'}
          render={() =>
            this.props.currentUser ? <Redirect to="/dashboard" /> : <Login />
          }
        />
        <div
          style={{ marginLeft: '0', marginRight: '0' }}
          className="pt-2 pb-5 mt-3"
        >
          <Route
            path={'/dashboard'}
            render={() =>
              !this.props.currentUser ? <Redirect to="/" /> : <Dashboard />
            }
          />
          <Route
            path={'/create_profile'}
            render={() =>
              !this.props.currentUser ? <Redirect to="/" /> : <CreateProfile />
            }
          />
        </div>

        <Footer />
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  currentUser,
});

export default connect(mapStateToProps, { Usertoken })(withRouter(App));

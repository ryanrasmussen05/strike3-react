import React from 'react';
import * as firebase from 'firebase/app';
import './App.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Header from './components/header/Header';
import { setLoggedInUserAction } from './redux/actions/auth.actions';
import PlayerPage from './components/pages/player/PlayerPage';
import AdminPage from './components/pages/admin/AdminPage';

class App extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.setLoggedInUser(user);
    });
  }

  render() {
    return (
      <BrowserRouter>
        <Header />
        <Switch>
          <Route path="/player" component={ PlayerPage } />
          <Route path="/admin" component={ AdminPage } />
          <Redirect from="*" to="/player" />
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  setLoggedInUser: PropTypes.func,
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
  setLoggedInUser: user => dispatch(setLoggedInUserAction(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

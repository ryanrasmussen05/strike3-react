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
import LoadingIndicator from './components/loading/LoadingIndicator';
import { selectGlobalLoading } from './redux/selectors/global.selectors';

class App extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.setLoggedInUser(user);
    });
  }

  render() {
    return (
      <BrowserRouter>
        { this.props.globalLoading && <LoadingIndicator /> }

        <div className="header-container">
          <Header />
        </div>

        <div className="page-container">
          <Switch>
            <Route path="/player" component={ PlayerPage } />
            <Route path="/admin" component={ AdminPage } />
            <Redirect from="*" to="/player" />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  globalLoading: PropTypes.bool,
  setLoggedInUser: PropTypes.func,
};

const mapStateToProps = state => ({
  globalLoading: selectGlobalLoading(state),
});

const mapDispatchToProps = dispatch => ({
  setLoggedInUser: user => dispatch(setLoggedInUserAction(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

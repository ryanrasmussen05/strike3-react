import React from 'react';
import * as firebase from 'firebase/app';
import './App.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from './components/header/Header';
import { setLoggedInUserAction } from './redux/actions/auth.actions';

class App extends React.Component {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(user => {
      this.props.setLoggedInUser(user);
    });
  }

  render() {
    return (
      <div>
        <Header />
      </div>
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

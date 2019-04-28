import React from 'react';
import './Header.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import LoginModal from '../modals/loginModal/LoginModal';
import { showLoginModalAction } from '../../redux/actions/modal.actions';

class Header extends React.Component {

  showLoginModal = () => {
    this.props.showLoginModal(true);
  };

  render() {
    return (
      <div className="header">
        Strike 3
        <Button type="primary" onClick={ this.showLoginModal }>Log In</Button>
        <LoginModal />
      </div>
    );
  }
}

Header.propTypes = {
  showLoginModal: PropTypes.func,
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
  showLoginModal: shouldShow => dispatch(showLoginModalAction(shouldShow)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

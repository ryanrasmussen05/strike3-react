import React from 'react';
import './Header.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Dropdown, Icon, Menu } from 'antd';
import LoginModal from '../modals/loginModal/LoginModal';
import CreateAccountModal from '../modals/createAccountModal/CreateAccountModal';
import ResetPasswordModal from '../modals/resetPasswordModal/ResetPasswordModal';
import { showLoginModalAction } from '../../redux/actions/modal.actions';
import {
  selectShowCreateAccountModal,
  selectShowLoginModal,
  selectShowResetPasswordModal,
} from '../../redux/selectors/modal.selectors';
import { selectLoggedInUser } from '../../redux/selectors/auth.selectors';
import { signOutAction } from '../../redux/actions/auth.actions';
import { Link, withRouter } from 'react-router-dom';
import { selectIsAdmin } from '../../redux/selectors/admin.selectors';

class Header extends React.Component {

  showLoginModal = () => {
    this.props.showLoginModal(true);
  };

  signOut = () => {
    this.props.signOut();
  };

  renderAuthButton = () => {
    let routeLink;

    if (this.props.isAdmin) {
      if (this.props.location && this.props.location.pathname === '/player') {
        routeLink = <Menu.Item><Link to="/admin">Admin</Link></Menu.Item>;
      } else {
        routeLink = <Menu.Item><Link to="/player">Home</Link></Menu.Item>;
      }
    }

    if (this.props.loggedInUser) {
      const menu = (
        <Menu>
          { routeLink }
          <Menu.Item onClick={ this.signOut }>Sign Out</Menu.Item>
        </Menu>
      );

      return (
        <Dropdown overlay={ menu } trigger={ ['click'] }>
          <div className="user-dropdown">
            <span>{ this.props.loggedInUser.displayName }</span>
            <Icon type="down" style={ { fontSize: 16 } } />
          </div>
        </Dropdown>
      );
    } else {
      return (
        <Button type="primary" onClick={ this.showLoginModal }>Sign In</Button>
      );
    }
  };

  renderLoginModal = () => {
    if (this.props.shouldShowLoginModal) {
      return <LoginModal />;
    }
  };

  renderCreateAccountModal = () => {
    if (this.props.shouldShowCreateAccountModal) {
      return <CreateAccountModal />;
    }
  };

  renderResetPasswordModal = () => {
    if (this.props.shouldShowResetPasswordModal) {
      return <ResetPasswordModal />;
    }
  };

  render() {
    return (
      <div className="header">
        Strike 3
        { this.renderAuthButton() }
        { this.renderLoginModal() }
        { this.renderCreateAccountModal() }
        { this.renderResetPasswordModal() }
      </div>
    );
  }
}

Header.propTypes = {
  location: PropTypes.object,
  loggedInUser: PropTypes.object,
  isAdmin: PropTypes.bool,
  shouldShowLoginModal: PropTypes.bool,
  shouldShowCreateAccountModal: PropTypes.bool,
  shouldShowResetPasswordModal: PropTypes.bool,
  signOut: PropTypes.func,
  showLoginModal: PropTypes.func,
};

const mapStateToProps = state => ({
  loggedInUser: selectLoggedInUser(state),
  isAdmin: selectIsAdmin(state),
  shouldShowLoginModal: selectShowLoginModal(state),
  shouldShowCreateAccountModal: selectShowCreateAccountModal(state),
  shouldShowResetPasswordModal: selectShowResetPasswordModal(state),
});

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOutAction()),
  showLoginModal: shouldShow => dispatch(showLoginModalAction(shouldShow)),
});

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));

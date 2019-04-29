import React from 'react';
import './Header.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button, Dropdown, Icon, Menu } from 'antd';
import LoginModal from '../modals/loginModal/LoginModal';
import CreateAccountModal from '../modals/createAccountModal/CreateAccountModal';
import { showLoginModalAction } from '../../redux/actions/modal.actions';
import { selectShowCreateAccountModal, selectShowLoginModal } from '../../redux/selectors/modal.selectors';
import { selectLoggedInUser } from '../../redux/selectors/auth.selectors';
import { signOutAction } from '../../redux/actions/auth.actions';

class Header extends React.Component {

  showLoginModal = () => {
    this.props.showLoginModal(true);
  };

  signOut = () => {
    this.props.signOut();
  };

  renderAuthButton = () => {
    if (this.props.loggedInUser) {
      const menu = (
        <Menu>
          <Menu.Item onClick={ this.signOut }>Sign Out</Menu.Item>
        </Menu>
      );

      return (
        <Dropdown overlay={ menu } trigger={ ['click'] }>
          <div className="user-dropdown">
            <span>{this.props.loggedInUser.displayName}</span>
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

  render() {
    return (
      <div className="header">
        Strike 3
        { this.renderAuthButton() }
        { this.renderLoginModal() }
        { this.renderCreateAccountModal() }
      </div>
    );
  }
}

Header.propTypes = {
  loggedInUser: PropTypes.object,
  shouldShowLoginModal: PropTypes.bool,
  shouldShowCreateAccountModal: PropTypes.bool,
  signOut: PropTypes.func,
  showLoginModal: PropTypes.func,
};

const mapStateToProps = state => ({
  loggedInUser: selectLoggedInUser(state),
  shouldShowLoginModal: selectShowLoginModal(state),
  shouldShowCreateAccountModal: selectShowCreateAccountModal(state),
});

const mapDispatchToProps = dispatch => ({
  signOut: () => dispatch(signOutAction()),
  showLoginModal: shouldShow => dispatch(showLoginModalAction(shouldShow)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

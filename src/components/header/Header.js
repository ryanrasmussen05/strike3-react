import React from 'react';
import './Header.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import LoginModal from '../modals/loginModal/LoginModal';
import CreateAccountModal from '../modals/createAccountModal/CreateAccountModal';
import { showLoginModalAction } from '../../redux/actions/modal.actions';
import { selectShowCreateAccountModal, selectShowLoginModal } from '../../redux/selectors/modal.selectors';

class Header extends React.Component {

  showLoginModal = () => {
    this.props.showLoginModal(true);
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
        <Button type="primary" onClick={ this.showLoginModal }>Sign In</Button>
        { this.renderLoginModal() }
        { this.renderCreateAccountModal() }
      </div>
    );
  }
}

Header.propTypes = {
  shouldShowLoginModal: PropTypes.bool,
  shouldShowCreateAccountModal: PropTypes.bool,
  showLoginModal: PropTypes.func,
};

const mapStateToProps = state => ({
  shouldShowLoginModal: selectShowLoginModal(state),
  shouldShowCreateAccountModal: selectShowCreateAccountModal(state),
});

const mapDispatchToProps = dispatch => ({
  showLoginModal: shouldShow => dispatch(showLoginModalAction(shouldShow)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

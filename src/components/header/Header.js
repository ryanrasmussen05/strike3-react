import React from 'react';
import './Header.scss';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import LoginModal from '../modals/loginModal/LoginModal';
import { showLoginModalAction } from '../../redux/actions/modal.actions';
import { selectShowLoginModal } from '../../redux/selectors/modal.selectors';

class Header extends React.Component {

  showLoginModal = () => {
    this.props.showLoginModal(true);
  };

  renderLoginModal = () => {
    if (this.props.shouldShowLoginModal) {
      return <LoginModal />;
    }
  };

  render() {
    return (
      <div className="header">
        Strike 3
        <Button type="primary" onClick={ this.showLoginModal }>Sign In</Button>
        { this.renderLoginModal() }
      </div>
    );
  }
}

Header.propTypes = {
  shouldShowLoginModal: PropTypes.bool,
  showLoginModal: PropTypes.func,
};

const mapStateToProps = state => ({
  shouldShowLoginModal: selectShowLoginModal(state),
});

const mapDispatchToProps = dispatch => ({
  showLoginModal: shouldShow => dispatch(showLoginModalAction(shouldShow)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

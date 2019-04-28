import React from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectShowLoginModal } from '../../../redux/selectors/modal.selectors';
import { showLoginModalAction } from '../../../redux/actions/modal.actions';

class LoginModal extends React.Component {

  closeModal = () => {
    this.props.closeModal();
  };

  render() {
    return (
      <Modal
        title="Log In"
        visible={ this.props.shouldShowModal }
        onCancel={ this.closeModal }
        footer={ null }
      >
        <p>This is the modal</p>
      </Modal>
    );
  }
}

LoginModal.propTypes = {
  shouldShowModal: PropTypes.bool,
  closeModal: PropTypes.func,
};

const mapStateToProps = state => ({
  shouldShowModal: selectShowLoginModal(state),
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(showLoginModalAction(false)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginModal);

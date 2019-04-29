import React from 'react';
import './ResetPasswordModal.scss';
import { Alert, Button, Form, Input, Modal } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  showCreateAccountModalAction,
  showResetPasswordModalAction,
} from '../../../redux/actions/modal.actions';
import { authErrorAction, resetPasswordAction } from '../../../redux/actions/auth.actions';
import { selectAuthError, selectAuthLoading } from '../../../redux/selectors/auth.selectors';
import { AUTH_ERROR_TYPES } from '../../../redux/reducers/auth.reducer';

class ResetPasswordModal extends React.Component {

  componentWillUnmount() {
    this.props.clearErrors();
  }

  closeModal = () => {
    this.props.closeModal();
  };

  hasErrors = fieldsError => {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        this.props.resetPassword(values);
      }
    });
  };

  showCreateAccount = () => {
    this.closeModal();
    this.props.showCreateAccountModal();
  };

  renderErrorMessage = () => {
    if (this.props.error === AUTH_ERROR_TYPES.USER_NOT_FOUND) {
      const message = (
        <div>
          User with that email does not exist. <span className="error-link" onClick={ this.showCreateAccount }>Create Account?</span>
        </div>
      );

      return (
        <div className="error-message">
          <Alert
            message="User Not Found"
            description={ message }
            type="error"
          />
        </div>
      );
    }

    if (this.props.error === AUTH_ERROR_TYPES.UNKNOWN) {
      return (
        <div className="error-message">
          <Alert
            message="An Error Occurred"
            description="An error occurred while resetting password, please try again later"
            type="error"
          />
        </div>
      );
    }
  };

  renderResetPasswordForm = () => {
    const { getFieldDecorator, getFieldsError } = this.props.form;

    return (
      <Form colon={ false } layout="vertical" onSubmit={ this.handleSubmit }>
        <Form.Item label="Email">
          {getFieldDecorator('email', { rules: [{ required: true, message: 'Email is required' }, { type: 'email', message: 'Email not valid' }] })(
            <Input placeholder="Email" />
          )}
        </Form.Item>

        <Button type="primary" htmlType="submit" disabled={ this.hasErrors(getFieldsError()) } block loading={ this.props.loading }>Reset Password</Button>
      </Form>
    );
  };

  render() {
    return (
      <Modal
        className="reset-password-modal"
        title="Reset Password"
        visible={ true }
        maskClosable={ false }
        onCancel={ this.closeModal }
        footer={ null }
      >
        { this.renderErrorMessage() }
        { this.renderResetPasswordForm() }
      </Modal>
    );
  }
}

ResetPasswordModal.propTypes = {
  form: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.string,
  closeModal: PropTypes.func,
  showCreateAccountModal: PropTypes.func,
  resetPassword: PropTypes.func,
  clearErrors: PropTypes.func,
};

const mapStateToProps = state => ({
  loading: selectAuthLoading(state),
  error: selectAuthError(state),
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(showResetPasswordModalAction(false)),
  showCreateAccountModal: () => dispatch(showCreateAccountModalAction(true)),
  resetPassword: userInfo => dispatch(resetPasswordAction(userInfo)),
  clearErrors: () => dispatch(authErrorAction(null)),
});

const ConnectedResetPasswordModal = connect(mapStateToProps, mapDispatchToProps)(ResetPasswordModal);

export default Form.create({ name: 'resetPasswordForm' })(ConnectedResetPasswordModal);

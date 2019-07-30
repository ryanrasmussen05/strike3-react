import React from 'react';
import './CreateAccountModal.scss';
import { Alert, Button, Form, Input, Modal } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showCreateAccountModalAction, showResetPasswordModalAction } from '../../../redux/actions/modal.actions';
import { authErrorAction, createAccountAction } from '../../../redux/actions/auth.actions';
import { selectAuthError, selectAuthLoading } from '../../../redux/selectors/auth.selectors';
import { AUTH_ERROR_TYPES } from '../../../redux/reducers/auth.reducer';

class CreateAccountModal extends React.Component {

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
      if (!errors && values.password === values.confirmPassword) {
        this.props.createAccount(values);
      }
    });
  };

  resetPassword = () => {
    this.closeModal();
    this.props.showResetPasswordModal();
  };

  renderCreateAccountForm = () => {
    const { getFieldDecorator, getFieldsError, getFieldValue } = this.props.form;

    const passwordValue = getFieldValue('password');
    const confirmPasswordValue = getFieldValue('confirmPassword');
    const confirmPasswordError = passwordValue !== confirmPasswordValue;

    return (
      <Form colon={ false } layout="vertical" onSubmit={ this.handleSubmit }>
        <Form.Item label="First Name">
          { getFieldDecorator('firstName', { rules: [{ required: true, message: 'First Name is required' }] })(
            <Input placeholder="First Name" />
          ) }
        </Form.Item>

        <Form.Item label="Last Name">
          { getFieldDecorator('lastName', { rules: [{ required: true, message: 'Last Name is required' }] })(
            <Input placeholder="First Name" />
          ) }
        </Form.Item>

        <Form.Item label="Email">
          { getFieldDecorator('email', { rules: [{ required: true, message: 'Email is required' }, { type: 'email', message: 'Email not valid' }] })(
            <Input placeholder="Email" />
          ) }
        </Form.Item>

        <Form.Item label="Password">
          { getFieldDecorator('password', { rules: [{ required: true, message: 'Password is required' }, { min: 6, message: 'Password must be at least 6 characters' }] })(
            <Input type="password" placeholder="Password" />
          ) }
        </Form.Item>

        <Form.Item
          label="Confirm Password"
          validateStatus={ confirmPasswordError ? 'error' : '' }
          help={ confirmPasswordError ? 'Passwords do not match' : '' }
        >
          { getFieldDecorator('confirmPassword', { rules: [{ required: true, message: 'Confirm Password is required' }] })(
            <Input type="password" placeholder="Confirm Password" />
          ) }
        </Form.Item>

        <Button className="submit-button" type="primary" htmlType="submit" disabled={ this.hasErrors(getFieldsError()) } block loading={ this.props.loading }>Create Account</Button>
      </Form>
    );
  };

  renderErrorMessage = () => {
    if (this.props.error === AUTH_ERROR_TYPES.EMAIL_ALREADY_USED) {
      const message = (
        <div>
          That email address is already in use. <span className="error-link" onClick={ this.resetPassword }>Reset Password?</span>
        </div>
      );

      return (
        <div className="error-message">
          <Alert
            message="Email In Use"
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
            description="An error occurred while creating the account, please try again later"
            type="error"
          />
        </div>
      );
    }
  };

  render() {
    return (
      <Modal
        className="create-account-modal"
        title="Create Account"
        visible={ true }
        maskClosable={ false }
        onCancel={ this.closeModal }
        footer={ null }
      >
        { this.renderErrorMessage() }
        { this.renderCreateAccountForm() }
      </Modal>
    );
  }
}

CreateAccountModal.propTypes = {
  form: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.string,
  closeModal: PropTypes.func,
  createAccount: PropTypes.func,
  showResetPasswordModal: PropTypes.func,
  clearErrors: PropTypes.func,
};

const mapStateToProps = state => ({
  loading: selectAuthLoading(state),
  error: selectAuthError(state),
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(showCreateAccountModalAction(false)),
  createAccount: userInfo => dispatch(createAccountAction(userInfo)),
  showResetPasswordModal: () => dispatch(showResetPasswordModalAction(true)),
  clearErrors: () => dispatch(authErrorAction(null)),
});

const ConnectedCreateAccountModal = connect(mapStateToProps, mapDispatchToProps)(CreateAccountModal);

export default Form.create({ name: 'createAccountForm' })(ConnectedCreateAccountModal);

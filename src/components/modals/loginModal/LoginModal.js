import React from 'react';
import './LoginModal.scss';
import { Alert, Button, Form, Input, Modal } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  showCreateAccountModalAction,
  showLoginModalAction,
  showResetPasswordModalAction,
} from '../../../redux/actions/modal.actions';
import { authErrorAction, signInAction } from '../../../redux/actions/auth.actions';
import { selectAuthError, selectAuthLoading } from '../../../redux/selectors/auth.selectors';
import { AUTH_ERROR_TYPES } from '../../../redux/reducers/auth.reducer';

class LoginModal extends React.Component {

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
        this.props.signIn(values);
      }
    });
  };

  showCreateAccount = () => {
    this.closeModal();
    this.props.showCreateAccountModal();
  };

  showResetPassword = () => {
    this.closeModal();
    this.props.showResetPasswordModal();
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

    if (this.props.error === AUTH_ERROR_TYPES.WRONG_PASSWORD) {
      const message = (
        <div>
          The password given is incorrect. <span className="error-link" onClick={ this.showResetPassword }>Reset Password?</span>
        </div>
      );

      return (
        <div className="error-message">
          <Alert
            message="Incorrect Password"
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
            description="An error occurred while signing in, please try again later"
            type="error"
          />
        </div>
      );
    }
  };

  renderLoginForm = () => {
    const { getFieldDecorator, getFieldsError } = this.props.form;

    return (
      <Form colon={ false } layout="vertical" onSubmit={ this.handleSubmit }>
        <Form.Item label="Email">
          { getFieldDecorator('email', { rules: [{ required: true, message: 'Email is required' }, { type: 'email', message: 'Email not valid' }] })(
            <Input placeholder="Email" />
          ) }
        </Form.Item>

        <Form.Item label="Password">
          { getFieldDecorator('password', { rules: [{ required: true, message: 'Password is required' }] })(
            <Input type="password" placeholder="Password" />
          ) }
        </Form.Item>

        <Button className="submit-button" type="primary" size="large" htmlType="submit" disabled={ this.hasErrors(getFieldsError()) } block loading={ this.props.loading }>
          Sign In
        </Button>

        <Button className="create-account-link" type="link" block onClick={ this.showCreateAccount }>
          Create Account
        </Button>
      </Form>
    );
  };

  render() {
    return (
      <Modal
        className="login-modal"
        title="Sign In"
        visible={ true }
        maskClosable={ false }
        onCancel={ this.closeModal }
        footer={ null }
      >
        { this.renderErrorMessage() }
        { this.renderLoginForm() }
      </Modal>
    );
  }
}

LoginModal.propTypes = {
  form: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.string,
  closeModal: PropTypes.func,
  showCreateAccountModal: PropTypes.func,
  showResetPasswordModal: PropTypes.func,
  signIn: PropTypes.func,
  clearErrors: PropTypes.func,
};

const mapStateToProps = state => ({
  loading: selectAuthLoading(state),
  error: selectAuthError(state),
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(showLoginModalAction(false)),
  showCreateAccountModal: () => dispatch(showCreateAccountModalAction(true)),
  showResetPasswordModal: () => dispatch(showResetPasswordModalAction(true)),
  signIn: userInfo => dispatch(signInAction(userInfo)),
  clearErrors: () => dispatch(authErrorAction(null)),
});

const ConnectedLoginModal = connect(mapStateToProps, mapDispatchToProps)(LoginModal);

export default Form.create({ name: 'loginForm' })(ConnectedLoginModal);

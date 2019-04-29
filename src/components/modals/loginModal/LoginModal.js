import React from 'react';
import './LoginModal.scss';
import { Button, Form, Input, Modal } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showCreateAccountModalAction, showLoginModalAction } from '../../../redux/actions/modal.actions';

class LoginModal extends React.Component {

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
        console.log(values);
        // TODO submit here
      }
    });
  };

  showCreateAccount = () => {
    this.closeModal();
    this.props.showCreateAccountModal();
  };

  renderLoginForm = () => {
    const { getFieldDecorator, getFieldsError } = this.props.form;

    return (
      <Form colon={ false } layout="vertical" onSubmit={ this.handleSubmit }>
        <Form.Item label="Email">
          {getFieldDecorator('email', { rules: [{ required: true, message: 'Email is required' }, { type: 'email', message: 'Email not valid' }] })(
            <Input placeholder="Email" />
          )}
        </Form.Item>

        <Form.Item label="Password">
          {getFieldDecorator('password', { rules: [{ required: true, message: 'Password is required' }] })(
            <Input type="password" placeholder="Password" />
          )}
        </Form.Item>

        <Button type="primary" htmlType="submit" disabled={ this.hasErrors(getFieldsError()) } block>Sign In</Button>

        <div className="create-account-link">
          <span className="link" onClick={ this.showCreateAccount }>Create Account</span>
        </div>
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
        { this.renderLoginForm() }
      </Modal>
    );
  }
}

LoginModal.propTypes = {
  form: PropTypes.object,
  closeModal: PropTypes.func,
  showCreateAccountModal: PropTypes.func,
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(showLoginModalAction(false)),
  showCreateAccountModal: () => dispatch(showCreateAccountModalAction(true)),
});

const ConnectedLoginModal = connect(mapStateToProps, mapDispatchToProps)(LoginModal);

export default Form.create({ name: 'loginForm' })(ConnectedLoginModal);

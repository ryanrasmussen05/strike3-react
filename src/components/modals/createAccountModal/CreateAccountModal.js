import React from 'react';
import { Button, Form, Input, Modal } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showCreateAccountModalAction } from '../../../redux/actions/modal.actions';

class CreateAccountModal extends React.Component {

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
        console.log(values);
        // TODO submit here
      }
    });
  };

  renderCreateAccountForm = () => {
    const { getFieldDecorator, getFieldsError, getFieldValue } = this.props.form;

    const passwordValue = getFieldValue('password');
    const confirmPasswordValue = getFieldValue('confirmPassword');
    const confirmPasswordError = passwordValue !== confirmPasswordValue;

    return (
      <Form colon={ false } layout="vertical" onSubmit={ this.handleSubmit }>
        <Form.Item label="First Name">
          {getFieldDecorator('firstName', { rules: [{ required: true, message: 'First Name is required' }] })(
            <Input placeholder="First Name" />
          )}
        </Form.Item>

        <Form.Item label="Last Name">
          {getFieldDecorator('lastName', { rules: [{ required: true, message: 'Last Name is required' }] })(
            <Input placeholder="First Name" />
          )}
        </Form.Item>

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

        <Form.Item
          label="Confirm Password"
          validateStatus={ confirmPasswordError ? 'error' : '' }
          help={ confirmPasswordError ? 'Passwords do not match' : '' }
        >
          {getFieldDecorator('confirmPassword', { rules: [{ required: true, message: 'Confirm Password is required' }] })(
            <Input type="password" placeholder="Confirm Password" />
          )}
        </Form.Item>

        <Button type="primary" htmlType="submit" disabled={ this.hasErrors(getFieldsError()) } block>Create Account</Button>
      </Form>
    );
  };

  render() {
    return (
      <Modal
        title="Create Account"
        visible={ true }
        onCancel={ this.closeModal }
        footer={ null }
      >
        { this.renderCreateAccountForm() }
      </Modal>
    );
  }
}

CreateAccountModal.propTypes = {
  form: PropTypes.object,
  closeModal: PropTypes.func,
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(showCreateAccountModalAction(false)),
});

const ConnectedCreateAccountModal = connect(mapStateToProps, mapDispatchToProps)(CreateAccountModal);

export default Form.create({ name: 'loginForm' })(ConnectedCreateAccountModal);

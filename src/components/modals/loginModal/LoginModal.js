import React from 'react';
import { Button, Form, Input, Modal } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showLoginModalAction } from '../../../redux/actions/modal.actions';

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
      </Form>
    );
  };

  render() {
    return (
      <Modal
        title="Sign In"
        visible={ true }
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
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(showLoginModalAction(false)),
});

const ConnectedLoginModal = connect(mapStateToProps, mapDispatchToProps)(LoginModal);

export default Form.create({ name: 'loginForm' })(ConnectedLoginModal);

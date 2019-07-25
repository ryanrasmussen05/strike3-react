import React from 'react';
import './Email.scss';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { Editor } from 'react-draft-wysiwyg';
import { EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Form, Input, Select } from 'antd';
import {
  selectAdminCurrentWeek, selectAdminIsSubmitting,
  selectPlayerMissingPickForCurrentWeek,
  selectRosterPlayers,
} from '../../redux/selectors/admin.selectors';
import { adminSendEmailAction } from '../../redux/actions/admin.actions';

const recipientOptions = {
  ALL: 'all',
  MISSING_PICK: 'missingPick',
};

class Email extends React.Component {

  state = {
    recipients: recipientOptions.ALL,
    editorState: EditorState.createEmpty(),
  };

  handleRecipientListChange = recipients => {
    this.setState({ recipients });
  };

  handleEditorStateChange = editorState => {
    this.setState({ editorState });
  };

  handleSubmit = event => {
    event.preventDefault();

    this.props.form.validateFields((errors, values) => {
      if (!errors) {
        const recipientList = this.state.recipients === recipientOptions.ALL ? this.props.allPlayers : this.props.playersMissingPick;
        const recipients = recipientList.map(recipient => recipient.email);

        const emailData = {
          recipients,
          subject: values.subject,
          body: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent())),
        };

        this.props.sendEmail(emailData, this.onSuccess);
      }
    });
  };

  onSuccess = () => {
    this.props.form.resetFields();
    this.setState({
      editorState: EditorState.createEmpty(),
      recipients: recipientOptions.ALL,
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    const recipients = this.state.recipients === recipientOptions.ALL ? this.props.allPlayers : this.props.playersMissingPick;

    return (
      <div className="email">
        <Form colon={ false } layout="vertical" onSubmit={ this.handleSubmit }>
          <Form.Item label="Recipients">
            { getFieldDecorator('recipients', { initialValue: recipientOptions.ALL })(
              <Select className="recipients-select" onChange={ this.handleRecipientListChange }>
                <Select.Option value={ recipientOptions.ALL }>All Players</Select.Option>
                <Select.Option value={ recipientOptions.MISSING_PICK }>{ `Players missing pick for Week ${this.props.currentWeek}` }</Select.Option>
              </Select>
            ) }
          </Form.Item>

          <div className="recipients-list">
            { recipients.map(recipient => (
              <div className="recipient" key={ recipient.email }>{ recipient.name }</div>
            ))}
          </div>

          <Form.Item label="Subject" className="subject-input">
            { getFieldDecorator('subject')(
              <Input />
            ) }
          </Form.Item>

          <Editor editorState={ this.state.editorState } onEditorStateChange={ this.handleEditorStateChange } editorClassName="email-editor" />

          <Button type="primary" htmlType="submit" loading={ this.props.loading }>
            Send Email
          </Button>
        </Form>
      </div>
    );
  }
}

Email.propTypes = {
  form: PropTypes.object,
  loading: PropTypes.bool,
  currentWeek: PropTypes.number,
  allPlayers: PropTypes.array,
  playersMissingPick: PropTypes.array,
  sendEmail: PropTypes.func,
};

const mapStateToProps = state => ({
  loading: selectAdminIsSubmitting(state),
  currentWeek: selectAdminCurrentWeek(state),
  allPlayers: selectRosterPlayers(state),
  playersMissingPick: selectPlayerMissingPickForCurrentWeek(state),
});

const mapDispatchToProps = dispatch => ({
  sendEmail: (emailData, onSuccess) => dispatch(adminSendEmailAction({ emailData, onSuccess })),
});

const ConnectedEmail = connect(mapStateToProps, mapDispatchToProps)(Email);

export default Form.create({ name: 'emailForm' })(ConnectedEmail);

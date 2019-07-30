import React from 'react';
import './AdminTieBreakerResultModal.scss';
import { Alert, Button, Form, Input, Modal } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showAdminTieBreakerResultModalAction } from '../../../redux/actions/modal.actions';
import { ADMIN_ERROR_TYPES } from '../../../redux/reducers/admin.reducer';
import {
  selectAdminError, selectAdminIsSubmitting, selectAdminSelectedTieBreaker,
} from '../../../redux/selectors/admin.selectors';
import {
  adminDeleteTieBreakerAction,
  adminErrorAction,
  adminUpdateTieBreakerAction,
} from '../../../redux/actions/admin.actions';

class AdminTieBreakerResultModal extends React.Component {

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
        const tieBreaker = {
          week: this.props.tieBreaker.week,
          awayTeam: this.props.tieBreaker.awayTeam,
          awayTeamPoints: values.awayTeamPoints,
          homeTeam: this.props.tieBreaker.homeTeam,
          homeTeamPoints: values.homeTeamPoints,
        };

        this.props.updateTieBreaker(tieBreaker);
      }
    });
  };

  handleDelete = () => {
    this.props.deleteTieBreaker(this.props.tieBreaker);
  };

  render() {
    const tieBreaker = this.props.tieBreaker;

    return (
      <Modal
        className="admin-tie-breaker-result-modal"
        title={ `Week ${ tieBreaker.week } - ${ tieBreaker.awayTeam } vs. ${ tieBreaker.homeTeam }` }
        visible={ true }
        maskClosable={ false }
        onCancel={ this.closeModal }
        footer={ null }
      >
        { this.renderErrorMessage() }
        { this.renderAdminTieBreakerResultForm() }
      </Modal>
    );
  }

  renderErrorMessage = () => {
    if (this.props.error === ADMIN_ERROR_TYPES.SUBMIT) {
      return (
        <div className="error-message">
          <Alert
            message="An Error Occurred"
            description="An error occurred while submitting the result, please try again"
            type="error"
          />
        </div>
      );
    }
  };

  renderAdminTieBreakerResultForm = () => {
    const { getFieldDecorator, getFieldsError } = this.props.form;

    return (
      <Form colon={ false } layout="vertical" onSubmit={ this.handleSubmit }>

        <div className="team-row">
          <div className="team-name">{ this.props.tieBreaker.awayTeam }</div>
          <Form.Item>
            { getFieldDecorator('awayTeamPoints', { rules: [{ required: true, message: 'Score is required' }], initialValue: this.props.tieBreaker.awayTeamPoints })(
              <Input placeholder={ `${ this.props.tieBreaker.awayTeam } Score` } />
            ) }
          </Form.Item>
        </div>

        <div className="team-row">
          <div className="team-name">{ this.props.tieBreaker.homeTeam }</div>
          <Form.Item>
            { getFieldDecorator('homeTeamPoints', { rules: [{ required: true, message: 'Score is required' }], initialValue: this.props.tieBreaker.homeTeamPoints })(
              <Input placeholder={ `${ this.props.tieBreaker.homeTeam } Score` } />
            ) }
          </Form.Item>
        </div>

        <Button className="submit-button" type="primary" htmlType="submit" disabled={ this.hasErrors(getFieldsError()) } block loading={ this.props.loading }>
          Save
        </Button>

        <div className="delete-button">
          <Button type="danger" onClick={ this.handleDelete } loading={ this.props.loading }>Delete</Button>
        </div>
      </Form>
    );
  };
}

AdminTieBreakerResultModal.propTypes = {
  form: PropTypes.object,
  tieBreaker: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.string,
  closeModal: PropTypes.func,
  updateTieBreaker: PropTypes.func,
  deleteTieBreaker: PropTypes.func,
  clearErrors: PropTypes.func,
};

const mapStateToProps = state => ({
  tieBreaker: selectAdminSelectedTieBreaker(state),
  loading: selectAdminIsSubmitting(state),
  error: selectAdminError(state),
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(showAdminTieBreakerResultModalAction(false)),
  updateTieBreaker: tieBreaker => dispatch(adminUpdateTieBreakerAction(tieBreaker)),
  deleteTieBreaker: tieBreaker => dispatch(adminDeleteTieBreakerAction(tieBreaker)),
  clearErrors: () => dispatch(adminErrorAction(null)),
});

const ConnectedAdminTieBreakerResultModal = connect(mapStateToProps, mapDispatchToProps)(AdminTieBreakerResultModal);

export default Form.create({ name: 'adminTieBreakerForm' })(ConnectedAdminTieBreakerResultModal);

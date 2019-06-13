import React from 'react';
import './AdminTieBreakerResultModal.scss';
import { Alert, Button, Form, Input, Modal } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showAdminTieBreakerResultModalAction } from '../../../redux/actions/modal.actions';
import { ADMIN_ERROR_TYPES } from '../../../redux/reducers/admin.reducer';
import {
  selectAdminError,
  selectAdminIsSubmitting, selectAdminSelectedTieBreaker,
} from '../../../redux/selectors/admin.selectors';
import { adminErrorAction } from '../../../redux/actions/admin.actions';
import { getSvgForTeam } from '../../../util/teams.util';

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
        console.log(values);
      }
    });
  };

  render() {
    const tieBreaker = this.props.tieBreaker;

    return (
      <Modal
        className="admin-tie-breaker-result-modal"
        title={ `Week ${tieBreaker.week} - ${tieBreaker.awayTeam} vs. ${tieBreaker.homeTeam}` }
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
          <div className="team-logo">{ getSvgForTeam(this.props.tieBreaker.awayTeam) }</div>
          <div className="team-name">{ this.props.tieBreaker.awayTeam }</div>
          <Form.Item>
            { getFieldDecorator('awayTeamPoints', { rules: [{ required: true, message: 'Score is required' }] })(
              <Input placeholder={ `${this.props.tieBreaker.awayTeam} Score` } />
            ) }
          </Form.Item>
        </div>

        <div className="team-row">
          <div className="team-logo">{ getSvgForTeam(this.props.tieBreaker.homeTeam) }</div>
          <div className="team-name">{ this.props.tieBreaker.homeTeam }</div>
          <Form.Item>
            { getFieldDecorator('homeTeamPoints', { rules: [{ required: true, message: 'Score is required' }] })(
              <Input placeholder={ `${this.props.tieBreaker.homeTeam} Score` } />
            ) }
          </Form.Item>
        </div>

        <Button className="submit-button" type="primary" htmlType="submit" disabled={ this.hasErrors(getFieldsError()) } block loading={ this.props.loading }>
          Save
        </Button>

        <div className="delete-button">
          <Button type="danger">Delete</Button>
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
  // updateTieBreaker: PropTypes.func,
  clearErrors: PropTypes.func,
};

const mapStateToProps = state => ({
  tieBreaker: selectAdminSelectedTieBreaker(state),
  loading: selectAdminIsSubmitting(state),
  error: selectAdminError(state),
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(showAdminTieBreakerResultModalAction(false)),
  // updateTieBreaker: tieBreaker => dispatch(adminUpdateTieBreakerAction(tieBreaker)),
  clearErrors: () => dispatch(adminErrorAction(null)),
});

const ConnectedAdminTieBreakerResultModal = connect(mapStateToProps, mapDispatchToProps)(AdminTieBreakerResultModal);

export default Form.create({ name: 'adminTieBreakerForm' })(ConnectedAdminTieBreakerResultModal);

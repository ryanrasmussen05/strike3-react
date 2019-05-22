import React from 'react';
import './PickModal.scss';
import { Alert, Button, Form, Modal, Select } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  selectAllPicksForPlayer,
  selectGameError,
  selectIsSubmitting,
  selectPickForSelectedWeek,
  selectSelectedWeek,
} from '../../../redux/selectors/game.selectors';
import { showPickModalAction } from '../../../redux/actions/modal.actions';
import { gameErrorAction, submitPickAction } from '../../../redux/actions/game.actions';
import { GAME_ERROR_TYPES } from '../../../redux/reducers/game.reducer';
import { AllTeams } from '../../../util/teams.util';

class PickModal extends React.Component {

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
        this.props.submitPick(values.team);
      }
    });
  };

  getAvailableTeams = () => {
    const { allPicks, existingPick } = this.props;

    return AllTeams.filter(team => {
      return !allPicks.some(currentPick => currentPick.team === team.abbreviation) || team.abbreviation === existingPick.team;
    });
  };

  render() {
    return (
      <Modal
        className="pick-modal"
        title={ `Week ${this.props.selectedWeek} Pick` }
        visible={ true }
        maskClosable={ false }
        onCancel={ this.closeModal }
        footer={ null }
      >
        { this.renderErrorMessage() }
        { this.renderPickForm() }
      </Modal>
    );
  }

  renderErrorMessage = () => {
    if (this.props.error === GAME_ERROR_TYPES.SUBMIT) {
      return (
        <div className="error-message">
          <Alert
            message="An Error Occurred"
            description="An error occurred while submitting your pick, please try again"
            type="error"
          />
        </div>
      );
    }

    if (this.props.error === GAME_ERROR_TYPES.DUPLICATE_PICK) {
      return (
        <div className="error-message">
          <Alert
            message="Repeat Pick"
            description="You have already picked this team in another week, you can't use this team again"
            type="error"
          />
        </div>
      );
    }
  };

  renderPickForm = () => {
    const { getFieldDecorator, getFieldsError } = this.props.form;
    const existingPick = this.props.existingPick.team || undefined;
    const availableTeams = this.getAvailableTeams();

    return (
      <Form colon={ false } layout="vertical" onSubmit={ this.handleSubmit }>

        <Form.Item label="Team">
          { getFieldDecorator('team', { rules: [{ required: true, message: 'Team is required' }], initialValue: existingPick })(
            <Select
              showSearch
              placeholder="Select Team"
              filterOption={ (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
            >
              { availableTeams.map(team => (
                <Select.Option key={ team.name } value={ team.abbreviation }>{ team.name }</Select.Option>
              )) }
            </Select>
          ) }
        </Form.Item>

        <div className="note">
          *You can change your pick until the game starts
        </div>

        <Button className="submit-button" type="primary" htmlType="submit" disabled={ this.hasErrors(getFieldsError()) } block loading={ this.props.loading }>Submit Pick</Button>
      </Form>
    );
  };
}

PickModal.propTypes = {
  form: PropTypes.object,
  selectedWeek: PropTypes.number,
  existingPick: PropTypes.object,
  allPicks: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.string,
  closeModal: PropTypes.func,
  submitPick: PropTypes.func,
  clearErrors: PropTypes.func,
};

const mapStateToProps = state => ({
  selectedWeek: selectSelectedWeek(state),
  existingPick: selectPickForSelectedWeek(state),
  allPicks: selectAllPicksForPlayer(state),
  loading: selectIsSubmitting(state),
  error: selectGameError(state),
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(showPickModalAction(false)),
  submitPick: team => dispatch(submitPickAction(team)),
  clearErrors: () => dispatch(gameErrorAction(null)),
});

const ConnectedPickModal = connect(mapStateToProps, mapDispatchToProps)(PickModal);

export default Form.create({ name: 'pickForm' })(ConnectedPickModal);

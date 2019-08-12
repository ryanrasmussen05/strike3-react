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
  selectTeamsPlayeringForSelectedWeek,
} from '../../../redux/selectors/game.selectors';
import { showPickModalAction } from '../../../redux/actions/modal.actions';
import { gameErrorAction, resetSelectedWeekAction, submitPickAction } from '../../../redux/actions/game.actions';
import { GAME_ERROR_TYPES } from '../../../redux/reducers/game.reducer';
import { AllTeams } from '../../../util/teams.util';

class PickModal extends React.Component {

  componentWillUnmount() {
    this.props.clearErrors();
  }

  closeModal = () => {
    this.props.resetSelectedWeek(); // reset week to current week to prevent week table from potentially showing future weeks
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

    const availableTeams = AllTeams.filter(team => {
      return this.props.availableTeams.some(availableTeam => availableTeam === team.abbreviation);
    });

    return availableTeams.filter(team => {
      return !allPicks.some(currentPick => currentPick.team === team.abbreviation) || team.abbreviation === existingPick.team;
    });
  };

  render() {
    return (
      <Modal
        className="pick-modal"
        title={ `Week ${ this.props.selectedWeek } Pick` }
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

    if (this.props.error === GAME_ERROR_TYPES.NEW_PICK_STARTED) {
      return (
        <div className="error-message">
          <Alert
            message="Game Started"
            description="The game you are trying to select has already started, you can't pick this team anymore this week"
            type="error"
          />
        </div>
      );
    }

    if (this.props.error === GAME_ERROR_TYPES.EXISTING_PICK_STARTED) {
      return (
        <div className="error-message">
          <Alert
            message="Game Started"
            description="The game you previously selected has already started, you can't change your pick now"
            type="error"
          />
        </div>
      );
    }

    if (this.props.error === GAME_ERROR_TYPES.DEADLINE_PASSED) {
      return (
        <div className="error-message">
          <Alert
            message="Deadline Passed"
            description="The deadline for this week has passed, email denisongl@yahoo.com for questions"
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
          *You can change your pick until the game starts, or 12:00PM Sunday (whichever comes first)
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
  availableTeams: PropTypes.array,
  loading: PropTypes.bool,
  error: PropTypes.string,
  closeModal: PropTypes.func,
  submitPick: PropTypes.func,
  resetSelectedWeek: PropTypes.func,
  clearErrors: PropTypes.func,
};

const mapStateToProps = state => ({
  selectedWeek: selectSelectedWeek(state),
  existingPick: selectPickForSelectedWeek(state),
  allPicks: selectAllPicksForPlayer(state),
  availableTeams: selectTeamsPlayeringForSelectedWeek(state),
  loading: selectIsSubmitting(state),
  error: selectGameError(state),
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(showPickModalAction(false)),
  submitPick: team => dispatch(submitPickAction(team)),
  resetSelectedWeek: () => dispatch(resetSelectedWeekAction()),
  clearErrors: () => dispatch(gameErrorAction(null)),
});

const ConnectedPickModal = connect(mapStateToProps, mapDispatchToProps)(PickModal);

export default Form.create({ name: 'pickForm' })(ConnectedPickModal);

import React from 'react';
import './AdminPickModal.scss';
import { Alert, Button, Form, Input, Modal, Radio, Select } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showAdminPickModalAction } from '../../../redux/actions/modal.actions';
import { AllTeamsAdmin } from '../../../util/teams.util';
import { ADMIN_ERROR_TYPES } from '../../../redux/reducers/admin.reducer';
import {
  selectAdminError, selectAdminGameData,
  selectAdminIsSubmitting,
  selectAdminSelectedPick,
  selectAdminSelectedPlayer,
} from '../../../redux/selectors/admin.selectors';
import { adminErrorAction, adminSubmitPickAction } from '../../../redux/actions/admin.actions';

class AdminPickModal extends React.Component {

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

        const pick = {
          team: values.team,
          status: values.status,
          week: this.props.selectedPick.week,
          userId: this.props.selectedPlayer.id,
        };

        if (values.tieBreakerAwayTeamPoints || values.tieBreakerHomeTeamPoints) {
          pick.tieBreakerAwayTeamPoints = values.tieBreakerAwayTeamPoints;
          pick.tieBreakerHomeTeamPoints = values.tieBreakerHomeTeamPoints;
        }

        this.props.submitPick(pick);
      }
    });
  };

  render() {
    return (
      <Modal
        className="admin-pick-modal"
        title={ `Week ${this.props.selectedPick.week} Pick (${this.props.selectedPlayer.name})` }
        visible={ true }
        maskClosable={ false }
        onCancel={ this.closeModal }
        footer={ null }
      >
        { this.renderErrorMessage() }
        { this.renderAdminPickForm() }
      </Modal>
    );
  }

  renderErrorMessage = () => {
    if (this.props.error === ADMIN_ERROR_TYPES.SUBMIT) {
      return (
        <div className="error-message">
          <Alert
            message="An Error Occurred"
            description="An error occurred while submitting the pick, please try again"
            type="error"
          />
        </div>
      );
    }

    if (this.props.error === ADMIN_ERROR_TYPES.DUPLICATE_PICK) {
      return (
        <div className="error-message">
          <Alert
            message="Repeat Pick"
            description="The player has already picked this team in another week"
            type="error"
          />
        </div>
      );
    }
  };

  renderAdminPickForm = () => {
    const { getFieldDecorator, getFieldsError } = this.props.form;
    const existingPick = this.props.selectedPick;
    const tieBreakerGame = this.props.gameData.tieBreakers[this.props.selectedPick.week];

    return (
      <Form colon={ false } layout="vertical" onSubmit={ this.handleSubmit }>

        <Form.Item label="Team">
          { getFieldDecorator('team', { rules: [{ required: true, message: 'Team is required' }], initialValue: existingPick.team || undefined })(
            <Select
              showSearch
              placeholder="Select Team"
              filterOption={ (input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0 }
            >
              { AllTeamsAdmin.map(team => (
                <Select.Option key={ team.name } value={ team.abbreviation }>{ team.name }</Select.Option>
              )) }
            </Select>
          ) }
        </Form.Item>

        { tieBreakerGame &&
        <Form.Item label={ `${tieBreakerGame.awayTeam} Score (Tie Breaker)` }>
          { getFieldDecorator('tieBreakerAwayTeamPoints', { initialValue: existingPick.tieBreakerAwayTeamPoints || undefined })(
            <Input type="number" />
          ) }
        </Form.Item>
        }

        { tieBreakerGame &&
        <Form.Item label={ `${tieBreakerGame.homeTeam} Score (Tie Breaker)` }>
          { getFieldDecorator('tieBreakerHomeTeamPoints', { initialValue: existingPick.tieBreakerHomeTeamPoints || undefined })(
            <Input type="number" />
          ) }
        </Form.Item>
        }

        <Form.Item label="Result">
          { getFieldDecorator('status', { rules: [{ required: true, message: 'Result is required' }], initialValue: existingPick.status })(
            <Radio.Group>
              <Radio value="open">Open</Radio>
              <Radio value="win">Win</Radio>
              <Radio value="loss">Loss</Radio>
              <Radio value="tie">Tie</Radio>
            </Radio.Group>
          ) }
        </Form.Item>

        <Button className="submit-button" type="primary" htmlType="submit" disabled={ this.hasErrors(getFieldsError()) } block loading={ this.props.loading }>
          Submit Pick
        </Button>
      </Form>
    );
  };
}

AdminPickModal.propTypes = {
  form: PropTypes.object,
  gameData: PropTypes.object,
  selectedPlayer: PropTypes.object,
  selectedPick: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.string,
  closeModal: PropTypes.func,
  submitPick: PropTypes.func,
  clearErrors: PropTypes.func,
};

const mapStateToProps = state => ({
  gameData: selectAdminGameData(state),
  selectedPlayer: selectAdminSelectedPlayer(state),
  selectedPick: selectAdminSelectedPick(state),
  loading: selectAdminIsSubmitting(state),
  error: selectAdminError(state),
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(showAdminPickModalAction(false)),
  submitPick: pick => dispatch(adminSubmitPickAction(pick)),
  clearErrors: () => dispatch(adminErrorAction(null)),
});

const ConnectedAdminPickModal = connect(mapStateToProps, mapDispatchToProps)(AdminPickModal);

export default Form.create({ name: 'adminPickForm' })(ConnectedAdminPickModal);

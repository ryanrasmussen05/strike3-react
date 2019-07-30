import React from 'react';
import './TieBreakerPickModal.scss';
import { Alert, Button, Form, Input, Modal } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  selectGameError,
  selectIsSubmitting, selectPickForCurrentWeek,
  selectSelectedWeek,
  selectTieBreakerForCurrentWeek,
} from '../../../redux/selectors/game.selectors';
import { showTieBreakerPickModalAction } from '../../../redux/actions/modal.actions';
import { gameErrorAction, submitTieBreakerPickAction } from '../../../redux/actions/game.actions';
import { GAME_ERROR_TYPES } from '../../../redux/reducers/game.reducer';

class TieBreakerPickModal extends React.Component {

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
        this.props.submitTieBreakerPick({
          tieBreakerHomeTeamPoints: values.homeTeamPoints,
          tieBreakerAwayTeamPoints: values.awayTeamPoints,
        });
      }
    });
  };

  render() {
    return (
      <Modal
        className="tie-breaker-pick-modal"
        title={ `Week ${ this.props.selectedWeek } Tie Breaker` }
        visible={ true }
        maskClosable={ false }
        onCancel={ this.closeModal }
        footer={ null }
      >
        { this.renderErrorMessage() }
        { this.renderTieBreakerPickForm() }
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

    if (this.props.error === GAME_ERROR_TYPES.TIE_BREAKER_STARTED) {
      return (
        <div className="error-message">
          <Alert
            message="Game Started"
            description="The tie breaker game has already started. You cannot change your pick now."
            type="error"
          />
        </div>
      );
    }
  };

  renderTieBreakerPickForm = () => {
    const { getFieldDecorator, getFieldsError } = this.props.form;

    const initialAwayPoints = this.props.pick ? this.props.pick.tieBreakerAwayTeamPoints : null;
    const initialHomePoints = this.props.pick ? this.props.pick.tieBreakerHomeTeamPoints : null;

    return (
      <Form colon={ false } layout="vertical" onSubmit={ this.handleSubmit }>

        <div className="team-row">
          <div className="team-name">{ this.props.tieBreaker.awayTeam }</div>
          <Form.Item>
            { getFieldDecorator('awayTeamPoints', { rules: [{ required: true, message: 'Score is required' }], initialValue: initialAwayPoints })(
              <Input type="number" placeholder={ `${ this.props.tieBreaker.awayTeam } Score` } />
            ) }
          </Form.Item>
        </div>

        <div className="team-row">
          <div className="team-name">{ this.props.tieBreaker.homeTeam }</div>
          <Form.Item>
            { getFieldDecorator('homeTeamPoints', { rules: [{ required: true, message: 'Score is required' }], initialValue: initialHomePoints })(
              <Input type="number" placeholder={ `${ this.props.tieBreaker.homeTeam } Score` } />
            ) }
          </Form.Item>
        </div>

        <div className="note">
          *You can change your pick until the tie breaker game starts
        </div>

        <Button className="submit-button" type="primary" htmlType="submit" disabled={ this.hasErrors(getFieldsError()) } block loading={ this.props.loading }>
          Save
        </Button>
      </Form>
    );
  };
}

TieBreakerPickModal.propTypes = {
  form: PropTypes.object,
  tieBreaker: PropTypes.object,
  pick: PropTypes.object,
  selectedWeek: PropTypes.number,
  loading: PropTypes.bool,
  error: PropTypes.string,
  closeModal: PropTypes.func,
  submitTieBreakerPick: PropTypes.func,
  clearErrors: PropTypes.func,
};

const mapStateToProps = state => ({
  tieBreaker: selectTieBreakerForCurrentWeek(state),
  pick: selectPickForCurrentWeek(state),
  selectedWeek: selectSelectedWeek(state),
  loading: selectIsSubmitting(state),
  error: selectGameError(state),
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(showTieBreakerPickModalAction(false)),
  submitTieBreakerPick: team => dispatch(submitTieBreakerPickAction(team)),
  clearErrors: () => dispatch(gameErrorAction(null)),
});

const ConnectedTieBreakerPickModal = connect(mapStateToProps, mapDispatchToProps)(TieBreakerPickModal);

export default Form.create({ name: 'tieBreakerPickForm' })(ConnectedTieBreakerPickModal);

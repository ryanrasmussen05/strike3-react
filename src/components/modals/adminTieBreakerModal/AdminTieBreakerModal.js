import React from 'react';
import './AdminTieBreakerModal.scss';
import { Alert, Button, Form, Modal, Select } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { showAdminTieBreakerModalAction } from '../../../redux/actions/modal.actions';
import { ADMIN_ERROR_TYPES } from '../../../redux/reducers/admin.reducer';
import {
  selectAdminError,
  selectAdminGameData,
  selectAdminIsSubmitting,
} from '../../../redux/selectors/admin.selectors';
import { adminErrorAction, adminCreateTieBreakerAction } from '../../../redux/actions/admin.actions';

class AdminTieBreakerModal extends React.Component {

  state = {
    selectedWeek: null,
  };

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

        const teams = values.game.split(' vs. ');

        this.props.createTieBreaker({
          week: values.week,
          awayTeam: teams[0],
          homeTeam: teams[1],
        });
      }
    });
  };

  getWeekOptions = () => {
    const { gameData } = this.props;
    const options = [];

    for (let i = 1; i <= 17; i++) {
      if (!gameData.tieBreakers || !gameData.tieBreakers[i]) {
        options.push(<Select.Option key={ i } value={ i }>{ `Week ${i}` }</Select.Option>);
      }
    }

    return options;
  };

  getGameOptions = () => {
    const { gameData } = this.props;
    const { selectedWeek } = this.state;
    const options = [];

    if (!selectedWeek) {
      return null;
    }

    gameData.schedule[selectedWeek].forEach(game => {
      const gameString = `${game.awayTeam} vs. ${game.homeTeam}`;
      options.push(<Select.Option key={ gameString } value={ gameString }>{ gameString }</Select.Option>);
    });

    return options;
  };

  render() {
    return (
      <Modal
        className="admin-tie-breaker-modal"
        title={ `Create Tie Breaker` }
        visible={ true }
        maskClosable={ false }
        onCancel={ this.closeModal }
        footer={ null }
      >
        { this.renderErrorMessage() }
        { this.renderAdminTieBreakerForm() }
      </Modal>
    );
  }

  renderErrorMessage = () => {
    if (this.props.error === ADMIN_ERROR_TYPES.SUBMIT) {
      return (
        <div className="error-message">
          <Alert
            message="An Error Occurred"
            description="An error occurred while submitting the tie breaker, please try again"
            type="error"
          />
        </div>
      );
    }
  };

  renderAdminTieBreakerForm = () => {
    const { getFieldDecorator, getFieldsError } = this.props.form;
    const weekOptions = this.getWeekOptions();
    const gameOptions = this.getGameOptions();

    return (
      <Form colon={ false } layout="vertical" onSubmit={ this.handleSubmit }>

        <Form.Item label="Week">
          { getFieldDecorator('week', { rules: [{ required: true, message: 'Week is required' }] })(
            <Select placeholder="Select Week" onChange={ selectedWeek => this.setState({ selectedWeek }) }>
              { weekOptions }
            </Select>
          ) }
        </Form.Item>

        <Form.Item label="Game">
          { getFieldDecorator('game', { rules: [{ required: true, message: 'Result is required' }] })(
            <Select placeholder="Select Game">
              { gameOptions }
            </Select>
          ) }
        </Form.Item>

        <Button className="submit-button" type="primary" htmlType="submit" disabled={ this.hasErrors(getFieldsError()) } block loading={ this.props.loading }>
          Create Tie Breaker
        </Button>
      </Form>
    );
  };
}

AdminTieBreakerModal.propTypes = {
  form: PropTypes.object,
  gameData: PropTypes.object,
  loading: PropTypes.bool,
  error: PropTypes.string,
  closeModal: PropTypes.func,
  createTieBreaker: PropTypes.func,
  clearErrors: PropTypes.func,
};

const mapStateToProps = state => ({
  gameData: selectAdminGameData(state),
  loading: selectAdminIsSubmitting(state),
  error: selectAdminError(state),
});

const mapDispatchToProps = dispatch => ({
  closeModal: () => dispatch(showAdminTieBreakerModalAction(false)),
  createTieBreaker: tieBreaker => dispatch(adminCreateTieBreakerAction(tieBreaker)),
  clearErrors: () => dispatch(adminErrorAction(null)),
});

const ConnectedAdminTieBreakerModal = connect(mapStateToProps, mapDispatchToProps)(AdminTieBreakerModal);

export default Form.create({ name: 'adminTieBreakerForm' })(ConnectedAdminTieBreakerModal);

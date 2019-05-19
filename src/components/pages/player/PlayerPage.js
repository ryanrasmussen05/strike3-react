import React from 'react';
import './PlayerPage.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectShowPlayerPickModal } from '../../../redux/selectors/modal.selectors';
import PlayerPickModal from '../../modals/playerPickModal/PlayerPickModal';
import { getGameDataAction } from '../../../redux/actions/game.actions';
import { selectGameData, selectGameError } from '../../../redux/selectors/game.selectors';
import { GAME_ERROR_TYPES } from '../../../redux/reducers/game.reducer';
import { Alert, Button } from 'antd';
import WeekSelector from '../../weekSelector/WeekSelector';
import { showPlayerPickModalAction } from '../../../redux/actions/modal.actions';
import WeekTable from '../../weekTable/WeekTable';

class PlayerPage extends React.Component {

  componentDidMount() {
    this.props.getGameData();
  }

  renderPlayerPickModal = () => {
    if (this.props.shouldShowPlayerPickModal) {
      return <PlayerPickModal />;
    }
  };

  renderErrorMessage = () => {
    return (
      <div className="player-page-error">
        <Alert
          message="Server Error"
          description="An error occurred while loading the page, please try again later"
          type="error"
        />
      </div>
    );
  };

  renderPage = () => {
    return (
      <div className="player-page">
        { this.renderPlayerPickModal() }

        <div className="week-selector-container">
          <WeekSelector />
        </div>

        <Button onClick={ this.props.showPlayerPickModal }>Show Player Pick Modal</Button>

        <div className="week-table-container">
          <WeekTable />
        </div>
      </div>
    );
  };

  render() {
    if (this.props.error && this.props.error === GAME_ERROR_TYPES.GAME_DATA) {
      return this.renderErrorMessage();
    }

    if (!!this.props.gameData) {
      return this.renderPage();
    }

    return null;
  }
}

PlayerPage.propTypes = {
  gameData: PropTypes.object,
  error: PropTypes.any,
  shouldShowPlayerPickModal: PropTypes.bool,
  getGameData: PropTypes.func,
  showPlayerPickModal: PropTypes.func,
};

const mapStateToProps = state => ({
  gameData: selectGameData(state),
  error: selectGameError(state),
  shouldShowPlayerPickModal: selectShowPlayerPickModal(state),
});

const mapDispatchToProps = dispatch => ({
  getGameData: () => dispatch(getGameDataAction()),
  showPlayerPickModal: () => dispatch(showPlayerPickModalAction(true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerPage);

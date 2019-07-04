import React from 'react';
import './PlayerPage.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectShowPickModal } from '../../../redux/selectors/modal.selectors';
import PlayerPickModal from '../../modals/pickModal/PickModal';
import { getGameDataAction } from '../../../redux/actions/game.actions';
import { selectCurrentWeek, selectGameData, selectGameError } from '../../../redux/selectors/game.selectors';
import { GAME_ERROR_TYPES } from '../../../redux/reducers/game.reducer';
import { Alert, Radio } from 'antd';
import WeekSelector from '../../weekSelector/WeekSelector';
import WeekTable from '../../weekTable/WeekTable';
import WeekDisplay from '../../weekDisplay/WeekDisplay';
import { selectLoggedInUser } from '../../../redux/selectors/auth.selectors';
import GameTable from '../../gameTable/GameTable';

class PlayerPage extends React.Component {

  state = {
    viewType: 'week',
  };

  componentDidMount() {
    this.props.getGameData();
  }

  onViewTypeChange = event => {
    this.setState({
      viewType: event.target.value,
    });
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
        { this.renderPickModal() }

        { !this.props.loggedInUser &&
        <div className="welcome-message">
          <div className="welcome-header">Welcome to Strike 3 2019</div>
          <div className="welcome-text">Click the <span className="bold">Sign In</span> button to sign in or create an account</div>
        </div>
        }

        <div className="active-week-container">
          {`Week ${this.props.currentWeek}`}
        </div>

        { this.props.loggedInUser &&
        <div className="week-display-container">
          <WeekDisplay />
        </div>
        }

        <div className="standings-container">
          <div className="standings-header">STANDINGS</div>

          <div className="view-type-container">
            <div className="view-type-label">View Picks:</div>
            <Radio.Group size="large" buttonStyle="outline" defaultValue="week" onChange={ this.onViewTypeChange }>
              <Radio.Button value="week">By Week</Radio.Button>
              <Radio.Button value="all">All</Radio.Button>
            </Radio.Group>
          </div>

          { this.state.viewType === 'week' &&
          <div className="week-table-container">
            <WeekTable />
          </div>
          }

          { this.state.viewType === 'all' &&
          <div className="game-table-container">
            <GameTable admin={ false } />
          </div>
          }
        </div>
      </div>
    );
  };

  renderPickModal = () => {
    if (this.props.shouldShowPickModal) {
      return <PlayerPickModal />;
    }
  };
}

PlayerPage.propTypes = {
  loggedInUser: PropTypes.object,
  gameData: PropTypes.object,
  currentWeek: PropTypes.number,
  error: PropTypes.any,
  shouldShowPickModal: PropTypes.bool,
  getGameData: PropTypes.func,
};

const mapStateToProps = state => ({
  loggedInUser: selectLoggedInUser(state),
  gameData: selectGameData(state),
  currentWeek: selectCurrentWeek(state),
  error: selectGameError(state),
  shouldShowPickModal: selectShowPickModal(state),
});

const mapDispatchToProps = dispatch => ({
  getGameData: () => dispatch(getGameDataAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerPage);

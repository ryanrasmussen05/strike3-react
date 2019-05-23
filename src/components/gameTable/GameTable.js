import React from 'react';
import './GameTable.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectGameData } from '../../redux/selectors/game.selectors';
import { selectAdminGameData } from '../../redux/selectors/admin.selectors';
import { adminSetSelectedPickAction, adminSetSelectedPlayerAction } from '../../redux/actions/admin.actions';
import { showAdminPickModalAction } from '../../redux/actions/modal.actions';

class GameTable extends React.Component {

  handlePickSelected = (player, pick) => {
    if (pick.locked) {
      return;
    }

    if (this.props.admin) {
      this.props.adminSetSelectedPlayer(player);
      this.props.adminSetSelectedPick(pick);
      this.props.showAdminPickModal();
    }
  };

  getClassNameForPick = pick => {
    let classes = 'pick';

    if (!pick.locked) {
      classes = `${classes} editable`;
    }

    if (pick.status !== 'open') {
      classes = `${classes} ${pick.status}`;
    }

    return classes;
  };

  render() {
    const gameData = this.props.admin ? this.props.gameDataAdmin : this.props.gameData;

    if (gameData.players) {
      return (
        <div className="game-table">
          <div className="game-table-row">
            <div className="player-title">Player</div>
            { [...Array(17)].map((e, i) => (
              <div className="week-title" key={ i }>{ i + 1 }</div>)
            )}
          </div>
          <div className="game-table-data">
            { gameData.players.map(player => (
              this.renderPlayer(player)
            ))}
          </div>
        </div>
      );
    }

    return null;
  }

  renderPlayer = player => {
    return (
      <div key={ player.id } className="game-table-row">
        <div className="player-name">{ player.name }</div>
        { player.picks.map(pick => (
          <div key={ pick.week } className={ this.getClassNameForPick(pick) } onClick={ () => this.handlePickSelected(player, pick) }>
            { pick.team }
          </div>
        ))}
      </div>
    );
  }
}

GameTable.propTypes = {
  admin: PropTypes.bool,
  gameData: PropTypes.object,
  gameDataAdmin: PropTypes.object,
  adminSetSelectedPlayer: PropTypes.func,
  adminSetSelectedPick: PropTypes.func,
  showAdminPickModal: PropTypes.func,
};

const mapStateToProps = state => ({
  gameData: selectGameData(state),
  gameDataAdmin: selectAdminGameData(state),
});

const mapDispatchToProps = dispatch => ({
  adminSetSelectedPlayer: player => dispatch(adminSetSelectedPlayerAction(player)),
  adminSetSelectedPick: pick => dispatch(adminSetSelectedPickAction(pick)),
  showAdminPickModal: () => dispatch(showAdminPickModalAction(true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GameTable);

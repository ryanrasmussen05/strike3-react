import React from 'react';
import './GameTable.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectGameData } from '../../redux/selectors/game.selectors';

class GameTable extends React.Component {

  render() {
    if (this.props.gameData.players) {
      return (
        <div className="game-table">
          <div className="game-table-row">
            <div className="player-title">Player</div>
            { [...Array(17)].map((e, i) => (
              <div className="week-title" key={ i }>{ i + 1 }</div>)
            )}
          </div>
          <div className="game-table-data">
            { this.props.gameData.players.map(player => (
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
          <div key={ pick.week } className={ pick.locked ? 'pick' : 'pick editable' }>{ pick.team }</div>
        ))}
      </div>
    );
  }
}

GameTable.propTypes = {
  gameData: PropTypes.object,
};

const mapStateToProps = state => ({
  gameData: selectGameData(state),
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(GameTable);

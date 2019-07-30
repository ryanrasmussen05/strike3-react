import React from 'react';
import './TieBreakerDisplay.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSvgForTeam } from '../../util/teams.util';
import { Button } from 'antd';
import { showTieBreakerPickModalAction } from '../../redux/actions/modal.actions';
import {
  selectCurrentWeek,
  selectPickForCurrentWeek,
  selectTieBreakerForCurrentWeek,
} from '../../redux/selectors/game.selectors';
import { setSelectedWeekAction } from '../../redux/actions/game.actions';

class TieBreakerDisplay extends React.Component {

  showTieBreakerPickModal = () => {
    this.props.setSelectedWeek(this.props.currentWeek);
    this.props.showTieBreakerPickModal();
  };

  render() {
    if (this.props.tieBreaker) {
      return (
        <div className="tie-breaker-display">
          { this.renderDisplay() }
        </div>
      );
    }

    return null;
  }

  renderDisplay() {
    return (
      <React.Fragment>
        { this.renderTieBreakerHeader() }
        { this.renderTieBreakerGame() }
        { this.renderTieBreakerResult() }
        { this.renderTieBreakerButton() }
      </React.Fragment>
    );
  }

  renderTieBreakerHeader() {
    return (
      <div className="tie-breaker-header">
        { this.props.pick && this.props.pick.tieBreakerHomeTeamPoints ? 'Your Tie Breaker Pick' : `Week ${ this.props.currentWeek } Tie Breaker` }
      </div>
    );
  }

  renderTieBreakerGame() {
    return (
      <div className="tie-breaker-row">
        { this.props.pick && this.props.pick.tieBreakerAwayTeamPoints &&
        <div className="tie-breaker-away-points">{ this.props.pick.tieBreakerAwayTeamPoints }</div>
        }

        { getSvgForTeam(this.props.tieBreaker.awayTeam) }
        <div className="team-label">{ this.props.tieBreaker.awayTeam }</div>

        <span className="tie-breaker-vs">vs.</span>

        { getSvgForTeam(this.props.tieBreaker.homeTeam) }
        <div className="team-label">{ this.props.tieBreaker.homeTeam }</div>

        { this.props.pick && this.props.pick.tieBreakerHomeTeamPoints &&
        <div className="tie-breaker-home-points">{ this.props.pick.tieBreakerHomeTeamPoints }</div>
        }
      </div>
    );
  }

  renderTieBreakerButton() {
    if (this.props.pick && this.props.pick.status !== 'eliminated' && !this.props.pick.tieBreakerLocked && !this.props.tieBreaker.awayTeamPoints) {
      return (
        <Button type="primary" onClick={ this.showTieBreakerPickModal }>
          { this.props.pick.tieBreakerHomeTeamPoints ? 'Change Pick' : 'Make Tie Breaker Pick' }
        </Button>
      );
    }
  }

  renderTieBreakerResult() {
    if (this.props.tieBreaker.homeTeamPoints) {
      return (
        <div>
          Tie Breaker Final:
          <span className="tie-breaker-final">{ `${ this.props.tieBreaker.awayTeamPoints } - ${ this.props.tieBreaker.homeTeamPoints }` }</span>
        </div>
      );
    }
  }
}

TieBreakerDisplay.propTypes = {
  tieBreaker: PropTypes.object,
  pick: PropTypes.object,
  currentWeek: PropTypes.number,
  showTieBreakerPickModal: PropTypes.func,
  setSelectedWeek: PropTypes.func,
};

const mapStateToProps = state => ({
  tieBreaker: selectTieBreakerForCurrentWeek(state),
  pick: selectPickForCurrentWeek(state),
  currentWeek: selectCurrentWeek(state),
});

const mapDispatchToProps = dispatch => ({
  showTieBreakerPickModal: () => dispatch(showTieBreakerPickModalAction(true)),
  setSelectedWeek: weekNumber => dispatch(setSelectedWeekAction(weekNumber)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TieBreakerDisplay);

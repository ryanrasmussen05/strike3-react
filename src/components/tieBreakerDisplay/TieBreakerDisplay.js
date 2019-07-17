import React from 'react';
import './TieBreakerDisplay.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSvgForTeam } from '../../util/teams.util';
import { Button } from 'antd';
import { showPickModalAction } from '../../redux/actions/modal.actions';
import {
  selectCurrentWeek,
  selectPickForCurrentWeek,
  selectTieBreakerForCurrentWeek,
} from '../../redux/selectors/game.selectors';

class TieBreakerDisplay extends React.Component {

  showTieBreakerPickModal = () => {
    // this.props.setSelectedWeek(this.props.currentWeek);
    // this.props.showPickModal();
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
        { this.props.pick && this.props.pick.tieBreakerHomePoints ? 'Your Tie Breaker Pick' : `Week ${this.props.currentWeek} Tie Breaker` }
      </div>
    );
  }

  renderTieBreakerGame() {
    return (
      <div className="display-tie-breaker">
        { this.props.pick && this.props.pick.tieBreakerAwayPoints &&
        <span className="display-tie-breaker-away-points">{ this.props.pick.tieBreakerAwayPoints }</span>
        }
        { getSvgForTeam(this.props.tieBreaker.awayTeam) }
        <span className="display-tie-breaker-vs">vs.</span>
        { getSvgForTeam(this.props.tieBreaker.homeTeam) }
        { this.props.pick && this.props.pick.tieBreakerHomePoints &&
        <span className="display-tie-breaker-home-points">{ this.props.pick.tieBreakerHomePoints }</span>
        }
      </div>
    );
  }

  renderTieBreakerButton() {
    if (this.props.pick && this.props.pick.status !== 'eliminated' && !this.props.pick.tieBreakerHomePoints && !this.props.tieBreaker.homeTeamPoints) {
      return (
        <Button type="primary" onClick={ this.showPickModal }>
          Make Pick
        </Button>
      );
    }
  }

  renderTieBreakerResult() {
    if (this.props.tieBreaker.homeTeamPoints) {
      return (
        <div>
          Tie Breaker Final:
          <span className="tie-breaker-final">{ `${this.props.tieBreaker.awayTeamPoints} - ${this.props.tieBreaker.homeTeamPoints}` }</span>
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
};

const mapStateToProps = state => ({
  tieBreaker: selectTieBreakerForCurrentWeek(state),
  pick: selectPickForCurrentWeek(state),
  currentWeek: selectCurrentWeek(state),
});

const mapDispatchToProps = dispatch => ({
  showTieBreakerPickModal: () => dispatch(showPickModalAction(true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(TieBreakerDisplay);

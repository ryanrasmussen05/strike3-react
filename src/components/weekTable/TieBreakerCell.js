import React from 'react';
import './TieBreakerCell.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectTieBreakerForSelectedWeek } from '../../redux/selectors/game.selectors';
import { getSvgForTeam } from '../../util/teams.util';

class TieBreakerCell extends React.Component {

  render() {
    return (
      <div className="tie-breaker-cell">
        <span className="tie-breaker-cell-away-points">{ this.props.awayTeamPoints }</span>
        { getSvgForTeam(this.props.tieBreaker.awayTeam) }
        <span className="tie-breaker-cell-vs">-</span>
        { getSvgForTeam(this.props.tieBreaker.homeTeam) }
        <span className="tie-breaker-cell-home-points">{ this.props.homeTeamPoints }</span>
      </div>
    );
  }
}

TieBreakerCell.propTypes = {
  homeTeamPoints: PropTypes.string,
  awayTeamPoints: PropTypes.string,
  tieBreaker: PropTypes.object,
};

const mapStateToProps = state => ({
  tieBreaker: selectTieBreakerForSelectedWeek(state),
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(TieBreakerCell);

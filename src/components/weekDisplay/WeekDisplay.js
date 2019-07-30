import React from 'react';
import './WeekDisplay.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSvgForTeam } from '../../util/teams.util';
import { Button } from 'antd';
import { showPickModalAction } from '../../redux/actions/modal.actions';
import { selectCurrentWeek, selectPickForCurrentWeek } from '../../redux/selectors/game.selectors';
import { setSelectedWeekAction } from '../../redux/actions/game.actions';

class WeekDisplay extends React.Component {

  showPickModal = () => {
    this.props.setSelectedWeek(this.props.currentWeek);
    this.props.showPickModal();
  };

  render() {
    if (this.props.pick) {
      return (
        <div className="week-display">
          { this.renderDisplay() }
        </div>
      );
    }

    return null;
  }

  renderDisplay() {
    return (
      <React.Fragment>
        { this.props.pick.status === 'eliminated' &&
        this.renderEliminated()
        }
        { this.props.pick.status !== 'eliminated' && this.props.pick.team === null &&
        this.renderPickNotMade()
        }
        { this.props.pick.status !== 'eliminated' && this.props.pick.team !== null &&
        this.renderPickMade()
        }
      </React.Fragment>
    );
  }

  renderPickNotMade() {
    return (
      <Button type="primary" onClick={ this.showPickModal }>
        { `Make Your Week ${ this.props.pick.week } Pick` }
      </Button>
    );
  }

  renderPickMade() {
    return (
      <div className="your-pick">
        <div className="your-pick-row">
          <span className="your-pick-label">Your Pick:</span>

          { this.props.pick.team === 'NP' &&
          <span className="no-pick">NO PICK</span>
          }
          { this.props.pick.team !== 'NP' &&
          <React.Fragment>
            { getSvgForTeam(this.props.pick.team) }
            <span className="team-label">{ this.props.pick.team }</span>
          </React.Fragment>
          }
        </div>

        { this.props.pick.status !== 'open' &&
        <span className="pick-status">
          { this.props.pick.status === 'win' && <span className="win">WIN</span> }
          { this.props.pick.status === 'loss' && <span className="loss">LOSS</span> }
          { this.props.pick.status === 'tie' && <span className="tie">TIE</span> }
        </span>
        }

        { !this.props.pick.locked &&
        <Button type="primary" onClick={ this.showPickModal } className="change-pick-button">Change Pick</Button>
        }
      </div>
    );
  }

  renderEliminated() {
    return (
      <div className="eliminated">
        <div className="eliminated-header">ELIMINATED</div>
        <div>{ `Strike three, you're out!  Thanks for playing!` }</div>
      </div>
    );
  }
}

WeekDisplay.propTypes = {
  pick: PropTypes.object,
  currentWeek: PropTypes.number,
  setSelectedWeek: PropTypes.func,
  showPickModal: PropTypes.func,
};

const mapStateToProps = state => ({
  pick: selectPickForCurrentWeek(state),
  currentWeek: selectCurrentWeek(state),
});

const mapDispatchToProps = dispatch => ({
  showPickModal: () => dispatch(showPickModalAction(true)),
  setSelectedWeek: weekNumber => dispatch(setSelectedWeekAction(weekNumber)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WeekDisplay);

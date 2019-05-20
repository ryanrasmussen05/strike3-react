import React from 'react';
import './WeekDisplay.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSvgForTeam } from '../../util/teams.util';
import { Button } from 'antd';
import { showPlayerPickModalAction } from '../../redux/actions/modal.actions';
import { selectPickForSelectedWeek, selectSelectedWeek } from '../../redux/selectors/game.selectors';

class WeekDisplay extends React.Component {

  render() {
    return (
      <div className="week-display">
        { this.props.pick && this.props.pick.team &&
          this.renderPickMade()
        }
        { this.props.pick && this.props.pick.team === null &&
          this.renderPickNotMade()
        }
      </div>
    );
  }

  renderPickMade() {
    return (
      <React.Fragment>
        <div className="display-header">{`Your Week ${this.props.week} Pick`}</div>
        <div className="display-pick">
          { getSvgForTeam(this.props.pick.team) }
          <span className="display-team">{ this.props.pick.team }</span>
        </div>
        <Button type="primary" onClick={ this.props.showPlayerPickModal } className="change-pick-button">
          Change Pick
        </Button>
      </React.Fragment>
    );
  }

  renderPickNotMade() {
    return (
      <React.Fragment>
        <div className="display-header">{`Make Your Week ${this.props.week} Pick`}</div>
        <Button type="primary" onClick={ this.props.showPlayerPickModal } className="make-pick-button">
          Make Pick
        </Button>
      </React.Fragment>
    );
  }
}

WeekDisplay.propTypes = {
  pick: PropTypes.object,
  week: PropTypes.number,
  showPlayerPickModal: PropTypes.func,
};

const mapStateToProps = state => ({
  pick: selectPickForSelectedWeek(state),
  week: selectSelectedWeek(state),
});

const mapDispatchToProps = dispatch => ({
  showPlayerPickModal: () => dispatch(showPlayerPickModalAction(true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WeekDisplay);

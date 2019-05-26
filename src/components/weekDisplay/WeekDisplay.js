import React from 'react';
import './WeekDisplay.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getSvgForTeam } from '../../util/teams.util';
import { Button } from 'antd';
import { showPickModalAction } from '../../redux/actions/modal.actions';
import { selectPickForSelectedWeek, selectSelectedWeek } from '../../redux/selectors/game.selectors';

class WeekDisplay extends React.Component {

  render() {
    if (this.props.pick) {
      return (
        <div className={ `week-display ${this.props.pick.status}` }>
          { this.renderDisplay() }
        </div>
      );
    }

    return null;
  }

  renderDisplay() {
    return (
      <React.Fragment>
        <div className="pick-container">
          { this.renderPickHeader() }
          { this.renderPickTeam() }
        </div>
        { this.renderPickButton() }
      </React.Fragment>
    );
  }

  renderPickHeader() {
    if (this.props.pick.status === 'eliminated') {
      return (
        <React.Fragment>
          <div className="eliminated-header">ELIMINATED</div>
          <div className="eliminated-text">{ `Strike three, you're out!  Thanks for playing!` }</div>
        </React.Fragment>
      );
    }

    return (
      <div className={ this.props.pick.team === null ? 'display-header no-pick' : 'display-header' }>
        { this.props.pick.team === null ? `Make Your Week ${this.props.week} Pick` : `Your Week ${this.props.week} Pick:`}
      </div>
    );
  }

  renderPickTeam() {
    if (this.props.pick.team) {
      return (
        <div className="display-pick">
          { getSvgForTeam(this.props.pick.team) }
          <span className="display-team">{ this.props.pick.team }</span>
        </div>
      );
    }
  }

  // TODO this should look at locked property when it actually does stuff (2nd part of if statement)
  renderPickButton() {
    if (this.props.pick.status !== 'eliminated' && (this.props.pick.status === 'open')) {
      return (
        <Button type="primary" onClick={ this.props.showPickModal } className="change-pick-button">
          { this.props.pick.team === null ? 'Make Pick' : 'Change Pick' }
        </Button>
      );
    }
  }
}

WeekDisplay.propTypes = {
  pick: PropTypes.object,
  week: PropTypes.number,
  showPickModal: PropTypes.func,
};

const mapStateToProps = state => ({
  pick: selectPickForSelectedWeek(state),
  week: selectSelectedWeek(state),
});

const mapDispatchToProps = dispatch => ({
  showPickModal: () => dispatch(showPickModalAction(true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WeekDisplay);

import React from 'react';
import './Schedule.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'antd';
import {
  adminGetScheduleAction,
  adminPostScheduleAction,
  adminViewScheduleAction,
} from '../../redux/actions/admin.actions';
import { selectSchedulePreview } from '../../redux/selectors/admin.selectors';
import JSONTree from 'react-json-tree';

class Schedule extends React.Component {

  componentWillUnmount() {
    this.props.clearSchedule();
  }

  render() {
    return (
      <div className="schedule">
        {!this.props.schedulePreview &&
        <Button onClick={ this.props.fetchSchedule }>
          Fetch Schedule
        </Button>
        }

        {!!this.props.schedulePreview &&
        <React.Fragment>
          <Button onClick={ () => this.props.postSchedule(this.props.schedulePreview) }>
            Post Schedule
          </Button>

          <div className="json-wrapper">
            <JSONTree data={ this.props.schedulePreview } />
          </div>
        </React.Fragment>
        }
      </div>
    );
  }

  renderButton() {

  }

}

Schedule.propTypes = {
  schedulePreview: PropTypes.object,
  fetchSchedule: PropTypes.func,
  postSchedule: PropTypes.func,
  clearSchedule: PropTypes.func,
};

const mapStateToProps = state => ({
  schedulePreview: selectSchedulePreview(state),
});

const mapDispatchToProps = dispatch => ({
  fetchSchedule: () => dispatch(adminGetScheduleAction()),
  postSchedule: schedule => dispatch(adminPostScheduleAction(schedule)),
  clearSchedule: () => dispatch(adminViewScheduleAction(null)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);

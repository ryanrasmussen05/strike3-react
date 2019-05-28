import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { adminGetScheduleAction } from '../../redux/actions/admin.actions';

class Schedule extends React.Component {

  render() {
    return (
      <Button onClick={ this.props.fetchSchedule }>
        Fetch Schedule
      </Button>
    );
  }

}

Schedule.propTypes = {
  fetchSchedule: PropTypes.func,
};

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
  fetchSchedule: () => dispatch(adminGetScheduleAction()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);

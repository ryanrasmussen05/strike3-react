import React from 'react';
import './WeekTable.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectSelectedWeek } from '../../redux/selectors/game.selectors';

class PickColumnHeader extends React.Component {

  render() {
    return (
      <div>{ `Week ${this.props.week} Pick` }</div>
    );
  }
}

PickColumnHeader.propTypes = {
  week: PropTypes.number,
};

const mapStateToProps = state => ({
  week: selectSelectedWeek(state),
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(PickColumnHeader);

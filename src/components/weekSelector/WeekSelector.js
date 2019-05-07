import React from 'react';
import './WeekSelector.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Icon } from 'antd';
import { selectSelectedWeek } from '../../redux/selectors/game.selectors';
import { setSelectedWeekAction } from '../../redux/actions/game.actions';

class WeekSelector extends React.Component {

  decrementWeek = () => {
    this.props.setSelectedWeek(this.props.selectedWeek - 1);
  };

  incrementWeek = () => {
    this.props.setSelectedWeek(this.props.selectedWeek + 1);
  };

  render() {
    return (
      <div className="week-selector">
        <Button type="primary" shape="circle" onClick={ this.decrementWeek } disabled={ this.props.selectedWeek <= 1 }>
          <Icon type="left" />
        </Button>
        <span className="week-title">
          {`Week ${this.props.selectedWeek}`}
        </span>
        <Button type="primary" shape="circle" onClick={ this.incrementWeek } disabled={ this.props.selectedWeek >= 17 }>
          <Icon type="right" />
        </Button>
      </div>
    );
  }
}

WeekSelector.propTypes = {
  selectedWeek: PropTypes.number,
  setSelectedWeek: PropTypes.func,
};

const mapStateToProps = state => ({
  selectedWeek: selectSelectedWeek(state),
});

const mapDispatchToProps = dispatch => ({
  setSelectedWeek: weekNumber => dispatch(setSelectedWeekAction(weekNumber)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WeekSelector);

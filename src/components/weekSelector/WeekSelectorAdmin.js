import React from 'react';
import './WeekSelectorAdmin.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, Select } from 'antd';
import { selectCurrentWeek, selectIsSubmitting } from '../../redux/selectors/game.selectors';
import { setCurrentWeekAction } from '../../redux/actions/game.actions';

// TODO, won't do this anymore, just show the current week and automatically update when all pick results set
// can probably also get rid of currentWeek selector

class WeekSelectorAdmin extends React.Component {

  state = {
    weekSelectValue: null,
  };

  renderWeeks = () => {
    const weeks = [];

    for (let i = 1; i <= 17; i++) {
      weeks.push(<Select.Option key={ i } value={ i }>{`Week ${i}`}</Select.Option>);
    }

    return weeks;
  };

  handleWeekChange = weekSelectValue => {
    this.setState({ weekSelectValue });
  };

  handleWeekSave = () => {
    this.props.setCurrentWeek(this.state.weekSelectValue);
  };

  render() {
    return (
      <div className="week-selector-admin">
        <Select defaultValue={ this.props.currentWeek } size="large" onChange={ this.handleWeekChange } className="week-select">
          { this.renderWeeks() }
        </Select>

        { !!this.state.weekSelectValue && (this.state.weekSelectValue !== this.props.currentWeek) &&
        <Button type="primary" size="large" loading={ this.props.loading } onClick={ this.handleWeekSave }>
          Save
        </Button>
        }
      </div>
    );
  }
}

WeekSelectorAdmin.propTypes = {
  loading: PropTypes.bool,
  currentWeek: PropTypes.number,
  setCurrentWeek: PropTypes.func,
};

const mapStateToProps = state => ({
  loading: selectIsSubmitting(state),
  currentWeek: selectCurrentWeek(state),
});

const mapDispatchToProps = dispatch => ({
  setCurrentWeek: weekNumber => dispatch(setCurrentWeekAction(weekNumber)),
});

export default connect(mapStateToProps, mapDispatchToProps)(WeekSelectorAdmin);

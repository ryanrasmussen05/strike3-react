import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import WeekSelector from './weekSelector/WeekSelector';
import { showPlayerPickModalAction } from '../redux/actions/modal.actions';
import { Button } from 'antd';
import WeekSelectorAdmin from './weekSelector/WeekSelectorAdmin';

class Placeholder extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <div>
        <WeekSelector />
        <Button onClick={ this.props.showPlayerPickModal }>Show Player Pick Modal</Button>
        <WeekSelectorAdmin />
      </div>
    );
  }
}

Placeholder.propTypes = {
  showPlayerPickModal: PropTypes.func,
};

const mapStateToProps = () => ({
});

const mapDispatchToProps = dispatch => ({
  showPlayerPickModal: () => dispatch(showPlayerPickModalAction(true)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Placeholder);

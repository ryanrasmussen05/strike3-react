import React from 'react';
import './WeekTable.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectPlayersForSelectedWeek } from '../../redux/selectors/game.selectors';
import { Table } from 'antd';
import { columns } from './table.columns';

class WeekTable extends React.Component {

  render() {
    return (
      <div className="week-table">
        <Table columns={ columns } dataSource={ this.props.players } pagination={ false } rowKey="id" className="table" />
      </div>
    );
  }
}

WeekTable.propTypes = {
  players: PropTypes.array,
};

const mapStateToProps = state => ({
  players: selectPlayersForSelectedWeek(state),
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(WeekTable);

import React from 'react';
import './RosterTable.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Table } from 'antd';
import { columns } from './table.columns';
import { selectRosterPlayers } from '../../redux/selectors/admin.selectors';

class RosterTable extends React.Component {

  render() {
    return (
      <div className="roster-table">
        <Table
          dataSource={ this.props.players }
          columns={ columns }
          pagination={ false }
          rowKey="name"
          className="table"
        />
      </div>
    );
  }
}

RosterTable.propTypes = {
  players: PropTypes.array,
};

const mapStateToProps = state => ({
  players: selectRosterPlayers(state),
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(RosterTable);

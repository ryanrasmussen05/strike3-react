import React from 'react';
import './WeekTable.scss';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { selectPlayersForSelectedWeek, selectTieBreakerForSelectedWeek } from '../../redux/selectors/game.selectors';
import { Table } from 'antd';
import { columns, tieBreakerColumn } from './table.columns';
import WeekSelector from '../weekSelector/WeekSelector';
import { getSvgForTeam } from '../../util/teams.util';

class WeekTable extends React.Component {

  getRowClass = row => {
    let classes = 'pick-row';

    if (row.pick.status !== 'open') {
      classes = `${classes} ${row.pick.status}`;
    }

    return classes;
  };

  render() {
    const tableColumns = [...columns];

    if (this.props.tieBreaker) {
      tableColumns.push(tieBreakerColumn);
    }

    return (
      <div className="week-table">
        <div className="week-selector-container">
          <WeekSelector />
        </div>

        { this.renderTieBreakerHeader() }

        <Table
          columns={ tableColumns }
          dataSource={ this.props.players }
          pagination={ false }
          rowKey="id"
          className="table"
          rowClassName={ this.getRowClass }
        />
      </div>
    );
  }

  renderTieBreakerHeader = () => {
    if (this.props.tieBreaker) {
      return (
        <div className="tie-breaker-section">
          <div className="tie-breaker-container">
            <span className="tie-breaker-label">
              { `Tie Breaker ${this.props.tieBreaker.homeTeamPoints ? 'Final:' : 'Game:'}` }
            </span>

            { this.props.tieBreaker.awayTeamPoints &&
            <span className="tie-breaker-away-points">{ this.props.tieBreaker.awayTeamPoints }</span>
            }

            { getSvgForTeam(this.props.tieBreaker.awayTeam) }
            <span className="tie-breaker-vs">vs.</span>
            { getSvgForTeam(this.props.tieBreaker.homeTeam) }

            { this.props.tieBreaker.homeTeamPoints &&
            <span className="tie-breaker-home-points">{ this.props.tieBreaker.homeTeamPoints }</span>
            }
          </div>
        </div>

      );
    }

    return null;
  }
}

WeekTable.propTypes = {
  players: PropTypes.array,
  tieBreaker: PropTypes.object,
};

const mapStateToProps = state => ({
  players: selectPlayersForSelectedWeek(state),
  tieBreaker: selectTieBreakerForSelectedWeek(state),
});

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(WeekTable);

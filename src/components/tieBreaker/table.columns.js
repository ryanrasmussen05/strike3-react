/* eslint-disable react/display-name,react/no-multi-comp */
import React from 'react';
import { getSvgForTeam } from '../../util/teams.util';

export const columns = [
  {
    title: 'Week',
    dataIndex: 'week',
    align: 'left',
    render: week => <div>{ week }</div>,
  },
  {
    title: 'Game',
    dataIndex: 'homeTeam', // only because required, actually use full record
    align: 'center',
    render: (text, record) => {
      return (
        <div className="tie-breaker-table-game">
          { getSvgForTeam(record.awayTeam) }
          <span className="tie-breaker-table-team">{ record.awayTeam }</span>
          <span className="tie-breaker-table-vs">vs.</span>
          { getSvgForTeam(record.homeTeam) }
          <span className="tie-breaker-table-team">{ record.homeTeam }</span>
        </div>
      );
    },
  },
];

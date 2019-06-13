/* eslint-disable react/display-name,react/no-multi-comp,react/prop-types */
import React from 'react';
import { getSvgForTeam } from '../../util/teams.util';
import { Button } from 'antd';

export const createColumns = updateClickHandler => {
  return [
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

            <Button type="primary" className="update-button" onClick={ () => updateClickHandler(record) }>Update</Button>
          </div>
        );
      },
    },
  ];
};


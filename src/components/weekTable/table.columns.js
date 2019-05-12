/* eslint-disable react/display-name,react/no-multi-comp */
import React from 'react';
import { getSvgForTeam } from '../../util/teams.util';

export const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: name => <div>{ name }</div>,
  },
  {
    title: 'Pick',
    dataIndex: 'pick',
    key: 'pick',
    width: 112,
    align: 'center',
    render: pick => (
      <div className="week-table-logo">
        { getSvgForTeam(pick.team) }
        <span className="week-table-team">{ pick.team }</span>
      </div>
    ),
  },
];

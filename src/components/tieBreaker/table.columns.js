/* eslint-disable react/display-name,react/no-multi-comp,react/prop-types,no-nested-ternary */
import React from 'react';
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
        const gameCompleted = !!record.homeTeamPoints || !!record.awayTeamPoints;
        const homeTeamWin = gameCompleted && record.homeTeamPoints > record.awayTeamPoints;
        const awayTeamWin = gameCompleted && record.awayTeamPoints > record.homeTeamPoints;

        const awayTeamClass = gameCompleted ? (awayTeamWin ? 'win' : 'loss') : '';
        const homeTeamClass = gameCompleted ? (homeTeamWin ? 'win' : 'loss') : '';

        return (
          <div className="tie-breaker-table-game">
            <span className={ `tie-breaker-table-team ${ awayTeamClass }` }>
              { record.awayTeam }
            </span>

            { record.awayTeamPoints &&
            <span className={ awayTeamClass }>
              { `(${ record.awayTeamPoints })` }
            </span>
            }

            <span className="tie-breaker-table-vs">vs.</span>

            <span className={ `tie-breaker-table-team ${ homeTeamClass }` }>
              { record.homeTeam }
            </span>

            { record.homeTeamPoints &&
            <span className={ homeTeamClass }>
              { `(${ record.homeTeamPoints })` }
            </span>
            }

            <Button type="primary" className="update-button" onClick={ () => updateClickHandler(record) }>Update</Button>
          </div>
        );
      },
    },
  ];
};


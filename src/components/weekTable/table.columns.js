/* eslint-disable react/display-name,react/no-multi-comp */
import React from 'react';
import { getSvgForTeam } from '../../util/teams.util';
import PickColumnHeader from './PickColumnHeader';
import TieBreakerCell from './TieBreakerCell';

export const columns = [
  {
    title: 'Rank',
    dataIndex: 'rank',
    key: 'rank',
    align: 'center',
    render: rank => <div>{ rank }</div>,
  },
  {
    title: <div>Name<span className="strikes-label">(Strikes)</span></div>,
    dataIndex: 'name',
    key: 'name',
    render: (name, player) => (
      <div className={ player.pick.status === 'eliminated' ? '' : 'player-label' }>
        { name }
        { player.pick.status !== 'eliminated' &&
        <span className="strikes-label">{ `(${player.strikes})` }</span>
        }
      </div>
    ),
  },
  {
    title: <PickColumnHeader />,
    dataIndex: 'pick',
    key: 'pick',
    width: 120,
    align: 'center',
    render: pick => {
      if (pick.team && pick.team !== 'NP') {
        return (
          <div className="week-table-logo">
            { getSvgForTeam(pick.team) }
            <span className="week-table-team">{ pick.team }</span>
          </div>
        );
      }
      if (pick.status === 'eliminated') {
        return (
          <div className="week-table-eliminated">OUT</div>
        );
      }
      if (pick.team === 'NP') {
        return (
          <div className="week-table-eliminated">NP</div>
        );
      }
      return (
        <div className="week-table-no-pick">- - - - -</div>
      );
    },
  },
];

export const tieBreakerColumn = {
  title: 'Tie Breaker',
  width: 120,
  align: 'center',
  render: player => {
    if (player.pick.tieBreakerHomeTeamPoints) {
      return <TieBreakerCell awayTeamPoints={ player.pick.tieBreakerAwayTeamPoints } homeTeamPoints={ player.pick.tieBreakerHomeTeamPoints } />;
    }
    return null;
  },
};

/* eslint-disable react/display-name,react/no-multi-comp */
import React from 'react';
import { getSvgForTeam } from '../../util/teams.util';
import TieBreakerCell from './TieBreakerCell';

export const columns = [
  {
    title: 'Rank',
    dataIndex: 'rank',
    key: 'rank',
    align: 'center',
    width: 20,
    render: rank => <div className="rank">{ rank }</div>,
  },
  {
    title: 'Player/Pick',
    render: player => (
      <div className="player-pick-column">

        <div className="team-logo">
          { player.pick.team &&
            getSvgForTeam(player.pick.team)
          }
          { (!player.pick.team || player.pick.team === 'NP') && player.pick.status !== 'eliminated' &&
            getSvgForTeam('unknown')
          }
        </div>

        <div className="details-section">
          <div className="player-name">{ player.name }</div>

          { player.pick.team === 'NP' &&
            <div className="player-pick">NO PICK</div>
          }
          { player.pick.status === 'eliminated' &&
            <div className="player-pick">OUT</div>
          }
          { player.pick.status !== 'eliminated' && player.pick.team !== 'NP' &&
            <div className="player-pick">{ player.pick.team }</div>
          }
        </div>

      </div>
    ),
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

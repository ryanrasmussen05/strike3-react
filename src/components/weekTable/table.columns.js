/* eslint-disable react/display-name,react/no-multi-comp,complexity */
import React from 'react';
import { getSvgForTeam } from '../../util/teams.util';
import TieBreakerCell from './TieBreakerCell';
import { StrikeSvg } from '../../assets/strike';
import { HalfStrikeSvg } from '../../assets/half.strike';

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
    className: 'player-pick-column-header',
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
          <div className="player-name">
            { player.name }

            <div className="strikes">
              { player.strikes === 0.5 && <HalfStrikeSvg /> }
              { player.strikes === 1 && <StrikeSvg /> }
              { player.strikes === 1.5 && <React.Fragment><StrikeSvg /><HalfStrikeSvg /></React.Fragment> }
              { player.strikes === 2 && <React.Fragment><StrikeSvg /><StrikeSvg /></React.Fragment> }
              { player.strikes === 2.5 && <React.Fragment><StrikeSvg /><StrikeSvg /><HalfStrikeSvg /></React.Fragment> }
            </div>
          </div>

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
    } else if (player.pick.status !== 'eliminated') {
      return <div>- - -</div>;
    }

    return null;
  },
};

/* eslint-disable curly,one-var,complexity */

const weekHasTieBreaker = (weekNumber, tieBreakers) => {
  const tieBreaker = tieBreakers[weekNumber];
  const isTieBreakerValid = !!tieBreaker && typeof tieBreaker.awayTeamPoints !== 'undefined';
  return isTieBreakerValid
};

const sortPlayersByTieBreaker = (playerA, playerB, eliminationWeek, tieBreakers) => {
  const game = tieBreakers[eliminationWeek];
  const awayTeamPoints = parseInt(game.awayTeamPoints, 10);
  const homeTeamPoints = parseInt(game.homeTeamPoints, 10);

  let winningTeam;
  if (homeTeamPoints > awayTeamPoints) winningTeam = game.homeTeam;
  if (homeTeamPoints < awayTeamPoints) winningTeam = game.awayTeam;

  const playerAPick = playerA.picks[eliminationWeek - 1];
  const playerBPick = playerB.picks[eliminationWeek - 1];

  // if either player is missing the tie breaker pick
  if (!!playerAPick.tieBreakerHomeTeamPoints && !playerBPick.tieBreakerHomeTeamPoints) return -1;
  if (!playerAPick.tieBreakerHomeTeamPoints && !!playerBPick.tieBreakerHomeTeamPoints) return 1;
  if (!playerAPick.tieBreakerHomeTeamPoints && !playerBPick.tieBreakerHomeTeamPoints) return 0;

  const playerAAwayTeamPoints = parseInt(playerAPick.tieBreakerAwayTeamPoints, 10);
  const playerAHomeTeamPoints = parseInt(playerAPick.tieBreakerHomeTeamPoints, 10);
  let playerAWinningTeam;
  if (playerAHomeTeamPoints > playerAAwayTeamPoints) playerAWinningTeam = game.homeTeam;
  if (playerAHomeTeamPoints < playerAAwayTeamPoints) playerAWinningTeam = game.awayTeam;

  const playerBAwayTeamPoints = parseInt(playerBPick.tieBreakerAwayTeamPoints, 10);
  const playerBHomeTeamPoints = parseInt(playerBPick.tieBreakerHomeTeamPoints, 10);
  let playerBWinningTeam;
  if (playerBHomeTeamPoints > playerBAwayTeamPoints) playerBWinningTeam = game.homeTeam;
  if (playerBHomeTeamPoints < playerBAwayTeamPoints) playerBWinningTeam = game.awayTeam;

  // if one player got winning team right and other player didn't (Phase 1)
  if (playerAWinningTeam === winningTeam && playerBWinningTeam !== winningTeam) return -1;
  if (playerAWinningTeam !== winningTeam && playerBWinningTeam === winningTeam) return 1;

  const playerAScore = Math.abs(playerAHomeTeamPoints - homeTeamPoints) + Math.abs(playerAAwayTeamPoints - awayTeamPoints);
  const playerBScore = Math.abs(playerBHomeTeamPoints - homeTeamPoints) + Math.abs(playerBAwayTeamPoints - awayTeamPoints);

  // compare total score offsets, lower wins (Phase 2)
  if (playerAScore < playerBScore) return -1;
  if (playerAScore > playerBScore) return 1;

  // compare score offsets from winning team (Phase 3)
  const winningSidePoints = homeTeamPoints > awayTeamPoints ? 'tieBreakerHomeTeamPoints' : 'tieBreakerAwayTeamPoints';
  const playerAWinningTeamPoints = parseInt(playerAPick[winningSidePoints], 10);
  const playerBWinningTeamPoints = parseInt(playerBPick(winningSidePoints), 10);
  const actualWinningTeamPoints = homeTeamPoints > awayTeamPoints ? homeTeamPoints : awayTeamPoints;
  const playerADifference = Math.abs(playerAWinningTeamPoints - actualWinningTeamPoints);
  const playerBDifference = Math.abs(playerBWinningTeamPoints - actualWinningTeamPoints);
  if (playerADifference < playerBDifference) return -1;
  if (playerBDifference < playerADifference) return 1;

  return 0;
};

// determine all player ranks and sort by rank
exports.rankPlayers = async(players, tieBreakers, week) => {

  // first sort player
  players.sort((a, b) => {
    if (a.eliminationWeek > b.eliminationWeek) return -1;
    if (a.eliminationWeek < b.eliminationWeek) return 1;

    if (weekHasTieBreaker(a.eliminationWeek, tieBreakers)) {
      const tieBreakerValue = sortPlayersByTieBreaker(a, b, a.eliminationWeek, tieBreakers);
      if (tieBreakerValue !== 0) return tieBreakerValue;
    }

    if (a.strikes < b.strikes) return -1;
    if (a.strikes > b.strikes) return 1;

    // handle players who both haven't struck out in Week 17 and have same number of strikes
    if (week === 17 && weekHasTieBreaker(17, tieBreakers)) {
      const tieBreakerValue = sortPlayersByTieBreaker(a, b, 17, tieBreakers);
      if (tieBreakerValue !== 0) return tieBreakerValue;
    }

    if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
    if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
    return 0;
  });

  // determine ranks
  let currentRank = 1;

  for (let index = 0; index < players.length; index++) {
    const player = players[index];
    const prevPlayer = players[index - 1];

    if (prevPlayer) {
      let isTied = player.strikes === prevPlayer.strikes && player.eliminationWeek === prevPlayer.eliminationWeek;

      // if same number of strikes and same elimination week, check tie breaker
      if (isTied && weekHasTieBreaker(player.eliminationWeek, tieBreakers)) {
        // since player are sorted, if sort doesn't return 0 we can assume player is ranked lower
        isTied = sortPlayersByTieBreaker(prevPlayer, player, player.eliminationWeek, tieBreakers) === 0;
      }

      // handle players who haven't struck out and have same # of strikes on week 17
      if (isTied && week === 17 && weekHasTieBreaker(17, tieBreakers)) {
        // since player are sorted, if sort doesn't return 0 we can assume player is ranked lower
        isTied = sortPlayersByTieBreaker(prevPlayer, player, 17, tieBreakers) === 0;
      }

      // if player is not tied with prevPlayer, since players are sorted we know this player is ranked lower than prev
      if (!isTied) {
        currentRank = index + 1;
      }
    }

    player.rank = currentRank;
  }
};


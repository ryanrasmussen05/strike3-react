/* eslint-disable curly */

// determine all player ranks and sort by rank
exports.rankPlayers = async players => {

  // first sort player
  players.sort((a, b) => {
    if (a.eliminationWeek > b.eliminationWeek) return -1;
    if (a.eliminationWeek < b.eliminationWeek) return 1;
    if (a.strikes < b.strikes) return -1;
    if (a.strikes > b.strikes) return 1;
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
      const isTied = player.strikes === prevPlayer.strikes && player.eliminationWeek === prevPlayer.eliminationWeek;

      // if player is not tied with prevPlayer, since players are sorted we know this player is ranked lower than prev
      if (!isTied) {
        currentRank = index + 1;
      }
    }

    player.rank = currentRank;
  }
};

/* eslint-disable no-use-before-define */
const weekPath = `week`;
const playersPath = `players`;
const picksPath = `picks`;

// TODO factor out common functions to util file
exports.handler = async(context, database) => {
  const weekSnapshot = await database.ref(weekPath).once('value');
  const week = weekSnapshot.val();

  const playersSnapshot = await database.ref(playersPath).once('value');
  const dbPlayers = playersSnapshot.val();

  let players = [];

  if (dbPlayers) {
    const results = [];

    Object.keys(dbPlayers).forEach(async playerId => {
      results.push(buildPlayerModel(dbPlayers[playerId], database));
    });

    players = await Promise.all(results);
  }

  // TODO add rank and sort by rank

  return { week, players };
};

const buildPlayerModel = async(dbPlayer, database) => {
  const player = {};
  player.id = dbPlayer.id;
  player.name = dbPlayer.name;
  player.admin = dbPlayer.admin || false;
  player.superuser = dbPlayer.superuser || false;
  player.picks = [];

  const dbPlayerPicksSnapshot = await database.ref(`${picksPath}/${dbPlayer.id}`).once('value');
  const dbPlayerPicks = dbPlayerPicksSnapshot.val();

  for (let i = 1; i <= 17; i++) {
    if (dbPlayerPicks && dbPlayerPicks[i]) {
      player.picks.push({
        week: i,
        team: dbPlayerPicks[i].team,
        status: dbPlayerPicks[i].status,
      });
    } else {
      // TODO add 'eliminated' flag
      player.picks.push({
        week: i,
        team: null,
        status: 'open',
      });
    }
  }

  return player;
};

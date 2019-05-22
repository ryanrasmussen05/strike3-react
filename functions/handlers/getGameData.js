const buildPlayerModel = require('../helpers/buildPlayerModel').buildPlayerModel;

const weekPath = `week`;
const playersPath = `players`;

exports.handler = async(context, database) => {
  const loggedInUserId = context.auth ? context.auth.uid : null;

  const weekSnapshot = await database.ref(weekPath).once('value');
  const week = weekSnapshot.val();

  const playersSnapshot = await database.ref(playersPath).once('value');
  const dbPlayers = playersSnapshot.val();

  let players = [];

  if (dbPlayers) {
    const results = [];

    Object.keys(dbPlayers).forEach(async playerId => {
      results.push(buildPlayerModel(dbPlayers[playerId], database, loggedInUserId, false));
    });

    players = await Promise.all(results);
  }

  // TODO add rank and sort by rank

  return { week, players };
};

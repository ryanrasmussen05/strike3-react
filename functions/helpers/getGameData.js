const functions = require('firebase-functions');
const isAdmin = require('../helpers/isAdmin').isAdmin;
const buildPlayerModel = require('../helpers/buildPlayerModel').buildPlayerModel;
const rankPlayers = require('../helpers/rankPlayers').rankPlayers;

const weekPath = `week`;
const playersPath = `players`;

exports.getGameData = async(context, database, adminVersion) => {

  if (adminVersion) {
    const isUserAdmin = await isAdmin(context, database);

    if (!isUserAdmin) {
      throw new functions.https.HttpsError('permission-denied', 'only admin can call this function');
    }
  }

  const loggedInUserId = context.auth ? context.auth.uid : null;

  const weekSnapshot = await database.ref(weekPath).once('value');
  const week = weekSnapshot.val();

  const playersSnapshot = await database.ref(playersPath).once('value');
  const dbPlayers = playersSnapshot.val();

  let players = [];

  if (dbPlayers) {
    const results = [];

    Object.keys(dbPlayers).forEach(async playerId => {
      results.push(buildPlayerModel(dbPlayers[playerId], database, loggedInUserId, adminVersion));
    });

    players = await Promise.all(results);
  }

  await rankPlayers(players);

  return { week, players };
};

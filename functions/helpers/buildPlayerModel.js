/* eslint-disable complexity */

// build front-end player model given dbPlayer
exports.buildPlayerModel = async(dbPlayer, database, loggedInUserId, isAdmin) => {
  const picksPath = `picks`;

  const player = {};
  player.id = dbPlayer.id;
  player.name = dbPlayer.name;
  player.admin = dbPlayer.admin || false;
  player.superuser = dbPlayer.superuser || false;
  player.picks = [];

  const dbPlayerPicksSnapshot = await database.ref(`${picksPath}/${dbPlayer.id}`).once('value');
  const dbPlayerPicks = dbPlayerPicksSnapshot.val();

  let totalStrikes = 0;
  let eliminationWeek = 100;

  for (let i = 1; i <= 17; i++) {
    // if pick for this week exists in DB
    if (dbPlayerPicks && dbPlayerPicks[i]) {

      // can edit if user is admin, or user owns pick and its still open
      let isEditable = isAdmin;
      isEditable = isEditable || (dbPlayer.id === loggedInUserId && dbPlayerPicks[i].status === 'open');

      if (isEditable && !isAdmin) {
        // TODO check if game has started, if it has then isEditable = false
      }

      // TODO add a check for isVisible, only push pick to array if admin, or game started, or user owns pick, or result is set

      player.picks.push({
        week: i,
        locked: !isEditable,
        team: dbPlayerPicks[i].team,
        status: dbPlayerPicks[i].status,
      });

      // update strike count to determine if eliminated
      if (dbPlayerPicks[i].status === 'loss') {
        totalStrikes = totalStrikes + 1;
      } else if (dbPlayerPicks[i].status === 'tie') {
        totalStrikes = totalStrikes + 0.5;
      }

      // if eliminated, set elimination week
      if (totalStrikes >= 3) {
        eliminationWeek = i;
      }

    // if pick for this week does not exists in DB
    } else {

      // can edit if user is admin, or user owns pick
      let isEditable = isAdmin;
      isEditable = isEditable || (dbPlayer.id === loggedInUserId);

      player.picks.push({
        week: i,
        locked: totalStrikes >= 3 ? true : !isEditable,
        team: null,
        status: totalStrikes >= 3 ? 'eliminated' : 'open',
      });
    }
  }

  player.strikes = totalStrikes;
  player.eliminationWeek = eliminationWeek;

  return player;
};

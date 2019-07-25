/* eslint-disable complexity,max-params,max-statements */
const getGameTime = require('./getGameTime').getGameTime;

// determine if the tie breaker game is locked for current week, return false if tie breaker doesn't exist
const isTieBreakerLocked = (week, tieBreakers, schedule) => {
  const tieBreakerGame = tieBreakers[week];

  if (tieBreakerGame) {
    const tieBreakerGameTime = getGameTime(schedule, week, tieBreakerGame.awayTeam);
    return Date.now() > tieBreakerGameTime;
  }

  return false;
};

// build front-end player model given dbPlayer
exports.buildPlayerModel = async(dbPlayer, database, loggedInUserId, schedule, tieBreakers, isAdmin) => {
  const picksPath = `picks`;

  const player = {};
  player.id = dbPlayer.id;
  player.name = dbPlayer.name;
  player.admin = dbPlayer.admin || false;
  player.superuser = dbPlayer.superuser || false;
  player.picks = [];

  if (isAdmin) {
    player.email = dbPlayer.email;
  }

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

      // cannot edit pick if not admin and game has started
      if (isEditable && !isAdmin) {
        const gameStartTime = getGameTime(schedule, i, dbPlayerPicks[i].team);
        isEditable = Date.now() < gameStartTime;
      }

      // TODO add a check for isVisible, only push pick to array if admin, or game started, or user owns pick, or result is set

      player.picks.push({
        week: i,
        locked: !isEditable,
        team: dbPlayerPicks[i].team,
        status: dbPlayerPicks[i].status,
        tieBreakerAwayTeamPoints: dbPlayerPicks[i].tieBreakerAwayTeamPoints,
        tieBreakerHomeTeamPoints: dbPlayerPicks[i].tieBreakerHomeTeamPoints,
        tieBreakerLocked: isTieBreakerLocked(i, tieBreakers, schedule),
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
        tieBreakerLocked: isTieBreakerLocked(i, tieBreakers, schedule),
      });
    }
  }

  player.strikes = totalStrikes;
  player.eliminationWeek = eliminationWeek;

  return player;
};

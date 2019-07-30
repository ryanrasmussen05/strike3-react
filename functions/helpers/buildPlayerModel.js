/* eslint-disable complexity,max-params,max-statements */
const getGameTime = require('./getGameTime').getGameTime;

// determine if the tie breaker game is locked for current week, return false if tie breaker doesn't exist
const isTieBreakerLocked = (week, tieBreakers, schedule) => {
  const tieBreakerGame = tieBreakers ? tieBreakers[week] : null;

  if (tieBreakerGame) {
    const tieBreakerGameTime = getGameTime(schedule, week, tieBreakerGame.awayTeam);
    return Date.now() > tieBreakerGameTime;
  }

  return false;
};

// determine if the details of given pick should be return as viewable
const isPickViewable = (dbPick, dbPlayer, week, loggedInUserId, schedule, isAdmin) => {
  // admin version
  let isViewable = isAdmin;

  // logged in player owns pick
  isViewable = isViewable || dbPlayer.id === loggedInUserId;

  // pick has a result set
  isViewable = isViewable || dbPick.status !== 'open';

  // game has begun
  isViewable = isViewable || Date.now() > getGameTime(schedule, week, dbPick.team);

  return isViewable;
};

// determine if the associated tie breaker pick should be returned as viewable
const isTieBreakerPickViewable = (dbPlayer, loggedInUserId, isAdmin, tieBreakerLocked) => {
  // admin version
  let isViewable = isAdmin;

  // logged in player owns pick
  isViewable = isViewable || dbPlayer.id === loggedInUserId;

  // tie breaker is locked (the game has started)
  isViewable = isViewable || tieBreakerLocked;

  return isViewable;
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

  const dbPlayerPicksSnapshot = await database.ref(`${ picksPath }/${ dbPlayer.id }`).once('value');
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
      if (isEditable && !isAdmin && dbPlayerPicks[i].team !== 'NP') {
        const gameStartTime = getGameTime(schedule, i, dbPlayerPicks[i].team);
        isEditable = Date.now() < gameStartTime;
      }

      const isPickVisible = isPickViewable(dbPlayerPicks[i], dbPlayer, i, loggedInUserId, schedule, isAdmin);
      const isTieBreakerPickVisible = isTieBreakerPickViewable(dbPlayer, loggedInUserId, isAdmin, isTieBreakerLocked(i, tieBreakers, schedule));

      // if the user is allowed to view this pick, return all information, else return blank placeholder pick
      if (isPickVisible) {
        player.picks.push({
          week: i,
          locked: !isEditable,
          team: dbPlayerPicks[i].team,
          status: dbPlayerPicks[i].status,
          tieBreakerAwayTeamPoints: isTieBreakerPickVisible ? dbPlayerPicks[i].tieBreakerAwayTeamPoints : undefined,
          tieBreakerHomeTeamPoints: isTieBreakerPickVisible ? dbPlayerPicks[i].tieBreakerHomeTeamPoints : undefined,
          tieBreakerLocked: isTieBreakerLocked(i, tieBreakers, schedule),
        });
      } else {
        player.picks.push({
          week: i,
          locked: totalStrikes >= 3 ? true : !isEditable,
          team: null,
          status: totalStrikes >= 3 ? 'eliminated' : 'open',
          tieBreakerAwayTeamPoints: isTieBreakerPickVisible ? dbPlayerPicks[i].tieBreakerAwayTeamPoints : undefined,
          tieBreakerHomeTeamPoints: isTieBreakerPickVisible ? dbPlayerPicks[i].tieBreakerHomeTeamPoints : undefined,
          tieBreakerLocked: isTieBreakerLocked(i, tieBreakers, schedule),
        });
      }

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

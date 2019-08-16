/* eslint-disable complexity,max-params,max-statements,curly */
const getGameTime = require('./getGameTime').getGameTime;
const getPickDeadlineForWeek = require('./getPickDeadlineForWeek').getPickDeadlineForWeek;

// given player picks and week, determine if player is eliminated for given week
const isPlayerEliminated = (week, playerPicks) => {
  let strikes = 0;

  for (let i = 1; i < week; i++) {
    const pick = playerPicks[i];
    if (pick && pick.status === 'loss') strikes = strikes + 1;
    if (pick && pick.status === 'tie') strikes = strikes + 0.5;
  }

  return strikes >= 3;
};

// determine if logged in player has made pick for given week (returns true if player is eliminated)
const loggedInPlayerHasMadePickForWeek = (week, loggedInUserId, allPicks) => {
  if (loggedInUserId) {
    const loggedInUserPicks = allPicks[loggedInUserId];

    if (loggedInUserPicks) {
      return !!loggedInUserPicks[week] || isPlayerEliminated(loggedInUserPicks);
    }
  }

  return false;
};

// determine if the tie breaker game is locked for current week, return false if tie breaker doesn't exist
const isTieBreakerLocked = (week, tieBreakers, schedule, weekDeadline) => {
  const tieBreakerGame = tieBreakers ? tieBreakers[week] : null;

  if (tieBreakerGame) {
    // tie breaker selection is locked if past noon on sunday
    if (Date.now() > weekDeadline) {
      return true;
    }

    const tieBreakerGameTime = getGameTime(schedule, week, tieBreakerGame.awayTeam);
    return Date.now() > tieBreakerGameTime;
  }

  return false;
};

// determine if the details of given pick should be return as viewable
const isPickViewable = (dbPick, dbPlayer, week, loggedInUserId, schedule, allPicks, weekDeadline, isAdmin) => {
  // admin version
  let isViewable = isAdmin;

  // logged in player owns pick
  isViewable = isViewable || dbPlayer.id === loggedInUserId;

  const deadlinePassed = Date.now() > weekDeadline;

  if (loggedInUserId) {
    // player is logged in, week deadline has passed, and player has made a pick for week
    const playerHasMadePick = loggedInPlayerHasMadePickForWeek(week, loggedInUserId, allPicks);
    isViewable = isViewable || (deadlinePassed && playerHasMadePick);
  } else {
    // player is not logged in, week deadline has passed, and the pick result is set
    isViewable = isViewable || (deadlinePassed && dbPick.status !== 'open');
  }

  return isViewable;
};

// build front-end player model given dbPlayer
exports.buildPlayerModel = async(dbPlayer, database, loggedInUserId, schedule, tieBreakers, allPicks, isAdmin) => {
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
    const weekDeadline = getPickDeadlineForWeek(i, schedule);

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

      // cannot edit pick if not admin and past 12 on Sunday
      if (isEditable && !isAdmin) {
        isEditable = Date.now() < weekDeadline;
      }

      const isPickVisible = isPickViewable(dbPlayerPicks[i], dbPlayer, i, loggedInUserId, schedule, allPicks, weekDeadline, isAdmin);

      // if the user is allowed to view this pick, return all information, else return blank placeholder pick
      if (isPickVisible) {
        player.picks.push({
          week: i,
          locked: !isEditable,
          team: dbPlayerPicks[i].team,
          status: dbPlayerPicks[i].status,
          tieBreakerAwayTeamPoints: dbPlayerPicks[i].tieBreakerAwayTeamPoints,
          tieBreakerHomeTeamPoints: dbPlayerPicks[i].tieBreakerHomeTeamPoints,
          tieBreakerLocked: isTieBreakerLocked(i, tieBreakers, schedule, weekDeadline),
        });
      } else {
        player.picks.push({
          week: i,
          locked: totalStrikes >= 3 ? true : !isEditable,
          team: null,
          status: totalStrikes >= 3 ? 'eliminated' : 'open',
          tieBreakerAwayTeamPoints: undefined,
          tieBreakerHomeTeamPoints: undefined,
          tieBreakerLocked: isTieBreakerLocked(i, tieBreakers, schedule, weekDeadline),
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

      // can edit if user owns pick and deadline hasn't passed
      if (dbPlayer.id === loggedInUserId) {
        isEditable = isEditable || Date.now() < weekDeadline;
      }

      player.picks.push({
        week: i,
        locked: totalStrikes >= 3 ? true : !isEditable,
        team: null,
        status: totalStrikes >= 3 ? 'eliminated' : 'open',
        tieBreakerLocked: isTieBreakerLocked(i, tieBreakers, schedule, weekDeadline),
      });
    }
  }

  player.strikes = totalStrikes;
  player.eliminationWeek = eliminationWeek;

  return player;
};

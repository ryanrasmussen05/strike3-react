// if user was eliminated, delete any picks they have after elimination week
exports.deleteFuturePicks = async(allExistingPicks, userId, database) => {
  let strikes = 0;

  for (const existingPick of allExistingPicks) {
    if (strikes >= 3 && !!existingPick.team) {
      // eslint-disable-next-line no-await-in-loop
      await database.ref(`picks/${userId}/${existingPick.week}`).remove();
    }

    if (existingPick.status === 'loss') {
      strikes = strikes + 1.0;
    } else if (existingPick.status === 'tie') {
      strikes = strikes + 0.5;
    }
  }
};

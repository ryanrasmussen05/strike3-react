// check if logged in player is admin
exports.isAdmin = async(context, database) => {

  const loggedInUserId = context.auth ? context.auth.uid : null;

  if (!loggedInUserId) {
    return false;
  }

  const playerPath = `players/${loggedInUserId}`;

  const playerSnapshot = await database.ref(playerPath).once('value');
  const player = playerSnapshot.val();

  if (player && (player.admin || player.superuser)) {
    return true;
  }

  return false;
};

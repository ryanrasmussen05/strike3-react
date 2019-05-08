exports.handler = async(context, database) => {
  const weekPath = `week`;

  const weekSnapshot = await database.ref(weekPath).once('value');
  const week = weekSnapshot.val();

  // TODO eventually this will use auth data and pull picks etc...

  return { week };
};

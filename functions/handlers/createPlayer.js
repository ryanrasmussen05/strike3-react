exports.handler = async(user, context, database) => {
  const path = `players/${user.id}`;

  await database.ref(path).set(user);

  return { user };
};

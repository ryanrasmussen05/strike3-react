exports.handler = async(user, context, database) => {
  const path = `users/${user.id}`;

  await database.ref(path).set(user);

  return { user };
};

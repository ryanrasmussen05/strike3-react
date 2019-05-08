exports.handler = async(weekNumber, context, database) => {
  const path = `week`;

  await database.ref(path).set(weekNumber);

  return { };
};

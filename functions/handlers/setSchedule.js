exports.handler = async(schedule, context, database) => {
  const path = `schedule/`;

  await database.ref(path).set(schedule);

  return {};
};

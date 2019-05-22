const getGameData = require('../helpers/getGameData').getGameData;

exports.handler = async(context, database) => {
  return getGameData(context, database, false);
};

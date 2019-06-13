const createPlayerFunction = require('./handlers/createPlayer');
const getGameDataFunction = require('./handlers/getGameData');
const getGameDataAdminFunction = require('./handlers/getGameDataAdmin');
const setPickFunction = require('./handlers/setPick');
const setPickAdminFunction = require('./handlers/setPickAdmin');
const createTieBreakerFunction = require('./handlers/createTieBreaker');
const updateTieBreakerFunction = require('./handlers/updateTieBreaker');
const deleteTieBreakerFunction = require('./handlers/deleteTieBreaker');
const setScheduleFunction = require('./handlers/setSchedule');
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const database = admin.database();

exports.createPlayer = functions.https.onCall(async(data, context) => {
  return createPlayerFunction.handler(data, context, database);
});

exports.getGameData = functions.https.onCall(async(data, context) => {
  return getGameDataFunction.handler(context, database);
});

exports.getGameDataAdmin = functions.https.onCall(async(data, context) => {
  return getGameDataAdminFunction.handler(context, database);
});

exports.setPick = functions.https.onCall(async(data, context) => {
  return setPickFunction.handler(data, context, database);
});

exports.setPickAdmin = functions.https.onCall(async(data, context) => {
  return setPickAdminFunction.handler(data, context, database);
});

exports.createTieBreaker = functions.https.onCall(async(data, context) => {
  return createTieBreakerFunction.handler(data, context, database);
});

exports.updateTieBreaker = functions.https.onCall(async(data, context) => {
  return updateTieBreakerFunction.handler(data, context, database);
});

exports.deleteTieBreaker = functions.https.onCall(async(data, context) => {
  return deleteTieBreakerFunction.handler(data, context, database);
});

exports.setSchedule = functions.https.onCall(async(data, context) => {
  return setScheduleFunction.handler(data, context, database);
});

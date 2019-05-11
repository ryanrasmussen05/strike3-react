const createPlayerFunction = require('./handlers/createPlayer');
const getGameDataFunction = require('./handlers/getGameData');
const setWeekFunction = require('./handlers/setWeek');
const setPickFunction = require('./handlers/setPick');
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

exports.setWeek = functions.https.onCall(async(data, context) => {
  return setWeekFunction.handler(data, context, database);
});

exports.setPick = functions.https.onCall(async(data, context) => {
  return setPickFunction.handler(data, context, database);
});

const createPlayerFunction = require('./handlers/createPlayer');
const getGameDataFunction = require('./handlers/getGameData');
const getGameDataAdminFunction = require('./handlers/getGameDataAdmin');
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

exports.getGameDataAdmin = functions.https.onCall(async(data, context) => {
  return getGameDataAdminFunction.handler(context, database);
});

exports.setPick = functions.https.onCall(async(data, context) => {
  return setPickFunction.handler(data, context, database);
});

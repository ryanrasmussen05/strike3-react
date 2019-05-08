const createUserFunction = require('./createUser');
const getGameDataFunction = require('./getGameData');
const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();

const database = admin.database();

exports.createUser = functions.https.onCall(async(data, context) => {
  return createUserFunction.handler(data, context, database);
});

exports.getGameData = functions.https.onCall(async(data, context) => {
  return getGameDataFunction.handler(context, database);
});

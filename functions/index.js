const createPlayerFunction = require('./handlers/createPlayer');
const getGameDataFunction = require('./handlers/getGameData');
const getGameDataAdminFunction = require('./handlers/getGameDataAdmin');
const setPickFunction = require('./handlers/setPick');
const setTieBreakerPickFunction = require('./handlers/setTieBreakerPick');
const setPickAdminFunction = require('./handlers/setPickAdmin');
const createTieBreakerFunction = require('./handlers/createTieBreaker');
const updateTieBreakerFunction = require('./handlers/updateTieBreaker');
const deleteTieBreakerFunction = require('./handlers/deleteTieBreaker');
const setScheduleFunction = require('./handlers/setSchedule');
const sendEmailFunction = require('./handlers/sendEmail');
const sendReminderEmailFunction = require('./handlers/pickReminderEmail');
const sendPicksLockedEmailFunction = require('./handlers/picksLockedEmail');
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

exports.setTieBreakerPick = functions.https.onCall(async(data, context) => {
  return setTieBreakerPickFunction.handler(data, context, database);
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

exports.sendEmail = functions.https.onCall(async data => {
  return sendEmailFunction.handler(data);
});

exports.sendReminderEmail = functions.pubsub.schedule('0 12 * * 6').timeZone('America/Chicago').onRun(() => {
  return sendReminderEmailFunction.handler(database);
});

exports.sendPicksLockedEmail = functions.pubsub.schedule('0 12 * * 0').timeZone('America/Chicago').onRun(() => {
  return sendPicksLockedEmailFunction.handler(database);
});

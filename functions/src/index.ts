import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { createPlayerHandler } from './handlers/createPlayer';
import { getGameDataHandler } from './handlers/getGameData';
import { getGameDataAdminHandler } from './handlers/getGameDataAdmin';
import { setTieBreakerPickHandler } from './handlers/setTieBreakerPick';
import { setPickAdminHandler } from './handlers/setPickAdmin';
import { setPickHandler } from './handlers/setPick';
import { updateTieBreakerHandler } from './handlers/updateTieBreaker';
import { createTieBreakerHandler } from './handlers/createTieBreaker';
import { sendEmailHandler } from './handlers/sendEmail';
import { deleteTieBreakerHandler } from './handlers/deleteTieBreaker';
import { setScheduleHandler } from './handlers/setSchedule';
import { sendReminderEmailHandler } from './handlers/pickReminderEmail';
import { sendPicksLockedEmailHandler } from './handlers/picksLockedEmail';

admin.initializeApp();

const database = admin.database();

export const createPlayer = functions.https.onCall(async(data, context) => {
  return createPlayerHandler(data, context, database);
});

export const getGameData = functions.https.onCall(async(data, context) => {
  return getGameDataHandler(context, database);
});

export const getGameDataAdmin = functions.https.onCall(async(data, context) => {
  return getGameDataAdminHandler(context, database);
});

export const setPick = functions.https.onCall(async(data, context) => {
  return setPickHandler(data, context, database);
});

export const setTieBreakerPick = functions.https.onCall(async(data, context) => {
  return setTieBreakerPickHandler(data, context, database);
});

export const setPickAdmin = functions.https.onCall(async(data, context) => {
  return setPickAdminHandler(data, context, database);
});

export const createTieBreaker = functions.https.onCall(async(data, context) => {
  return createTieBreakerHandler(data, context, database);
});

export const updateTieBreaker = functions.https.onCall(async(data, context) => {
  return updateTieBreakerHandler(data, context, database);
});

export const deleteTieBreaker = functions.https.onCall(async(data, context) => {
  return deleteTieBreakerHandler(data, context, database);
});

export const setSchedule = functions.https.onCall(async(data, context) => {
  return setScheduleHandler(data, context, database);
});

export const sendEmail = functions.https.onCall(async data => {
  return sendEmailHandler(data);
});

export const sendReminderEmail = functions.pubsub.schedule('0 12 * * 6').timeZone('America/Chicago').onRun(() => {
  return sendReminderEmailHandler(database);
});

export const sendPicksLockedEmail = functions.pubsub.schedule('0 12 * * 0').timeZone('America/Chicago').onRun(() => {
  return sendPicksLockedEmailHandler(database);
});

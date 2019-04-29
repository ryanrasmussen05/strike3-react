const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

exports.addUser = functions.https.onCall((data, context) => {

  console.log('data', data);
  console.log('context.auth', context.auth);

  return { fromServer: 'it worked' };
});

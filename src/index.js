import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configureStore from './redux/store/store';
import { Provider } from 'react-redux';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/functions';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
};

firebase.initializeApp(firebaseConfig);

const reduxStore = configureStore();

ReactDOM.render(<Provider store={ reduxStore }><App /></Provider>, document.getElementById('root'));

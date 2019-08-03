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
  apiKey: 'AIzaSyAJG85EJA1lBmYS31zcOqjSECZ2YSpWHxo',
  authDomain: 'strike3-31769.firebaseapp.com',
  databaseURL: 'https://strike3-31769.firebaseio.com',
  projectId: 'strike3-31769',
  storageBucket: 'strike3-31769.appspot.com',
};

firebase.initializeApp(firebaseConfig);

const reduxStore = configureStore();

ReactDOM.render(<Provider store={ reduxStore }><App /></Provider>, document.getElementById('root'));

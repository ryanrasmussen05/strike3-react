import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import configureStore from './redux/store/store';
import { Provider } from 'react-redux';
import * as firebase from 'firebase/app';
import 'firebase/auth';

const reduxStore = configureStore();

ReactDOM.render(<Provider store={ reduxStore }><App /></Provider>, document.getElementById('root'));

const firebaseConfig = {
  apiKey: 'AIzaSyD3fT66JeuHYLygHt_51iecX85bDPGLkwI',
  authDomain: 'strike3-dev.firebaseapp.com',
  databaseURL: 'https://strike3-dev.firebaseio.com',
  projectId: 'strike3-dev',
  storageBucket: 'strike3-dev.appspot.com',
};

firebase.initializeApp(firebaseConfig);

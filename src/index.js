import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase/app'
import 'firebase/auth';

  // Initialize Firebase
var config = {
  apiKey: "AIzaSyBrDLqpmG_aZMsAUj2ei_CMi8yk1OZWHoM",
  authDomain: "hiking-project-db0fd.firebaseapp.com",
  databaseURL: "https://hiking-project-db0fd.firebaseio.com",
  projectId: "hiking-project-db0fd",
  storageBucket: "hiking-project-db0fd.appspot.com",
  messagingSenderId: "605830719119"
};
firebase.initializeApp(config);
  
ReactDOM.render(<HashRouter basename={process.env.PUBLIC_URL+'/'}><App /></HashRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

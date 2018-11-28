import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from 'firebase/app'
import 'firebase/auth';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyBu6aas5spE_4NzbcMShkKUxffyQwKXF2o",
    authDomain: "info-340.firebaseapp.com",
    databaseURL: "https://info-340.firebaseio.com",
    projectId: "info-340",
    storageBucket: "info-340.appspot.com",
    messagingSenderId: "833380606572"
  };
  firebase.initializeApp(config);
  
ReactDOM.render(<BrowserRouter basename={process.env.PUBLIC_URL+'/hiking-project/'}><App /></BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

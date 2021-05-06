// import * as firebase from 'firebase';
import { firebase } from '@firebase/app';

import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyAhEDxr9yJuACh4bkvzV2N5Ev-IbvVhKqw',
  authDomain: 'stoop-64867.firebaseapp.com',
  databaseURL: 'https://stoop-64867-default-rtdb.firebaseio.com/',
  projectId: 'stoop-64867',
  storageBucket: 'stoop-64867.appspot.com',
  messagingSenderId: '537953520115',
  appId: '1:537953520115:ios:443787631b35c726f9aa86',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase
    .firestore()
    .enablePersistence()
    .catch((err) => {
      console.log(err);
      if (err.code == 'failed-precondition') {
        // Multiple tabs open, persistence can only be enabled
        // in one tab at a a time.
        // ...
      } else if (err.code == 'unimplemented') {
        // The current browser does not support all of the
        // features required to enable persistence
        // ...
      }
    });
}

export { firebase };

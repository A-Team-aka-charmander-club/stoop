// import * as firebase from 'firebase';
// import { firebase } from '@firebase/app';

import firebase from 'firebase/app';

import '@firebase/auth';
import '@firebase/firestore';
import '@firebase/storage';

console.log(
  process.env.REACT_APP_API_KEY,
  'PROCESS ENV API KEY SO EXCITING',
  process.env.REACT_APP_PROJECT_ID,
  'COME ON PROJECT ID!~!!!!!'
);

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.DATABASE_URL,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  // firebase
  //   .firestore()
  //   .enablePersistence()
  //   .catch((err) => {
  //     console.log(err);
  //     if (err.code == 'failed-precondition') {
  //       // Multiple tabs open, persistence can only be enabled
  //       // in one tab at a a time.
  //       // ...
  //     } else if (err.code == 'unimplemented') {
  //       // The current browser does not support all of the
  //       // features required to enable persistence
  //       // ...
  //     }
  //   });
}

export { firebase };

import firebase from 'firebase/app';

import {
  API_KEY,
  AUTH_DOMAIN,
  DATABASEURL,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
} from '@env';
import '@firebase/auth';
import '@firebase/firestore';
import '@firebase/storage';
console.log('hi');
console.log(API_KEY);
console.log(AUTH_DOMAIN);
console.log(APP_ID);
const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  databaseURL: DATABASEURL,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};
// if (!firebase.apps.length) {
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
// }
export { firebase };

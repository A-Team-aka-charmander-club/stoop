import { firebase } from '../../../src/firebase/config';
import * as ImagePicker from 'expo-image-picker';
import { CommonActions, StackActions } from '@react-navigation/native';

//logout function
export const onLogoutPress = (props) => {
  firebase
    .auth()
    .signOut()
    .catch((error) => {
      console.log(error);
    });
  props.logOut();
  props.navigation.navigate('Login');
};
//upload image
export const uploadImage = async (uri) => {
  const response = await fetch(uri);
  const blob = await response.blob();

  const photoName = String(Math.random(1000));
  var ref = firebase.storage().ref().child(photoName);

  const user = firebase.auth().currentUser;

  const data = {
    userId: user.uid,
    uri: uri,
  };

  const photoId = firebase.firestore().collection('photos').doc().id;
  const photosRef = firebase.firestore().collection('photos');

  photosRef
    .doc(photoId)
    .set(data)
    .catch((error) => {
      alert(error);
    });
  await ref.put(blob);

  let photoUrl = await ref.getDownloadURL();

  let newPhoto = {
    firebasePhotoId: photoId,
    userId: user.uid,
    firebaseUrl: photoUrl,
  };
  return newPhoto;
};
// allows you to open camera roll + select image (necessary for app use)
export const openImagePickerAsync = async (props) => {
  let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permissionResult.granted) {
    alert('Permission to acccess camera roll is required!');
    return;
  }

  let pickerResult = await ImagePicker.launchImageLibraryAsync();

  if (pickerResult.cancelled) {
    return;
  }

  if (!pickerResult.cancelled) {
    props.takePhoto(pickerResult.uri);
  }
};

//allows you to take photo from in the app
export const openCameraAsync = async (props) => {
  //returns permission object
  let permission = await ImagePicker.requestCameraPermissionsAsync();

  if (!permission) {
    alert('Permission to acccess camera roll is required!');
  }
  // returns picture object
  const picture = await ImagePicker.launchCameraAsync();
  if (!picture.cancelled) {
    props.takePhoto(picture.uri);
  }
};

const TAB_TO_RESET = 'PostNav';

// export const resetPostStackOnTabPress = ({ navigation, route }) => ({
//   tabPress: (e) => {
//     const state = navigation.dangerouslyGetState();

//     if (state) {
//       const nonTargetTabs = state.routes.filter((r) => r.key !== e.target);

//       nonTargetTabs.forEach((tab) => {
//         const stackKey = tab.state?.key;

//         if (stackKey) {
//           navigation.dispatch({
//             ...StackActions.popToTop(),
//             target: stackKey,
//           });
//         }
//       });
//     }
//   },
// });
// tabPress: (e) => {
//   const state = navigation.dangerouslyGetState();

//   if (state) {
//     // Grab all the tabs that are NOT the one we just pressed
//     const nonTargetTabs = state.routes.filter((r) => r.key !== e.target);
//     console.log(nonTargetTabs);
//     nonTargetTabs.forEach((tab) => {
//       // Find the tab we want to reset and grab the key of the nested stack
//       const tabName = tab?.name;
//       const stackKey = tab?.state?.key;

//       if (stackKey && tabName === TAB_TO_RESET) {
//         // Pass the stack key that we want to reset and use popToTop to reset it
//         navigation.dispatch({
//           ...StackActions.popToTop(),
//           target: stackKey,
//         });
//       }
//     });
//   }
// },
// });

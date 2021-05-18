import { firebase } from '../../../src/firebase/config';
import * as ImagePicker from 'expo-image-picker';

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
  let permissionResult =
    await ImagePicker.requestMediaLibraryPermissionsAsync();

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

import { firebase } from '../../../src/firebase/config';
import * as ImagePicker from 'expo-image-picker';
import { CommonActions, StackActions } from '@react-navigation/native';

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

const uploadImage = async (uri) => {
  const response = await fetch(uri);
  const blob = await response.blob();

  const photoName = String(Math.random(1000));
   
  var ref = firebase.storage().ref().child(photoName);

  await ref.put(blob)
  
  let photoUrl = await ref.getDownloadURL();

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

  let newPhoto = {
    firebasePhotoId: photoId,
    userId: user.uid,
    firebaseUrl: photoUrl,
  };
  return newPhoto;
};

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
    const photo = await uploadImage(pickerResult.uri)
    console.log('photo', photo)
    props.takePhoto(photo);
  }
};

export const openCameraAsync = async (props) => {
  let permission = await ImagePicker.requestCameraPermissionsAsync();

  if (!permission) {
    alert('Permission to acccess camera roll is required!');
  }
  const picture = await ImagePicker.launchCameraAsync();
  if (!picture.cancelled) {
    const photo = await uploadImage(pickerResult.uri)
    props.takePhoto(photo);
  }
};

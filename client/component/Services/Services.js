import { firebase } from '../../../src/firebase/config';

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

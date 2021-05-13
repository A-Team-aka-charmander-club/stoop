import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import logo from '../../assets/logo.png';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import { firebase } from '../../src/firebase/config';
import { addPhotoThunk } from '../store/photo';
import { connect } from 'react-redux';
import Logout from '../component/LogoutScreen/Logout';

export function PhotoApp(props) {
  const [selectedImage, setSelectedImage] = React.useState(null);

  // allows you to open camera roll + select image (necessary for app use)
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Permission to acccess camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled) {
      return;
    }
    // uploading to firestore
    const uploadImage = async (uri) => {
      const response = await fetch(uri);
      const blob = await response.blob();
      const photoName = String(Math.random(1000));
      var ref = firebase.storage().ref().child(photoName);

      const userID = props.route.params.user.id;
      const data = {
        userId: userID,
        uri: pickerResult.uri,
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

      // this is URL to download photo (not data)
      let photoUrl = await ref.getDownloadURL();
      console.log(photoUrl, 'photoUrl');

      props.addPhoto(photoId, photoUrl);
    };

    if (!pickerResult.cancelled) {
      uploadImage(pickerResult.uri);
    }

    // if (Platform.OS === 'web') {
    //   let remoteUri = await uploadToAnonymousFilesAsync(pickerResult.uri);
    //   setSelectedImage({ localUri: pickerResult.uri, remoteUri });
    // } else {
    //   setSelectedImage({ localUri: pickerResult.uri, remoteUri: null });
    // }
  };

  let openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(
        `The image is available for sharing at: ${selectedImage.remoteUri}`
      );
      return;
    }

    await Sharing.shareAsync(selectedImage.localUri);
  };

  if (selectedImage !== null) {
    return (
      <View style={styles.container}>
        <Image
          source={{ uri: selectedImage.localUri }}
          style={styles.thumbnail}
        />
        <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
          <Text style={styles.buttonText}>Share this photo</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* <Logout navigation={props.navigation} /> */}
      <Image source={logo} style={styles.image} />
      <Text style={styles.text}>
        To share photo with a friend, just press the button
      </Text>
      {/* <StatusBar style="auto" />
       */}
      <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
        <Text style={styles.buttonText}>Take a photo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15,
  },
  image: {
    width: 305,
    height: 159,
    marginBottom: 10,
  },
  button: {
    backgroundColor: 'blue',
    padding: 20,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  thumbnail: {
    height: 300,
    width: 300,
    resizeMode: 'contain',
  },
});

const mapDispatch = (dispatch) => {
  return {
    addPhoto: (firebasePhotoId, photoUrl) =>
      dispatch(addPhotoThunk(firebasePhotoId, photoUrl)),
  };
};

export default connect(null, mapDispatch)(PhotoApp);

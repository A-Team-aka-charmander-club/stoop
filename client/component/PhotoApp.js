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
import uploadToAnonymousFilesAsync from 'anonymous-files';
import logo from '../../assets/logo.png';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import { firebase } from '../../src/firebase/config';

export default function App(props) {
  const [selectedImage, setSelectedImage] = React.useState(null);

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
    const uploadImage = async (uri) => {
      const response = await fetch(uri);
      const blob = await response.blob();
      const photoName = String(Math.random(1000));
      var ref = firebase.storage().ref().child(photoName);

      console.log('ref', ref);
      console.log('props', props);
      const userID = props.route.params.user.id;
      console.log('ref', ref);
      const data = {
        //this is userID
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
      await ref.getDownloadURL();
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

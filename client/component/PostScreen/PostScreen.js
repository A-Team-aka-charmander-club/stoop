// what is this?

//click '+' to create post
// brings up camera (to take picture)
// once picture is taken (or uploaded) => another screen with text input fields + tags + location info (something maps)
// submit creates post
// confirmation that it worked somehow (navigates to post)

import React, { useState } from 'react';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  TextInput,
  Button,
} from 'react-native';
import { firebase } from '../../../src/firebase/config';
import { connect } from 'react-redux';
import { createPostThunk } from '../../store/post';
import {
  openCameraAsync,
  openImagePickerAsync,
} from '../CameraModal/CameraFunctions';
import { takePhoto } from '../../store/photo';

export const PostScreen = (props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const uploadImage = async (uri) => {
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

    // this is URL to download photo (not data)
    let photoUrl = await ref.getDownloadURL();

    let post = { title, description };
    let photo = {
      firebasePhotoId: photoId,
      userId: user.uid,
      firebaseUrl: photoUrl,
    };

    props.submitPost({ post, photo });
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always">
        <Text>Create Post</Text>

        {/* photo display */}
        {props.photo.length ? (
          <Image source={{ uri: props.photo }} style={styles.thumbnail} />
        ) : null}
        {/* <Image source={{ uri: props.photo }} style={styles.thumbnail} /> */}
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.buttonStyle}>
            <Button
              title="Open Camera"
              onPress={() => openCameraAsync(props)}
            />
          </View>
          <View style={styles.buttonStyle}>
            <Button
              title="Upload Photo"
              onPress={() => openImagePickerAsync(props)}
            />
          </View>
        </View>
        {/* post form */}

        <TextInput
          style={styles.input}
          placeholder="Title"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        <TextInput style={styles.input} placeholder="Tags"></TextInput>

        {/* submit */}
        {/* mapview */}
        {/* <TextInput style={styles.input} placeholder='Tags'></TextInput> */}

        {/* submit */}

        {/* first -> firebase for userId and picture
        also: clear picture from state
        at some point: call database to create:
        -post
        -picture
        redirect to a different screen  / confirmation/ post page
         */}

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            uploadImage(props.photo);
          }}>
          <Text style={styles.button}>Post!</Text>
        </TouchableOpacity>

        {/* mapview */}
      </KeyboardAwareScrollView>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    photo: state.photo,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    submitPost: (post) => dispatch(createPostThunk(post)),
    takePhoto: (photo) => dispatch(takePhoto(photo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostScreen);

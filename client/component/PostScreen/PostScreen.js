import React, { useState } from 'react';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text, View, Image, TextInput, Button } from 'react-native';
import { firebase } from '../../../src/firebase/config';
import { connect } from 'react-redux';
import GoogleMapView from '../MapView/GoogleMapView';
import { createPostThunk } from '../../store/post';
import {
  openCameraAsync,
  openImagePickerAsync,
} from '../CameraModal/CameraFunctions';
import { takePhoto, clearPhoto } from '../../store/photo';
import Tags from './Tags/Tags';

export const PostScreen = (props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);

  const uploadImage = async (uri) => {
    console.log('fetch')
    const response = await fetch(uri);
    console.log('response.blob')
    const blob = await response.blob();
    console.log('after blob response')

    const photoName = String(Math.random(1000));
    var ref = firebase.storage().ref().child(photoName);
    console.log('refffffff')

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
console.log(photoUrl, 'photoUrl')
    let newPhoto = {
      firebasePhotoId: photoId,
      userId: user.uid,
      firebaseUrl: photoUrl,
    };
    return newPhoto;
  };

  const createPost = async () => {
    const photo = await uploadImage(props.photo);
    let post = { title, description, latitude, longitude };
    let tags = props.tags;
    await props.submitPost({ post, photo, tags });
    // props.navigation.navigate('PostNav', {
    //   screen: 'SinglePost',
    // });
    props.clearPhoto();
    setTitle('');
    setDescription('');
    props.navigation.navigate('SinglePost');
  };

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always">
        <Text>Create Post</Text>

        {props.photo.length ? (
          <Image source={{ uri: props.photo }} style={styles.thumbnail} />
        ) : null}
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.buttonStyle}>
            <Button
              title="Open Camera"
              onPress={async () => await openCameraAsync(props)}
            />
          </View>
          <View style={styles.buttonStyle}>
            <Button
              title="Upload Photo"
              onPress={async () => await openImagePickerAsync(props)}
            />
          </View>
        </View>

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
        {/* <TextInput style={styles.input} placeholder="Tags"></TextInput> */}
        <Tags />
        <GoogleMapView setLatitude={setLatitude} setLongitude={setLongitude} />
        <Button title="Post!" onPress={createPost} />
      </KeyboardAwareScrollView>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    photo: state.photo,
    tags: state.tags,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    submitPost: (post) => dispatch(createPostThunk(post)),
    takePhoto: (photo) => dispatch(takePhoto(photo)),
    clearPhoto: () => dispatch(clearPhoto()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostScreen);

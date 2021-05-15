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
import GoogleMapView from '../MapView/GoogleMapView';
import { createPostThunk } from '../../store/post';

export const PostScreen = (props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [photo, setPhoto] = useState(null);

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

    let photoUrl = await ref.getDownloadURL();

    let photo = {
      firebasePhotoId: photoId,
      userId: user.uid,
      firebaseUrl: photoUrl,
    };
    setPhoto(photo)
  };

  createPost = () =>{
    let post = { title, description, latitude, longitude };
    props.submitPost({ post, photo });
   }

  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps='always'
      >
        <Text>Create Post</Text>

        <Image source={{ uri: props.photo }} style={styles.thumbnail} />

        <TextInput
          style={styles.input}
          placeholder='Title'
          value={title}
          onChangeText={(text) => setTitle(text)}
        />

        <TextInput
          style={styles.input}
          placeholder='Description'
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        {/* <TextInput style={styles.input} placeholder='Tags'></TextInput> */}

        <GoogleMapView setLatitude={setLatitude} setLongitude={setLongitude} />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            uploadImage(props.photo);
          }}
        >
          <Button title="Post!" style={styles.button} onPress={createPost}/>
        </TouchableOpacity>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostScreen);

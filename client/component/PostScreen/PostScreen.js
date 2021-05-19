import React, { useState } from 'react';
import styles from './styles';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  Text,
  View,
  Image,
  TextInput,
  Button,
  ActivityIndicator,
} from 'react-native';
import { firebase } from '../../../src/firebase/config';
import { connect } from 'react-redux';
import GoogleMapView from '../MapView/GoogleMapView';
import { createPostThunk } from '../../store/post';
import { openCameraAsync, openImagePickerAsync } from '../Services/Services';
import { takePhoto, clearPhoto } from '../../store/photo';
import { removeTags } from '../../store/tag';
import Tags from './Tags/Tags';
import { getCoordinatesThunk } from '../../store/coordinates';

export const PostScreen = (props) => {
  console.log('PROPS: ', props);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [clearMap, setClearMap] = useState(true);
  const [loading, setLoading] = useState(false);

  const [tags, setTags] = useState({ tag: '', tagsArray: [] });
  const [region, setRegion] = useState({
    latitude: 40.751343151025615,
    longitude: -74.00289693630044,
    latitudeDelta: 0.0025,
    longitudeDelta: 0.0025,
  });

  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const photoName = String(Math.random(1000));

    var ref = firebase.storage().ref().child(photoName);
    setLoading(true);

    await ref.put(blob);
    setLoading(false);

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
    await ref.put(blob);

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
    props.getCoordinates();
    props.clearPhoto();
    setTitle('');
    setDescription('');
    setClearMap(true);
    props.removeTags();
    setTags({ tag: '', tagsArray: [] });
    setRegion({
      latitude: 40.751343151025615,
      longitude: -74.00289693630044,
      latitudeDelta: 0.0025,
      longitudeDelta: 0.0025,
    });
    props.navigation.navigate('SinglePost');
  };

  return (
    <View style={styles.container} style={styles.horizontal}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps='always'
      >
        <Text>Create Post</Text>

        {props.photo.length ? (
          <Image source={{ uri: props.photo }} style={styles.thumbnail} />
        ) : null}
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.buttonStyle}>
            <Button
              color='#fff'
              title='Open Camera'
              onPress={async () => await openCameraAsync(props)}
            />
          </View>
          <View style={styles.buttonStyle}>
            <Button
              color='#fff'
              title='Upload Photo'
              onPress={async () => await openImagePickerAsync(props)}
            />
          </View>
        </View>

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
        {/* <TextInput style={styles.input} placeholder="Tags"></TextInput> */}
        <Tags setTags={setTags} tags={tags} />
        <GoogleMapView
          region={region}
          clear={clearMap}
          setRegion={setRegion}
          setLatitude={setLatitude}
          setLongitude={setLongitude}
          setClearMap={setClearMap}
          clear={clearMap}
        />
        <View style={styles.button}>
          <Button color='#fff' title='Post!' onPress={createPost} />
          {loading ? (
            <View style={[styles.container, styles.horizontal]}>
              <ActivityIndicator size='large' color='#00ff00' />
            </View>
          ) : (
            <Text></Text>
          )}
        </View>
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
    removeTags: () => dispatch(removeTags()),
    getCoordinates: () => dispatch(getCoordinatesThunk()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostScreen);

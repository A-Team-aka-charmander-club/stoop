
import React, { useState, useEffect } from 'react';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text, View, Image, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import GoogleMapView from '../MapView/GoogleMapView';
import { createPostThunk } from '../../store/post';
import { openCameraAsync, openImagePickerAsync } from '../Services/Services';
import { takePhoto, clearPhoto } from '../../store/photo';
import { removeTags } from '../../store/tag';
import Tags from './Tags/Tags';
import { TextInput, Snackbar } from 'react-native-paper';

export const PostScreen = (props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [clearMap, setClearMap] = useState(true);
  const [tags, setTags] = useState({ tag: '', tagsArray: [] });
  const [region, setRegion] = useState({
    latitude: 40.751343151025615,
    longitude: -74.00289693630044,
    latitudeDelta: 0.0025,
    longitudeDelta: 0.0025,
  });

  const [errMessage, setErrMessage] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTitle('');
    setRegion({
      latitude: 40.751343151025615,
      longitude: -74.00289693630044,
      latitudeDelta: 0.0075,
      longitudeDelta: 0.0075,
    }),
      setDescription(''),
      setClearMap(true),
      setTags({ tag: '', tagsArray: [] }),
      setErrMessage(''),
      setVisible(false)
    props.clearPhoto();
    const unsubscribe = props.navigation.addListener('didFocus', () => {
      console.log('focussed');
    });
    unsubscribe()
  }, [props.navigation]);

  const onDismissSnackBar = () => setVisible(false);
  const createPost = async () => {
    if (!title.length) {
      setErrMessage('Title');
      setVisible(true);
    } else if (!description.length) {
      setErrMessage('Description');
      setVisible(true);
    } else if (!props.photo) {
      setErrMessage('Photo');
      setVisible(true);
    } else {
      let post = { title, description, latitude, longitude };
      let tags = props.tags;
      let photo = props.photo;
      await props.submitPost({ post, photo, tags });
      props.navigation.navigate('SinglePost');
    }
  };
  return (
<<<<<<< HEAD
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container} style={styles.horizontal}>
        <KeyboardAwareScrollView
          style={{ flex: 1, width: '100%' }}
          keyboardShouldPersistTaps='always'
        >
          <Text>Create Post</Text>
          {props.photo.firebaseUrl && (
            <Image
              source={{ url: props.photo.firebaseUrl }}
              style={styles.thumbnail}
            />
          )}
          <View style={{ flexDirection: 'row' }}>
            <View style={styles.buttonStyle}>
              <Button
                color='#fff'
                title='Open Camera'
                onPress={async () => await openCameraAsync(props)}
=======
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View>
            <Text>Create Post</Text>
            {props.photo.firebaseUrl && (
              <Image
                source={{ url: props.photo.firebaseUrl }}
                style={styles.thumbnail}
>>>>>>> 6577707c42514402eafcd1e2726a86a2cbed5208
              />
            )}
            <View style={{ flexDirection: 'row' }}>
              <View style={styles.buttonStyle}>
                <Button
                  color="#fff"
                  title="Open Camera"
                  onPress={async () => await openCameraAsync(props)}
                />
              </View>
              <View style={styles.buttonStyle}>
                <Button
                  color="#fff"
                  title="Upload Photo"
                  onPress={async () => await openImagePickerAsync(props)}
                />
              </View>
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
            required
            style={styles.input}
            placeholder='Description'
            value={description}
            onChangeText={(text) => setDescription(text)}
          />
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
          <View>
            <Snackbar
              style={styles.snackbar}
              visible={visible}
              onDismiss={onDismissSnackBar}
              action={{
                color: '#f8f5f2',
                label: 'Dismiss',
                onPress: onDismissSnackBar,
              }}
            >
              <Text>{errMessage} is required</Text>
            </Snackbar>
            {!visible && (
              <Button color='blue' title='Post!' onPress={createPost} />
            )}
          </View>
        </KeyboardAwareScrollView>
      </View>
    </TouchableWithoutFeedback>
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PostScreen);




//const unsubscribe = props.navigation.addListener('didFocus', () => {
//   console.log('focussed');
// });
// un
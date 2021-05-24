import React, { useState, useEffect } from 'react';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  Text,
  View,
  Image,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import GoogleMapView from '../MapView/GoogleMapView';
import { createPostThunk } from '../../store/post';
import { openCameraAsync, openImagePickerAsync } from '../Services/Services';
import { takePhoto, clearPhoto } from '../../store/photo';
import { removeTags } from '../../store/tag';
import Tags from './Tags/Tags';
import { TextInput, Snackbar } from 'react-native-paper';
import theme from '../../../CustomProps/Theme';

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
      setVisible(false);
    props.clearPhoto();
    const unsubscribe = props.navigation.addListener('didFocus', () => {
      console.log('focussed');
    });
    unsubscribe();
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
    <KeyboardAwareScrollView
      style={styles.horizontal}
      style={{
        flex: 1,
        marginTop: 30,
        width: '100%',
        backgroundColor: styles.backgroundColor,
      }}
      keyboardShouldPersistTaps='always'
    >
      <TouchableWithoutFeedback
        onPress={Keyboard.dismiss}
        style={styles.container}
      >
        <View >
          <Text style={{ alignSelf: 'center' }}>Create Post</Text>
          {props.photo.firebaseUrl && (
            <Image
              source={{ url: props.photo.firebaseUrl }}
              style={styles.thumbnail}
            />
          )}
          <View
            style={{
              flexDirection: 'column',
              backgroundColor: styles.backgroundColor,
              marginBottom: 20,
            }}
          >
            <TouchableOpacity
              onPress={async () => await openCameraAsync(props)}
              style={styles.buttonLarge}
            >
              <Text style={styles.buttonTitleLarge}>Open Camera</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.buttonLarge}
              onPress={async () => await openImagePickerAsync(props)}
            >
              <Text style={styles.buttonTitleLarge}>Upload Photo</Text>
            </TouchableOpacity>
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
              <TouchableOpacity onPress={createPost} 
              style={theme.buttonLarge}
              >
                <Text style={theme.buttonTitleLarge}>Post!</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareScrollView>
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
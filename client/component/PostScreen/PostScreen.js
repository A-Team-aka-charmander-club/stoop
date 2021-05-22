import React, { useState, useEffect } from 'react';
import styles from './styles';
import theme from '../../../CustomProps/Theme';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text, View, Image, Button, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import GoogleMapView from '../MapView/GoogleMapView';
import { createPostThunk } from '../../store/post';
import { openCameraAsync, openImagePickerAsync } from '../Services/Services';
import { takePhoto, clearPhoto } from '../../store/photo';
import { removeTags } from '../../store/tag';
import Tags from './Tags/Tags';
import { HelperText, TextInput } from 'react-native-paper';

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

  useEffect(() => {
    props.clearPhoto();
  });

  const titleErrors = () => {
    return !title.length;
  };

  const descriptionErrors = () => {
    return !description.length;
  };

  const createPost = async () => {
    let post = { title, description, latitude, longitude };
    let tags = props.tags;
    let photo = props.photo;
    await props.submitPost({ post, photo, tags });
    props.clearPhoto();
    setTitle('');
    setDescription('');
    setClearMap(true);
    props.removeTags();
    setTags({ tag: '', tagsArray: [] });
    props.navigation.navigate('SinglePost');
  };

  return (
    <View style={styles.container} style={styles.horizontal}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps='always'
      >
        <Text>Create Post</Text>
        {/* {props.photo.firebaseUrl ? (
          <Image
            source={{ url: props.photo.firebaseUrl }}
            style={styles.thumbnail}
          />
        ) : (
          <ActivityIndicator size='large' color='#00ff00' />
        )} */}
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
          style={theme.input}
          placeholder='Title'
          value={title}
          onChangeText={(text) => setTitle(text)}
        />
        <HelperText type='error' visible={titleErrors()}>
          Title is required
        </HelperText>

        <TextInput
          required
          style={theme.input}
          placeholder='Description'
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        <HelperText type='error' visible={descriptionErrors()}>
          Description is required
        </HelperText>
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
          <Button title='Post!' onPress={createPost} />
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostScreen);

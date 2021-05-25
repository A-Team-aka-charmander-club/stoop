import React, { useState, useEffect } from 'react';
import styles from '../styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  Text,
  View,
  Image,
  Button,
  TouchableWithoutFeedback,
  Keyboard,
  LogBox,
  TextInput,
} from 'react-native';
import {
  PanGestureHandler,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import theme from '../../../../CustomProps/Theme';
import { connect } from 'react-redux';
import EditMapView from '../../MapView/EditMapView';
import { openCameraAsync, openImagePickerAsync } from '../../Services/Services';
import { takePhoto, clearPhoto } from '../../../store/photo';
import { updatePost } from '../../../store/post';
import { Snackbar, Title } from 'react-native-paper';
import { removeTags, addTags } from '../../../store/tag';
import Tags from '../Tags/Tags';

export const EditPostScreen = (props) => {
  const [title, setTitle] = useState(props.post.title);
  const [description, setDescription] = useState(props.post.description);
  const [latitude, setLatitude] = useState(props.post.latitude);
  const [longitude, setLongitude] = useState(props.post.longitude);
  const [tags, setTags] = useState({
    tag: '',
    tagsArray: props.post.tags.map((tag) => tag.name),
  });
  const [region, setRegion] = useState({
    latitude: props.post.latitude,
    longitude: props.post.longitude,
    latitudeDelta: 0.0025,
    longitudeDelta: 0.0025,
  });
  const [errMessage, setErrMessage] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setTitle(props.post.title);
    setRegion({
      latitude: props.post.latitude,
      longitude: props.post.longitude,
      latitudeDelta: 0.0025,
      longitudeDelta: 0.0025,
    }),
      setDescription(props.post.description),
      setLatitude(props.post.latitude),
      setLongitude(props.post.longitude),
      setTags({
        tag: '',
        tagsArray: props.post.tags.map((tag) => tag.name),
      }),
      props.addTags(props.post.tags.map((tag) => tag.name));

    setErrMessage(''), setVisible(false);

    const unsubscribe = props.navigation.addListener('didFocus', () => {
      console.log('focused');
    });
    unsubscribe();
    LogBox.ignoreLogs([
      "Can't perform a React state update on an unmounted component",
    ]);
  }, [props.navigation]);

  const onDismissSnackBar = () => setVisible(false);

  const changePost = async () => {
    if (!title.length) {
      setErrMessage('Title');
      setVisible(true);
    } else if (!description.length) {
      setErrMessage('Description');
      setVisible(true);
    } else {
      setVisible(false);
      let photo;
      if (props.photo.firebaseUrl !== props.post.photos[0].firebaseUrl) {
        photo = props.photo;
      } else {
        photo = props.post.photos[0];
      }
      let post = { title, description, latitude, longitude };
      let tags = props.tags;

      await props.editPost({ post, photo, tags }, props.user.id, props.post.id);
      props.clearPhoto();
      props.removeTags();
      props.navigation.navigate('SinglePost');
    }
  };
  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, width: '100%' }}
      keyboardShouldPersistTaps='always'
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ backgroundColor: theme.backgroundColor }}>
          <View style={styles.midScreenHeader}>
            <Title style={styles.titleMidScreenHeader}> Update Post</Title>
          </View>
          <Image
            source={{
              url: props.photo.firebaseUrl,
            }}
            style={styles.thumbnail}
          />
          <View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                }}
              >
                <TouchableOpacity
                  onPress={async () => await openCameraAsync(props)}
                  style={styles.buttonLarge}
                >
                  <Text style={styles.buttonTitleLarge}>Open Camera</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={async () => await openImagePickerAsync(props)}
                  style={styles.buttonLarge}
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
                style={styles.input}
                placeholder='Description'
                value={description}
                onChangeText={(text) => setDescription(text)}
              />
              <Tags setTags={setTags} tags={tags} />
              <PanGestureHandler enabled={true}>
                <View>
                  <EditMapView
                    region={region}
                    setRegion={setRegion}
                    setLatitude={setLatitude}
                    setLongitude={setLongitude}
                  />
                </View>
              </PanGestureHandler>
              <View>
                <Snackbar
                  visible={visible}
                  onDismiss={onDismissSnackBar}
                  action={{
                    label: 'Dismiss',
                    onPress: onDismissSnackBar,
                  }}
                >
                  <Text>{errMessage} is required</Text>
                </Snackbar>
                {!visible && (
                  <TouchableOpacity
                    style={theme.buttonLarge}
                    onPress={() => changePost()}
                  >
                    <Text style={theme.buttonTitleLarge}>Update!</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
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
    post: state.post,
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    submitPost: (post) => dispatch(createPostThunk(post)),
    takePhoto: (photo) => dispatch(takePhoto(photo)),
    clearPhoto: () => dispatch(clearPhoto()),
    editPost: (post, userId, postId) =>
      dispatch(updatePost(post, userId, postId)),
    removeTags: () => dispatch(removeTags()),
    addTags: (tags) => dispatch(addTags(tags)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditPostScreen);

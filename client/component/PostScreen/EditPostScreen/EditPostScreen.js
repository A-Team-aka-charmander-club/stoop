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
} from 'react-native';
import { connect } from 'react-redux';
import EditMapView from '../../MapView/EditMapView';
import { openCameraAsync, openImagePickerAsync } from '../../Services/Services';
import { takePhoto, clearPhoto } from '../../../store/photo';
import { updatePost } from '../../../store/post';
import { Snackbar, TextInput } from 'react-native-paper';
import { removeTags } from '../../../store/tag';
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
      setErrMessage(''),
      setVisible(false);
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <KeyboardAwareScrollView
          style={{ flex: 1, width: '100%' }}
          keyboardShouldPersistTaps="always">
          <Text>Update Post</Text>
          <Image
            source={{
              url: props.photo.firebaseUrl,
            }}
            style={styles.thumbnail}
          />
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
          <Tags setTags={setTags} tags={tags} />
          <EditMapView
            region={region}
            setRegion={setRegion}
            setLatitude={setLatitude}
            setLongitude={setLongitude}
          />
          <View>
            <Snackbar
              visible={visible}
              onDismiss={onDismissSnackBar}
              action={{
                label: 'Dismiss',
                onPress: onDismissSnackBar,
              }}>
              <Text>{errMessage} is required</Text>
            </Snackbar>
            {!visible && (
              <Button color="blue" title="Update!" onPress={changePost} />
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
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(EditPostScreen);

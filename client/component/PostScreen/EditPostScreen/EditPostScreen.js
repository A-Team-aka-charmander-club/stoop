import React, { useState } from 'react';
import styles from '../styles';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text, View, Image, Button } from 'react-native';
import { connect } from 'react-redux';
import EditMapView from '../../MapView/EditMapView';
import { openCameraAsync, openImagePickerAsync } from '../../Services/Services';
import { takePhoto, clearPhoto } from '../../../store/photo';
import { updatePost } from '../../../store/post';
import { HelperText, TextInput } from 'react-native-paper';
import { removeTags } from '../../../store/tag';
import Tags from '../Tags/Tags';

import { getCoordinatesThunk } from '../../../store/coordinates';

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

  const titleErrors = () => {
    return !title.length;
  };

  const descriptionErrors = () => {
    return !description.length;
  };

  const changePost = async () => {
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
    setTitle('');
    setDescription('');

    props.removeTags();
    setTags({ tag: '', tagsArray: [] });
    props.navigation.navigate('SinglePost');
  };

  return (
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
        <HelperText type="error" visible={titleErrors()}>
          Title is required
       </HelperText>

        <TextInput
          style={styles.input}
          placeholder="Description"
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        <HelperText type="error" visible={descriptionErrors()}>
          Description is required
       </HelperText>
        <Tags setTags={setTags} tags={tags} />
        <EditMapView
          region={region}
          setRegion={setRegion}
          setLatitude={setLatitude}
          setLongitude={setLongitude}
        />
        <Button title="Update!" onPress={changePost} />
      </KeyboardAwareScrollView>
    </View>
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
    getCoordinates: () => dispatch(getCoordinatesThunk()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EditPostScreen);

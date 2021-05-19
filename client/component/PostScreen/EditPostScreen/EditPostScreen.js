import React, { useState } from 'react';
import styles from '../styles';

import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text, View, Image, TextInput, Button } from 'react-native';
import { firebase } from '../../../../src/firebase/config';
import { connect } from 'react-redux';
import EditMapView from '../../MapView/EditMapView';
import { openCameraAsync, openImagePickerAsync } from '../../Services/Services';
import { takePhoto, clearPhoto } from '../../../store/photo';
import { updatePost } from '../../../store/post';

import { removeTags } from '../../../store/tag';
import Tags from '../Tags/Tags';

import { getCoordinatesThunk } from '../../../store/coordinates';

import { uploadImage } from '../../Services/Services';

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

  // for uploading
  const uploadImage = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    const photoName = String(Math.random(1000));

    var ref = firebase.storage().ref().child(photoName);

    await ref.put(blob);

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

    let newPhoto = {
      firebasePhotoId: photoId,
      userId: user.uid,
      firebaseUrl: photoUrl,
    };
    return newPhoto;
  };

  const changePost = async () => {
    let photo;
    if (props.photo.length) {
      photo = await uploadImage(props.photo);
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
    // setTags({ tag: '', tagsArray: [] });
    setRegion({
      //   latitude: 40.751343151025615,
      //   longitude: -74.00289693630044,
      latitude: props.post.latitude,
      longitude: props.post.longitude,
      latitudeDelta: 0.0025,
      longitudeDelta: 0.0025,
    });
    props.navigation.navigate('SinglePost');
  };
  //   console.log('PHOTO PROPS: ', props.post.photos[0]);
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always">
        <Text>Update Post</Text>

        <Image
          source={{
            url: props.post.photos[0].firebaseUrl,
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
        {/* <TextInput style={styles.input} placeholder="Tags"></TextInput> */}
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

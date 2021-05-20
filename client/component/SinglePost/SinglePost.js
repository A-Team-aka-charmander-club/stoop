import React, { useState } from 'react';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text, View, Image, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import Comments from '../Comments/Comments';
import { destroyPost } from '../../store/post';
export const SinglePost = (props) => {

  console.log('props.post in singlepost', props.post);

export const SinglePost = (props) => {
  function handleDelete() {
    props.deletePost(props.post.id, props.user.id);
  }


  if (props.post.id) {
    console.log(props.post.photos[0].firebaseUrl, 'url')
    return (
      <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps="always">
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: props.post.latitude,
            longitude: props.post.longitude,
            latitudeDelta: 0.0025,
            longitudeDelta: 0.0025,
          }}
        >
          <Marker
            key={ `marker${Date.now()}` }
            coordinate={{
              latitude: props.post.latitude,
              longitude: props.post.longitude,
            }}
          />
        </MapView>
        <Image
          source={{ url: props.post.photos[0].firebaseUrl }}
          style={styles.thumbnail}
        />
        <Text>{props.post.title}</Text>
        <Text>{props.post.description}</Text>
        <Text>
          Tags:
          {props.post.tags.map((tag) => {
            return tag.name;
          })}
        </Text>
        {props.post.users[0].id === props.user.id ? (
          <View>
            <Button title='Delete Post' onPress={handleDelete} />
            <Button
              title='Edit Post'
              onPress={() => props.navigation.navigate('Edit')}
            />
          </View>
        ) : null}
<<<<<<< HEAD
        {/* this button redirects to comments */}
        <TouchableOpacity
          navigation={props.navigation}
          onPress={() => props.navigation.navigate('Comments')}
        >
          <Text>Comments</Text>
        </TouchableOpacity>
=======
        </KeyboardAwareScrollView>
>>>>>>> main
      </View>
    );
  } else {
    // <View>
    //   <Text>You've deleted the post. </Text>
    // </View>
    {
      props.navigation.navigate('Post');
    }
  }
};
const mapStateToProps = (state) => {
  return {
    post: state.post,
    user: state.user,
  };
};

const mapDispatchToProps = (dispatch, { navigation }) => {
  return {
    deletePost: (postId, userId) =>
      dispatch(destroyPost(postId, navigation, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);

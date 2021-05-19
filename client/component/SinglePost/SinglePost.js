import React, { useState, useEffect } from 'react';
import styles from './styles';
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { destroyPost } from '../../store/post';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
// import Comments from '../Comments/Comments';

export const SinglePost = (props) => {
  console.log('single post props:', props);
  const addComment = () => {
    props.navigation.navigate('Comments');
  };
  return (
    <View style={styles.container}>
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
          coordinate={{
  // useEffect = () => {
  //   if (!props.post.id) {
  //     props.navigation.navigate('Home');
  //   }
  // };

  // console.log('SINGLE POST PHOTO: ', props.post.photo[0]);
  function handleDelete() {
    props.deletePost(props.post.id, props.user.id);
  }

  if (props.post.id) {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          region={{
            latitude: props.post.latitude,
            longitude: props.post.longitude,
            latitudeDelta: 0.0,
            longitudeDelta: 0.0,
          }}>
          <Marker
            coordinate={{
              latitude: props.post.latitude,
              longitude: props.post.longitude,
              title: props.post.title,
              description: props.post.description,
            }}
          />
        </MapView>
        <Image
          source={{ uri: props.post.photos[0].firebaseUrl }}
          style={styles.thumbnail}
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

      {/* this button redirects to comments */}
      <TouchableOpacity navigation={props.navigation} onPress={addComment}>
        <Text>Comments</Text>
      </TouchableOpacity>
    </View>
  );
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
            <Button title="Delete Post" onPress={handleDelete} />
            <Button
              title="Edit Post"
              onPress={() => props.navigation.navigate('Edit')}
            />
          </View>
        ) : null}
      </View>
    );
  } else {
    return (
      <View>
        <Text>You've deleted the post. </Text>
      </View>
    );
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
    deletePost: (post, userId) =>
      dispatch(destroyPost(post, navigation, userId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);

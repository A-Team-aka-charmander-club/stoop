import React, { useState, useEffect } from 'react';
import styles from './styles';
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text, View, Image, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import { destroyPost } from '../../store/post';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

export const SinglePost = (props) => {
  // useEffect = () => {
  //   if (!props.post.id) {
  //     props.navigation.navigate('Home');
  //   }
  // };
  function handleDelete() {
    console.log('IS USER ON STATE?', props.user);
    props.deletePost(props.post.id, props.user.uid);
  }
  if (props.post.id) {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          initialRegion={{
            latitude: props.post.latitude,
            longitude: props.post.longitude,
            latitudeDelta: 0.0,
            longitudeDelta: 0.0,
          }}
        >
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
          source={{ url: props.post.photos[0].firebaseUrl }}
          style={styles.thumbnail}
        />
        <Text>{props.post.title}</Text>
        <Text>{props.post.description}</Text>
        <Text>
          Tags:{' '}
          {props.post.tags.map((tag) => {
            return tag.name;
          })}{' '}
        </Text>
        <Button title='Delete Post' onPress={handleDelete} />
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

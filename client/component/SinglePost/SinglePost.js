import React, { useState } from 'react';
import styles from './styles';
//import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text, View, Image, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

export const SinglePost = (props) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: props.post.latitude,
          longitude: props.post.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
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
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    post: state.post,
  };
};

export default connect(mapStateToProps)(SinglePost);

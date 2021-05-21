import React, { useState, useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import styles from './styles';
import { installWebGeolocationPolyfill } from 'expo-location';
import { connect } from 'react-redux';
import { getCoordinatesThunk } from '../../store/coordinates';
import { getPost } from '../../store/post';
import { takePhoto } from '../../store/photo';

export function HomeGoogleMapView(props) {
  installWebGeolocationPolyfill();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        props.setRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0075,
          longitudeDelta: 0.0075,
        });
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, maximumAge: 1000 }
    );
    props.navigation.addListener('focus', () => {
      props.getCoordinates(props.region, props.tags);
    });
  }, [props.navigation]);

  const setNewRegion = (newRegion) => {
    if (props.region.latitudeDelta !== newRegion.latitudeDelta) {
      props.setRegion(newRegion);
      props.getCoordinates(newRegion, props.tags);
    }
  };

  const onPressButton = (post) => {
    props.getPost(post);
    props.getPhoto(post.photos[0]);
    props.navigation.navigate('PostNav', { screen: 'SinglePost' });
  };
  return (
    <SafeAreaView style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={props.region}
        showsUserLocation={true}
        onRegionChangeComplete={setNewRegion}
        zoomEnabled={true}>
        {props.coordinates.map((post, index) => {
          return (
            <Marker
              key={index}
              coordinate={{
                latitude: post.latitude,
                longitude: post.longitude,
              }}
              title={post.title}
              description={post.description}
              // image={require('../../../assets/pin.png')}
              // resizeMode="contain"
            >
              <Callout
                onPress={() => onPressButton(post)}
                style={styles.calloutButton}>
                <Text>{post.title}</Text>
                {post.photos[0] ? (
                  <Image
                    source={{ url: post.photos[0].firebaseUrl }}
                    style={styles.image}
                  />
                ) : (
                  <Text>''</Text>
                )}
              </Callout>
            </Marker>
          );
        })}
      </MapView>
    </SafeAreaView>
  );
}
const mapStateToProps = (state) => {
  return {
    coordinates: state.coordinates,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getCoordinates: (region, tags) =>
      dispatch(getCoordinatesThunk(region, tags)),
    getPost: (post) => dispatch(getPost(post)),
    getPhoto: (photo) => dispatch(takePhoto(photo)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(HomeGoogleMapView);

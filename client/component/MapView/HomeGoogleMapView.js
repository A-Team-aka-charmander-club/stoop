import React, { useState, useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { View } from 'react-native';
import styles from './styles';
import { installWebGeolocationPolyfill } from 'expo-location';
import { connect } from 'react-redux';
import { getCoordinatesThunk } from '../../store/coordinates';

export function HomeGoogleMapView(props) {
  const [region, setRegion] = useState({
    latitude: 40.751343151025615,
    longitude: -74.00289693630044,
    latitudeDelta: 0.025,
    longitudeDelta: 0.025,
  });

  // this allows older browsers to run map component
  installWebGeolocationPolyfill();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        });
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, maximumAge: 1000 }
    );
    props.getCoordinates();
  }, [props.coordinates.length]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={region}
        showsUserLocation={true}
        zoomEnabled={true}
        // loadingEnabled
        // loadingBackgroundColor="white"
        // loadingIndicatorColor="black"
      >
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
            />
          );
        })}
      </MapView>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    coordinates: state.coordinates,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getCoordinates: (region) => dispatch(getCoordinatesThunk(region)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeGoogleMapView);

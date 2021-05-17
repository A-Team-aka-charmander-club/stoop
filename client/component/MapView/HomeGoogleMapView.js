import React, { useState, useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { View } from 'react-native';
import styles from './styles';
import { installWebGeolocationPolyfill } from 'expo-location';
import { connect } from 'react-redux';
import { getCoordinatesThunk } from '../../store/coordinates';

export function HomeGoogleMapView(props) {
  const [region, setRegion] = useState({latitude: 40.6734,
    longitude: -74.0083,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05});

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
        console.log(position, 'pos')
        console.log(region, 'region')
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, maximumAge: 1000 }
    );
  }, []);

  console.log(props.coordinates.slice(0, 5), 'coor')
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={region}
        showsUserLocation={true}
        zoomEnabled={true}
        loadingEnabled
        loadingBackgroundColor="white"
        loadingIndicatorColor="black"
      >
        {props.coordinates.map((post, index) => {
        return (
          <Marker
            key={index}
            coordinate={{
              latitude: post.latitude,
              longitude: post.longitude
            }}
          title={post.title}
          description={post.description}
          image={require('../../../assets/pin.png')}
    resizeMode="contain"
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

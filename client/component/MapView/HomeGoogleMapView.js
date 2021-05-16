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
    latitudeDelta: 0.026,
    longitudeDelta: 0.027,
  });

  //allows older browsers to load map
  installWebGeolocationPolyfill();

  useEffect(() => {
    //get current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0026,
          longitudeDelta: 0.0027,
        });
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, maximumAge: 1000 }
    );
    props.getCoordinates();
  }, []);
  //as current location changes, map view changes w/us
  // const onRegionChange = (newRegion) => {
  //   console.log(region, 'onchange1');
  //   setRegion(newRegion);
  //   props.getCoordinates(newRegion);
  //   console.log(props.coordinates, 'onchange3');
  // };
  console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!');
  console.log(props.coordinates, 'PROPS.COORDINATES');
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={region}
        showsUserLocation={true}
        zoomEnabled={true}
      ></MapView>
      {props.coordinates.map((post, index) => {
        let postCoordinates = {
          latitude: 40.676759,
          longitude: -73.99806,
        };

        return (
          <Marker
            key={index}
            coordinate={postCoordinates}
            title={post.title}
            description={post.description}
          />
        );
      })}
      {/* <Marker
        coordinate={marker.latlng}
        title={marker.title}
        description={marker.description}
      /> */}
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

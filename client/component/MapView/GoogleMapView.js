import React, { useState, useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker  } from 'react-native-maps';
import { Text, View } from 'react-native';
import styles from './styles';
import Location, { installWebGeolocationPolyfill} from 'expo-location';

export default function GoogleMapView(props) {
  const [region, setRegion] = useState({
    latitude: 40.751343151025615,
    longitude: -74.00289693630044,
    latitudeDelta: 0.026,
    longitudeDelta: 0.027,
  });

  const [marker, setMarker] = useState({
    latitude: region.latitude,
    longitude: region.longitude,
  });
  installWebGeolocationPolyfill();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {

        setRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0025,
          longitudeDelta: 0.0025,
        });
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, maximumAge: 1000 }
    );
    props.setLatitude(region.latitude)
    props.setLongitude(region.longitude)
  }, []);

  const onDragEnd=(e) => {
    setRegion({latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
      latitudeDelta: 0.0025,
      longitudeDelta: 0.0025})
    setMarker(e.nativeEvent.coordinate)
    props.setLatitude(region.latitude)
    props.setLongitude(region.longitude)
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={region}
        showsUserLocation={true}
        zoomEnabled={true}
      >
        <Marker
          draggable={true}
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          onDragEnd={onDragEnd}
        ></Marker>
      </MapView>
    </View>
  );
}

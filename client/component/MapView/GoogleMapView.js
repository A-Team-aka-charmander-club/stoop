import React, { useState, useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker  } from 'react-native-maps';
import { Text, View } from 'react-native';
import styles from './styles';
import Location, { installWebGeolocationPolyfill} from 'expo-location';

export default function GoogleMapView(props) {

  const [marker, setMarker] = useState({
    latitude: props.region.latitude,
    longitude: props.region.longitude,
  });

  installWebGeolocationPolyfill();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        props.setRegion({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.0025,
          longitudeDelta: 0.0025,
        });
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, maximumAge: 1000 }
    );

    props.setLatitude(props.region.latitude)
    props.setLongitude(props.region.longitude)
  }, []);

  const onDragEnd=(e) => {
    props.setRegion({latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
      latitudeDelta: 0.0025,
      longitudeDelta: 0.0025})
    setMarker(e.nativeEvent.coordinate)
    props.setLatitude(e.nativeEvent.coordinate.latitude)
    props.setLongitude(e.nativeEvent.coordinate.longitude)
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={props.region}
        showsUserLocation={true}
        zoomEnabled={true}
      >
        <Marker
          draggable={true}
          coordinate={{
            latitude: props.region.latitude,
            longitude: props.region.longitude,
          }}
          onDragEnd={onDragEnd}
        ></Marker>
      </MapView>
    </View>
  );
}

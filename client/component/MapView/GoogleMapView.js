import * as React from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Text, View } from 'react-native';
import styles from './styles';

export default function GoogleMapView() {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        showsUserLocation = {true}
        followUserLocation = {false}
        zoomEnabled = {true}
      >
        {/* <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
        ></Marker> */}
      </MapView>
    </View>
  );
}

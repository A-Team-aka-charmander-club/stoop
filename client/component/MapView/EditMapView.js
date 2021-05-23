import React from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { View } from 'react-native';
import styles from './styles';
import { installWebGeolocationPolyfill } from 'expo-location';

export default function EditMapView(props) {

  installWebGeolocationPolyfill();

  const onDragEnd = (e) => {
    props.setRegion({
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
      latitudeDelta: 0.0025,
      longitudeDelta: 0.0025,
    });

    props.setLatitude(e.nativeEvent.coordinate.latitude);
    props.setLongitude(e.nativeEvent.coordinate.longitude);
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={props.region}
        showsUserLocation={true}
        zoomEnabled={true}>
        <Marker
          draggable={true}
          image={require('../../../assets/x.png')}
          coordinate={{
            latitude: props.region.latitude,
            longitude: props.region.longitude,
          }}
          onDragEnd={onDragEnd}></Marker>
      </MapView>
    </View>
  );
}

import React, { useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { View, LogBox } from 'react-native';
import styles from './styles';
import { installWebGeolocationPolyfill } from 'expo-location';

export default function GoogleMapView(props) {

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

    props.setClearMap(false);
    props.setLatitude(props.region.latitude);
    props.setLongitude(props.region.longitude);
    LogBox.ignoreLogs(["Can't perform a React state update on an unmounted component"]);
  }, [props.clearMap]);

  const onDragEnd = (e) => {
    props.setRegion({
      latitude: e.nativeEvent.coordinate.latitude,
      longitude: e.nativeEvent.coordinate.longitude,
      latitudeDelta: 0.0025,
      longitudeDelta: 0.0025,
    });

    props.setLatitude(e.nativeEvent.coordinate.latitude);
    props.setLongitude(e.nativeEvent.coordinate.longitude);
    LogBox.ignoreLogs(["Can't perform a React state update on an unmounted component"]);
  };

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
          image={require('../../../assets/x.png')}
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


import React, { useState, useEffect } from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Text, View } from 'react-native';
import styles from './styles';
import Location, { installWebGeolocationPolyfill } from 'expo-location';


export default function GoogleMapView() {
  const [region, setRegion] = useState({
    latitude: 40.751343151025615, longitude: -74.00289693630044, latitudeDelta: 0.026,
    longitudeDelta: 0.027
  })

  const [location, setLocation] = useState(null);
  installWebGeolocationPolyfill()

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(

      (position) => {
        setLocation(position)


        setRegion({
          latitude: position.coords.latitude, longitude: position.coords.longitude, latitudeDelta: 0.026,
          longitudeDelta: 0.027
        });
      },
      (error) => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={region}
        showsUserLocation={true}
        zoomEnabled={true}
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
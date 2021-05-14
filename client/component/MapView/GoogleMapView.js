import * as React from 'react';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Text, View } from 'react-native';
import styles from './styles';
import Geolocation from 'react-native-geolocation-service';
import * as Location from 'expo-location';

export default function GoogleMapView() {
  // const [latitude, setLatitude] = React.useState(0);
  // const [longitude, setLongitude] = React.useState(0);
  // const [coordinates, setCoordinates] = React.useState([]);
  // useEffect(() => {
  //   if (hasLocationPermission) {
  //     Geolocation.getCurrentPosition(
  //       (position) => {
  //         setLatitude(position.coords.latitude);
  //         setLongitude(position.coords.longitude);
  //         setCoordinates(
  //           coordinates.concat({
  //             latitude: position.coords.latitude,
  //             longitude: position.coords.longitude,
  //           })
  //         );
  //       },
  //       (error) => {
  //         console.log(error.code, error.message);
  //       },
  //       {
  //         showLocationDialog: true,
  //         enableHighAccuracy: true,
  //         timeout: 20000,
  //         maximumAge: 0,
  //       }
  //     );
  //   }
  // });
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: latitude,
            longitude: longitude,
          }}
        ></Marker>
      </MapView>
    </View>
  );
}

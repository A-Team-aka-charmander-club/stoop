import * as React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Text, View } from 'react-native';
import styles from './styles';

export default function GoogleMapView() {
  return (
    <View style={styles.container}>
      <MapView style={styles.map} provider={PROVIDER_GOOGLE} />
    </View>
  );
}

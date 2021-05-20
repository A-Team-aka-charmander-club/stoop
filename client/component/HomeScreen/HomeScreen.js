import React from 'react';
import { View } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';
import HomeGoogleMapView from '../MapView/HomeGoogleMapView';


export function HomeScreen(props) {

  return (
    <View>
      <HomeGoogleMapView navigation={props.navigation} />
    </View>
  );
}

export default connect(null, null)(HomeScreen);

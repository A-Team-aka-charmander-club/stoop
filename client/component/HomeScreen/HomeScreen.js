import React from 'react';
import { Alert, Button, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';
import {
  launchCameraAsync,
  requestCameraPermissionsAsync,
} from 'expo-image-picker';
import { takePhoto } from '../../store/photo';
import HomeGoogleMapView from '../MapView/HomeGoogleMapView';


export function HomeScreen(props) {
  let openCameraAsync = async () => {
    let permission = await requestCameraPermissionsAsync();
    if (!permission) {
      alert('Permission to acccess camera roll is required!');
    }

    const picture = await launchCameraAsync();
    if (!picture.cancelled) {
      props.takePhoto(picture.uri);
      props.navigation.navigate('Post');
    }
  };

  return (
    <View>
      <HomeGoogleMapView navigation={props.navigation} />
    </View>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    takePhoto: (photo) => dispatch(takePhoto(photo)),
  };
};
export default connect(null, mapDispatchToProps)(HomeScreen);

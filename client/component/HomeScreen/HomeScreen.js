import React from 'react';
import { Alert, Button, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
import { firebase } from '../../../src/firebase/config';
import { connect } from 'react-redux';
import {
  launchCameraAsync,
  requestCameraPermissionsAsync,
} from 'expo-image-picker';
import { takePhoto } from '../../store/photo';
import HomeGoogleMapView from '../MapView/HomeGoogleMapView';

//add photurl to state (pre-database)
// see button + click button
// brings up camera. camera has take picture OR navigate to photo roll (image picker)
export function HomeScreen(props) {
  let openCameraAsync = async () => {
    //returns permission object
    let permission = await requestCameraPermissionsAsync();
    if (!permission) {
      alert('Permission to acccess camera roll is required!');
    }
    // returns picture object
    const picture = await launchCameraAsync();
    if (!picture.cancelled) {
      props.takePhoto(picture.uri);
      props.navigation.navigate('Post');
    }
  };

  return (
    <View>
      <HomeGoogleMapView />
      <Text>Home Screen</Text>
      <Button title='+' onPress={() => openCameraAsync()} />
    </View>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    takePhoto: (photo) => dispatch(takePhoto(photo)),
  };
};
export default connect(null, mapDispatchToProps)(HomeScreen);

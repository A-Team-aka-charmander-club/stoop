import React, { useEffect } from 'react';
import {
  Alert,
  Button,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import styles from './styles';
import { connect } from 'react-redux';
import {
  launchCameraAsync,
  requestCameraPermissionsAsync,
} from 'expo-image-picker';
import { takePhoto } from '../../store/photo';
import HomeGoogleMapView from '../MapView/HomeGoogleMapView';
import { getCoordinatesThunk } from '../../store/coordinates';

//add photurl to state (pre-database)
// see button + click button
// brings up camera. camera has take picture OR navigate to photo roll (image picker)
export function HomeScreen(props) {
  const [coordinates, getCoordinates] = useState('');
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
      {/* <ScrollView>
        {props.coordinates.map((post, index) => {
          return (
            <View key={index}>
              <Text>{post.title}</Text>
              <Text>{post.title}</Text>
            </View>
          );
        })}
      </ScrollView> */}
    </View>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    takePhoto: (photo) => dispatch(takePhoto(photo)),
  };
};
export default connect(null, mapDispatchToProps)(HomeScreen);

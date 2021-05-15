import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 2,
  },
  mapCenterMapView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

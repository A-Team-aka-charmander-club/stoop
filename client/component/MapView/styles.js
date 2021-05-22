import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 15,
    marginRight: 15,
  },
  map: {
    marginLeft: 30,
    marginRight: 30,
    width: Dimensions.get('window').width - 30,
    height: Dimensions.get('window').height / 2,
  },
  mapCenterMapView: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calloutButton: {
    width: 110,
    height: 110,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 6,
    paddingVertical: 6,
    borderRadius: 12,
    alignItems: 'center',
    marginHorizontal: 10,
    marginVertical: 10,
  },
  image: {
    flex: 1,
    resizeMode: 'contain',
    aspectRatio: 1.5,
  },
});

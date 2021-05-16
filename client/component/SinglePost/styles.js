import { StyleSheet, Dimensions } from 'react-native';

export default StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    alignItems: 'center',
  },
  thumbnail: {
    height: 300,
    width: 300,
    resizeMode: 'contain',
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height / 3,
  },
});

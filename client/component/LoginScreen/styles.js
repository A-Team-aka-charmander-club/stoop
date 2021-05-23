import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#EFE6DD',
  },
  title: {},
  logoLarge: {
    flex: 1,
    height: 300,
    width: 300,
    alignSelf: 'center',
    margin: 100,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#F8F5F1',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 30,
    marginRight: 30,
    paddingLeft: 16,
  },
  button: {
    backgroundColor: '#F03A47',
    marginLeft: 100,
    marginRight: 100,
    marginTop: 20,
    height: 48,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitle: {
    color: '#F8F5F1',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footerView: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 16,
    color: '#070707',
  },
  footerLink: {
    color: '#1282A2',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

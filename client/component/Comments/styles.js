import { StyleSheet, PixelRatio } from 'react-native';
import theme from '../../../CustomProps/Theme';
const styles = StyleSheet.create({
  singleComment: {
    padding: 10,
  },
  commentCard: {
    margin: 5,
  },
  container: {
    flex: 1,
  },
  snackbar: {
    backgroundColor: '#f03a47',
    color: '#f8f5f2',
  },
  name: {
    fontWeight: 'bold',
    paddingBottom: 5,
    paddingTop: 50,
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    color: '#424242',
    margin: 2,
  },
  buttonStyle: {
    backgroundColor: '#788eec',
    marginLeft: 15,
    marginRight: 55,
    marginTop: 20,
    height: 48,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  inner: {
    padding: 24,
    justifyContent: 'space-around',
    backgroundColor: theme.backgroundColor,
  },
  header: {
    fontSize: 36,
    marginBottom: 48,
  },
  textInput: {
    height: 20,
    borderColor: '#000000',
    borderBottomWidth: 1,
  },

  button: {
    backgroundColor: '#788eec',
    marginTop: 0,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  titleMidScreenHeaderEdit: {
    height: 48,
    overflow: 'hidden',
    paddingLeft: 0,
    alignSelf: 'center',
    marginTop: 50,
    fontWeight: 'bold',
    fontSize: 20,
    color: theme.colors.lightBackground,
  },
  titleMidScreenHeader: {
    height: 48,
    overflow: 'hidden',
    paddingLeft: 0,
    alignSelf: 'center',
    marginTop: 20,
    fontWeight: 'bold',
    fontSize: 20,
    color: theme.colors.lightBackground,
  },
  cardLayout: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 1,
    margin: 5,
    backgroundColor: theme.colors.lightBackground,
  },
});

export default styles;

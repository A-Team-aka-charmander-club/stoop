import { StyleSheet } from 'react-native';
import theme from '../../../CustomProps/Theme';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EFE6DD',
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  input: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: '#3ca897',
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 16,
  },
  midScreenHeader: {
    // width: 100,
    marginTop: 20,
    height: 48,
    backgroundColor: theme.colors.accent,
  },
  titleMidScreenHeader: {
    height: 48,
    overflow: 'hidden',
    paddingLeft: 0,
    alignSelf: 'center',
    marginTop: 10,
    fontWeight: 'bold',
    fontSize: 20,
    color: theme.backgroundColor,
  },
  scrollView: {
    display: 'flex',
  },
  title: {
    fontSize: 24,
    color: '#A5A5A5',
  },
  subtitle: {
    color: '#A5A5A5',
  },
  itemText: {
    backgroundColor: '#A5A5A5',
  },
});

import { StyleSheet } from 'react-native';
import theme from '../../../CustomProps/Theme';
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
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
    color: theme.colors.lightBackground,
  },
  scrollView: {
    display: 'flex',
  },
  title: {
    fontSize: 24,
    color: theme.colors.iconColor,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  scrollCard: {
    backgroundColor: theme.backgroundColor,
  },
  subtitle: {
    color: '#A5A5A5',
  },
  itemText: {
    backgroundColor: theme.backgroundColor,
  },
  cardLayout: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 1,
    borderColor: theme.colors.accent,
    borderWidth: 0.3,
  },
  avatar: {
    backgroundColor: theme.colors.accent,
  },
  tagText: {
    color: theme.colors.accent,
  },
});

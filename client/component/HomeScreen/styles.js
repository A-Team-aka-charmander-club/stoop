import { StyleSheet } from 'react-native';
import theme from '../../../CustomProps/Theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
  },
  midScreenHeader: {
    // width: 100,
    height: 48,
    backgroundColor: theme.colors.accent,
  },
  contenContainer: {
    backgroundColor: theme.colors.accent,
    borderColor: theme.colors.iconColor,
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
    fontFamily: 'Bangers',
  },
  scrollView: {
    display: 'flex',
  },
  title: {
    fontSize: 24,
    color: theme.colors.iconColor,
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#A5A5A5',
  },
  itemText: {
    backgroundColor: theme.backgroundColor,
  },
});

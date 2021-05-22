import { StyleSheet } from 'react-native';
import theme from '../../../CustomProps/Theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
  },
  midScreenHeader: {
    height: 48,
    borderRadius: 5,
    overflow: 'hidden',
    backgroundColor: theme.colors.accent,
    marginTop: 10,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    paddingLeft: 16,
    justifyContent: 'center',
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

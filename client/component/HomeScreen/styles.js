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
    backgroundColor: theme.colors.cancelButton,
  },
  contenContainer: {
    backgroundColor: theme.colors.primary,
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
    color: theme.colors.lightBackground,
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
  scrollCard: {
    backgroundColor: theme.backgroundColor,
  },
  cardLayout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
  },
  avatar: {
    backgroundColor: theme.colors.accent,
  },
  chip: {
    backgroundColor: theme.colors.primary,
  },
  timeAgo: {
    fontStyle: 'italic',
  },
  tagText: {
    color: '#F8F5F2',
  },
});

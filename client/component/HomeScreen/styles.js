import { StyleSheet } from 'react-native';
import theme from '../../../CustomProps/Theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.backgroundColor,
  },
  midScreenHeader: {
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
    alignSelf: 'center',
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
    justifyContent: 'flex-start',
    flex: 1,
    borderColor: theme.colors.accent,
    borderWidth: 0.3,
  },
  avatar: {
    backgroundColor: theme.colors.accent,
  },
  chip: {
    backgroundColor: theme.colors.lightBackground,
    margin: 10,
  },
  timeAgo: {
    fontStyle: 'italic',
  },
  tagText: {
    color: theme.colors.accent,
  },
});

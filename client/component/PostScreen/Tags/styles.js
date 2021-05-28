import { StyleSheet } from 'react-native';
import theme from '../../../../CustomProps/Theme';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.backgroundColor,
  },
  textInput: {
    height: 40,
    backgroundColor: theme.colors.lightBackground,
    marginTop: 8,
    borderRadius: 5,
    padding: 3,
  },
  tag: {
    backgroundColor: theme.colors.lightBackground,
  },
  tagText: {
    color: theme.colors.accent,
  },
});

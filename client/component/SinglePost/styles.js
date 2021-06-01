import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Badge, Icon } from 'react-native-elements';
import theme from '../../../CustomProps/Theme';

export const BadgedIcon = (length) => {
  return (
    <View style={badgeStyles.container}>
      <View style={{ marginTop: 5, alignSelf: 'flex-end' }}>
        <Icon
          name="comment"
          type="material-community"
          size={30}
          color={theme.colors.cancelButton}
        />
        <Badge value={length} containerStyle={badgeStyles.badgeStyle} />
      </View>
    </View>
  );
};

const badgeStyles = StyleSheet.create({
  container: {
    marginLeft: 12,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  badgeStyle: {
    marginTop: 5,
    position: 'absolute',
    top: -4,
    right: -4,
  },
});

export default StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    alignItems: 'center',
  },
  thumbnail: {
    height: 300,
    width: 300,
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
    height: Dimensions.get('window').height / 5,
  },
  cardLayout: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    flex: 1,

    backgroundColor: theme.backgroundColor,
  },
  title: {
    fontSize: 24,
    color: theme.colors.accent,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
  timeAgo: {
    fontStyle: 'italic',
    marginTop: 5,
    marginBottom: 5,
  },
  tagText: {
    color: theme.colors.accent,
  },
  titleMidScreenHeader: {
    height: 48,
    overflow: 'hidden',
    paddingLeft: 0,
    alignSelf: 'center',
    marginTop: 50,
    fontWeight: 'bold',
    fontSize: 20,
    color: theme.colors.lightBackground,
  },
  midScreenHeader: {
    height: 100,
    backgroundColor: theme.colors.cancelButton,
  },
  buttonLarge: {
    backgroundColor: theme.colors.accent,
    marginLeft: 30,
    marginRight: 10,
    marginTop: 20,
    height: 30,
    width: 110,
    borderRadius: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonTitleLarge: theme.buttonTitleLarge,
});

import React from 'react';
import { StyleSheet, Dimensions, View } from 'react-native';
import { Badge, Icon } from 'react-native-elements';

export const BadgedIcon = (length) => {
  return (
    <View style={badgeStyles.container}>
      <View>
        {/* <View style={badgeStyles.row}> */}
        <Icon
          name="comment"
          type="material-community"
          size={30}
          color="#813059"
        />
        <Badge value={length} containerStyle={badgeStyles.badgeStyle} />
      </View>
    </View>
  );
};

const badgeStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: 10,
    marginRight: 10,
  },
  row: {
    flexDirection: 'row',
  },
  badgeStyle: {
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
    height: 350,
    width: Dimensions.get('window').width,
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
});

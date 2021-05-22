import React from 'react';

import { View, Button, Text } from 'react-native';
import { logoutUser } from '../../store/user';
import { connect } from 'react-redux';
import { onLogoutPress } from '../Services/Services';

export function UserAccount(props) {
  return (
    <View>
      <Text>User Profile</Text>
      <Text>User</Text>
      <Button title='Logout' onPress={() => onLogoutPress(props)} />
    </View>
  );
}

const mapDispatch = (dispatch) => {
  return {
    logOut: () => dispatch(logoutUser()),
  };
};

export default connect(null, mapDispatch)(UserAccount);

import React from 'react';
//import Logout from '../LogoutScreen/Logout';
import { View, Button, Text } from 'react-native';
import { logoutUser } from '../../store/user';
import { connect } from 'react-redux';
// import { firebase } from '../../../src/firebase/config';
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

import React from 'react';
//import Logout from '../LogoutScreen/Logout';
import { View, Button, Text, SafeAreaView } from 'react-native';
import { logoutUser } from '../../store/user';
import { connect } from 'react-redux';
// import { firebase } from '../../../src/firebase/config';
import { onLogoutPress } from '../Services/Services';
import theme from '../../../CustomProps/Theme';

export function UserAccount(props) {
  return (
    <SafeAreaView style={theme.container}>
      <Text>User Profile</Text>
      <Text>User</Text>
      <Button
        style={{ backgroundColor: theme.colors.accent }}
        title='Logout'
        onPress={() => onLogoutPress(props)}
      />
    </SafeAreaView>
  );
}
const mapDispatch = (dispatch) => {
  return {
    logOut: () => dispatch(logoutUser()),
  };
};

export default connect(null, mapDispatch)(UserAccount);

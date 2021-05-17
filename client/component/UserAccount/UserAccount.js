import React from 'react';
//import Logout from '../LogoutScreen/Logout';
import { Button, View, Text } from 'react-native';
import { logoutUser } from '../../store/user';
import { connect } from 'react-redux';
import { firebase } from '../../../src/firebase/config';

export function UserAccount(props) {
  const onLogoutPress = () => {
    firebase
      .auth()
      .signOut()
      .catch((error) => {
        console.log(error);
      });
    props.logOut();
    props.navigation.navigate('Login');
  };

  return (
    <View>
      <Text>User Profile</Text>
      <Text>User</Text>
      <Button title='Logout' onPress={() => onLogoutPress()} />
    </View>
  );
}
const mapDispatch = (dispatch) => {
  return {
    logOut: () => dispatch(logoutUser()),
  };
};

export default connect(null, mapDispatch)(UserAccount);

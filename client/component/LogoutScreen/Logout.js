import React, { useState } from 'react';
import {
  Button,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import { firebase } from '../../../src/firebase/config';
import { logoutUser } from '../../store/user';
import { connect } from 'react-redux';

export function Logout(props) {
  // look at props/state for userLoggedIn
  console.log('props', props);
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
      <TouchableOpacity onPress={() => onLogoutPress()}>
        <Text style={styles.footerLink}>LogOut</Text>
      </TouchableOpacity>
    </View>
  );
  // put a button w/log out listener
}

const mapDispatch = (dispatch) => {
  return {
    logOut: () => dispatch(logoutUser()),
  };
};
export default connect(null, mapDispatch)(Logout);

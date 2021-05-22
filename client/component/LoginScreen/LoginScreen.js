import React, { useState } from 'react';
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView,
} from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styles from './styles';
import theme from '../../../CustomProps/Theme';
import { firebase } from '../../../src/firebase/config';
import { createOrFindUserThunk } from '../../store/user';
import { connect } from 'react-redux';
//import { onLoginPress, onFooterLinkPress } from '../Services/Services';

export function LoginScreen({ navigation, fetchUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onFooterLinkPress = () => {
    navigation.navigate('Registration');
  };
  const onLoginPress = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((response) => {
        const uid = response.user.uid;
        const usersRef = firebase.firestore().collection('users');
        usersRef
          .doc(uid)
          .get()
          .then((firestoreDocument) => {
            if (!firestoreDocument.exists) {
              alert('User does not exist anymore.');
              return;
            }
            const user = firestoreDocument.data();
            fetchUser({ uid });
            navigation.navigate('Home', { user: user });
          });
      })
      .catch((error) => {
        alert(error);
      });
  };
  return (
    <SafeAreaView style={theme.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps='always'
      >
        <Image
          style={theme.logoLarge}
          source={require('../../../assets/trashPanda.png')}
        />
        <TextInput
          style={styles.input}
          placeholder='E-mail'
          placeholderTextColor='#aaaaaa'
          onChangeText={(text) => setEmail(text)}
          value={email}
          underlineColorAndroid='transparent'
          autoCapitalize='none'
        />
        <TextInput
          style={styles.input}
          placeholderTextColor='#aaaaaa'
          secureTextEntry
          placeholder='Password'
          onChangeText={(text) => setPassword(text)}
          value={password}
          underlineColorAndroid='transparent'
          autoCapitalize='none'
        />
        {/* this is log-in button */}
        <TouchableOpacity
          style={theme.buttonLarge}
          onPress={() => onLoginPress()}
        >
          <Text style={theme.buttonTitleLarge}>Log in</Text>
        </TouchableOpacity>
        <View style={styles.footerView}>
          <Text style={styles.footerText}>
            Don't have an account?
            <Text onPress={onFooterLinkPress} style={styles.footerLink}>
              Sign up
            </Text>
          </Text>
        </View>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

const mapDispatch = (dispatch) => {
  return {
    fetchUser: (firebaseUserId) =>
      dispatch(createOrFindUserThunk(firebaseUserId)),
  };
};

export default connect(null, mapDispatch)(LoginScreen);

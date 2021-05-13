import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import { firebase } from './src/firebase/config';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  HomeScreen,
  LoginScreen,
  GoogleMapView,
  RegistrationScreen,
  PhotoApp,
  PostScreen,
} from './client/index';
import { decode, encode } from 'base-64';
import { Provider } from 'react-redux';
import store from './client/store/index';

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

const Stack = createStackNavigator();

export default function App() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        usersRef
          .doc(user.uid)
          .get()
          .then((document) => {
            const userData = document.data();
            setUser(userData);
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name='Home' component={HomeScreen} />
          {/* {(props) => <HomeScreen {...props} extraData={user} />} */}
          <Stack.Screen name='Photo' component={PhotoApp} />
          <Stack.Screen name='Post' component={PostScreen} />
          <Stack.Screen name='Map' component={GoogleMapView} />
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Registration' component={RegistrationScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

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
  PostScreen,
} from './client/index';
import { decode, encode } from 'base-64';
import { Provider } from 'react-redux';
import store from './client/store/index';
import BottomTabNavigator from './client/component/Navigation/TabNavigator/TabNavigator';
import { Provider as PaperProvider } from 'react-native-paper';

if (!global.btoa) {
  global.btoa = encode;
}
if (!global.atob) {
  global.atob = decode;
}

// const theme = {
//   dark: false,
//   roundness: 2,
//   colors: {
//     primary: '#64FFDA',
//     accent: '#004D40',
//     background: '#A7FFEB',
//     surface: 'E0F2F1',
//     text: '004d40',
//     disabled: '#26A9A',
//     placholder: '#26A69A',
//     backdrop: '#A7FFEB',
//     onSurface: '#1DE9B6',
//   },
//   font: 'regular',
// };
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
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Login'>
            <Stack.Screen
              name='Home'
              component={BottomTabNavigator}
              options={{ headerShown: false }}
            />
            {/* {(props) => <HomeScreen {...props} extraData={user} />} */}
            <Stack.Screen
              name='Login'
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name='Registration'
              component={RegistrationScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

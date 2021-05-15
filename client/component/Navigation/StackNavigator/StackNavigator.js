import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../../HomeScreen/HomeScreen';
import PostScreen from '../../PostScreen/PostScreen';
import GoogleMapView from '../../MapView/GoogleMapView';

const Stack = createStackNavigator();
const HomeStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name='Home' component={HomeScreen} />
    </Stack.Navigator>
  );
};

const PostStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Post'>
      <Stack.Screen name='Post' component={PostScreen} />
    </Stack.Navigator>
  );
};

const MapStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Map'>
      <Stack.Screen name='Map' component={GoogleMapView} />
    </Stack.Navigator>
  );
};
export { HomeStackNavigator, PostStackNavigator, MapStackNavigator };

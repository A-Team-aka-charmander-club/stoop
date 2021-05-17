import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../../HomeScreen/HomeScreen';
import PostScreen from '../../PostScreen/PostScreen';
import GoogleMapView from '../../MapView/GoogleMapView';
import SinglePost from '../../SinglePost/SinglePost';

const Stack = createStackNavigator();
const HomeStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const PostStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Post">
      <Stack.Screen
        name="Post"
        component={PostScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="SinglePost"
        component={SinglePost}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

const MapStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Map">
      <Stack.Screen
        name="Map"
        component={GoogleMapView}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export { HomeStackNavigator, PostStackNavigator, MapStackNavigator };

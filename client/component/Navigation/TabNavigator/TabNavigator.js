import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import {
//   HomeStackNavigator,
//   PostStackNavigator,
//   MapStackNavigator,
// } from '../StackNavigator/StackNavigator';
import HomeScreen from '../../HomeScreen/HomeScreen';
import PostScreen from '../../PostScreen/PostScreen';
import GoogleMapView from '../../MapView/GoogleMapView';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName='Home'>
      <Tab.Screen name='Home' component={HomeScreen} />
      <Tab.Screen name='Post' component={PostScreen} />
      <Tab.Screen name='Map' component={GoogleMapView} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

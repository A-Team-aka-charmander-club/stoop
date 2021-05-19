import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import {
  HomeStackNavigator,
  PostStackNavigator,
  //MapStackNavigator,
} from '../StackNavigator/StackNavigator';
import HomeScreen from '../../HomeScreen/HomeScreen';
import PostScreen from '../../PostScreen/PostScreen';
import GoogleMapView from '../../MapView/GoogleMapView';
import CameraModal from '../../CameraModal/CameraModal';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import UserAccount from '../../UserAccount/UserAccount';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      tabBarOptions={{
        activeTintColor: '#e91e63',
        showLabel: false,
      }}
    >
      <Tab.Screen
        name='Home'
        component={HomeStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='home' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='CameraModal'
        component={CameraModal}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='camera' color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name='PostNav'
        component={PostStackNavigator}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name='plus-box-outline'
              color={color}
              size={size}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Account'
        component={UserAccount}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='account' color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

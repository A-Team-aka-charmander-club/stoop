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
import { FontAwesome5 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

import UserAccount from '../../UserAccount/UserAccount';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: '#e91e63',
        showLabel: true,
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{
          unmountOnBlur: true,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            // <MaterialCommunityIcons name='home' color={color} size={size} />
            <Fontisto name="ship" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="CameraModal"
        component={CameraModal}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            //<MaterialCommunityIcons name='camera' color={color} size={size} />
            <MaterialCommunityIcons name="telescope" size={24} color="black" />
          ),
        }}
      />
      <Tab.Screen
        name="PostNav"
        component={PostStackNavigator}
        unmountOnBlur={true}
        listeners={({ navigation }) => ({
          blur: () => navigation.setParams({ screen: undefined }),
        })}
        options={{
          unmountOnBlur: true,
          tabBarLabel: 'Add Treasure',
          tabBarIcon: ({ color, size }) => (
            // <MaterialCommunityIcons
            //   name='plus-box-outline'
            //   color={color}
            //   size={size}
            // />
            <MaterialCommunityIcons
              name="treasure-chest"
              size={24}
              color="black"
            />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={UserAccount}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            // <MaterialCommunityIcons name='account' color={color} size={size} />
            <FontAwesome5 name="skull-crossbones" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

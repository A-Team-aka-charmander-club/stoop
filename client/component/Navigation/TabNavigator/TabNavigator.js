import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  HomeStackNavigator,
  PostStackNavigator,
} from '../StackNavigator/StackNavigator';
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';

import UserAccount from '../../UserAccount/UserAccount';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = (props) => {
  const navigation = props.navigation;

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
            <Fontisto name="ship" size={24} color="black" />
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
            <MaterialCommunityIcons
              name="treasure-chest"
              size={24}
              color="black"
            />
          ),
          tabBarButton: (props) => (
            <TouchableOpacity
              {...props}
              onPress={() => navigation.navigate('PostNav', { screen: 'Post' })}
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
            <FontAwesome5 name="skull-crossbones" size={24} color="black" />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

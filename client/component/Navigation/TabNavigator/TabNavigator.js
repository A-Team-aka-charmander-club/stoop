import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  HomeStackNavigator,
  PostStackNavigator,
} from '../StackNavigator/StackNavigator';
import CameraModal from '../../CameraModal/CameraModal';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import theme from '../../../../CustomProps/Theme';
import UserAccount from '../../UserAccount/UserAccount';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName='Home'
      tabBarOptions={{
        activeTintColor: '#e91e63',
        showLabel: true,
      }}
      screenOptions={{
        mode: 'card',
        headerMode: 'float',
        cardStyle: {
          backgroundColor: theme.backgroundColor,
          footerView: theme.footerView,
        },
      }}
    >
      <Tab.Screen
        name='Home'
        component={HomeStackNavigator}
        options={{
          unmountOnBlur: true,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Fontisto name='ship' size={24} color='black' />
          ),
        }}
      />
      <Tab.Screen
        name='CameraModal'
        component={CameraModal}
        options={{
          tabBarLabel: 'Search',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name='telescope' size={24} color='black' />
          ),
        }}
      />
      <Tab.Screen
        name='PostNav'
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
              name='treasure-chest'
              size={24}
              color='black'
            />
          ),
        }}
      />
      <Tab.Screen
        name='Account'
        component={UserAccount}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name='skull-crossbones' size={24} color='black' />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

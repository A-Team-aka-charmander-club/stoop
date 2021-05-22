import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../../HomeScreen/HomeScreen';
import PostScreen from '../../PostScreen/PostScreen';
import GoogleMapView from '../../MapView/GoogleMapView';
import HomeGoogleMapView from '../../MapView/HomeGoogleMapView';
import SinglePost from '../../SinglePost/SinglePost';
import CommentView from '../../Comments/Comments';
import EditPostScreen from '../../PostScreen/EditPostScreen/EditPostScreen';
import theme from '../../../../CustomProps/Theme';

const Stack = createStackNavigator();
const HomeStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='Home'
      screenOptions={{
        cardStyle: { backgroundColor: theme.backgroundColor },
      }}
    >
      <Stack.Screen
        name='Home'
        component={HomeScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
const PostStackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName='Post'
      screenOptions={{
        backgroundColor: theme.backgroundColor,
      }}
    >
      <Stack.Screen
        name='Post'
        component={PostScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='SinglePost'
        component={SinglePost}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name='CommentView'
        component={CommentView}
        options={{ headerShown: true }}
      />
      <Stack.Screen
        name='Edit'
        component={EditPostScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
const MapStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Map'>
      <Stack.Screen
        name='Map'
        component={GoogleMapView}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
export {
  HomeStackNavigator,
  PostStackNavigator,
  MapStackNavigator,
  // SinglePostStackNavigator,
};

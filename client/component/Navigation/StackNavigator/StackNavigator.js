import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../../HomeScreen/HomeScreen';
import PostScreen from '../../PostScreen/PostScreen';
import GoogleMapView from '../../MapView/GoogleMapView';
import HomeGoogleMapView from '../../MapView/HomeGoogleMapView';
import SinglePost from '../../SinglePost/SinglePost';
import CommentView from '../../Comments/Comments';
import EditPostScreen from '../../PostScreen/EditPostScreen/EditPostScreen';

const Stack = createStackNavigator();
const HomeStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen
        name='Home'
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      {/* <Stack.Screen
        name='SinglePost'
        component={SinglePost}
        options={{ headerShown: false }}
      /> */}
    </Stack.Navigator>
  );
};

// const SinglePostStackNavigator = () => {
//   return (
//     <Stack.Navigator initialRouteName='SinglePost'>
//       <Stack.Screen
//         name='SinglePost'
//         component={SinglePost}
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//   );
// };

const PostStackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Post'>
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
<<<<<<< HEAD
        name='Comments'
        component={Comments}
=======
        name='CommentView'
        component={CommentView}
>>>>>>> 445285b5dc7e4676c1c0b9879dc8409484a9c68b
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

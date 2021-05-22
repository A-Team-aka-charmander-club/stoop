import React, { useState } from 'react';
import styles, { BadgedIcon } from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  Text,
  View,
  Image,
  TextInput,
  Button,
  TouchableOpacity,
} from 'react-native';
import { ListItem, Icon, Badge, withBadge } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Card, Title, Paragraph, Chip } from 'react-native-paper';
import { connect } from 'react-redux';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { destroyPost } from '../../store/post';
import { takePhoto } from '../../store/photo';

export const SinglePost = (props) => {
  function handleDelete() {
    props.deletePost(props.post.id, props.user.id);
  }

  function handleEdit() {
    props.takePhoto(props.post.photos[0]);
    props.navigation.navigate('Edit');
  }
  const CommentIcon = BadgedIcon(props.post.comments.length);

  if (props.post.id) {
    console.log(props.user, 'userId');
    return (
      <View style={styles.container}>
        <KeyboardAwareScrollView
          style={{ flex: 1, width: '100%' }}
          keyboardShouldPersistTaps="always">
          <Card>
            <Card.Content>
              <Title>{'Treasure'}</Title>
              <ListItem>
                <Icon name="treasure-chest" type="material-community" />
                <ListItem.Content>
                  <ListItem.Title>{props.post.title}</ListItem.Title>
                  <ListItem.Subtitle>
                    {props.post.description}
                  </ListItem.Subtitle>
                  <ListItem.Subtitle>
                    {props.post.tags.map((tag, index) => {
                      return (
                        <Chip icon="tag" key={index}>
                          {tag.name}
                        </Chip>
                      );
                    })}{' '}
                  </ListItem.Subtitle>
                </ListItem.Content>
              </ListItem>
            </Card.Content>
            <MapView
              style={styles.map}
              provider={PROVIDER_GOOGLE}
              region={{
                latitude: props.post.latitude,
                longitude: props.post.longitude,
                latitudeDelta: 0.0025,
                longitudeDelta: 0.0025,
              }}>
              <Marker
                key={`marker${Date.now()}`}
                coordinate={{
                  latitude: props.post.latitude,
                  longitude: props.post.longitude,
                }}
              />
            </MapView>
            <Image
              source={{ url: props.post.photos[0].firebaseUrl }}
              style={styles.thumbnail}
            />

            {props.post.users[0].id === props.user.id ? (
              <View>
                <Button title="Delete Post" onPress={handleDelete} />
                <Button title="Edit Post" onPress={handleEdit} />
              </View>
            ) : null}
            <ListItem
              navigation={props.navigation}
              onPress={() => props.navigation.navigate('CommentView')}>
              <Title
                style={{
                  flex: 1,
                  justifyContent: 'space-between',
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}>
                {CommentIcon}{' '}
                <Text style={{ flex: 1, fontSize: 22 }}>Comments</Text>
              </Title>
            </ListItem>
            {/* <TouchableOpacity
              navigation={props.navigation}
              onPress={() => props.navigation.navigate('CommentView')}>
              <Text>Comments</Text>
            </TouchableOpacity> */}
          </Card>
        </KeyboardAwareScrollView>
      </View>
    );
  } else {
    {
      props.navigation.navigate('Post');
    }
  }
};
const mapStateToProps = (state) => {
  return {
    post: state.post,
    user: state.user,
  };
};
const mapDispatchToProps = (dispatch, { navigation }) => {
  return {
    deletePost: (postId, userId) =>
      dispatch(destroyPost(postId, navigation, userId)),
    takePhoto: (photo) => dispatch(takePhoto(photo)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);

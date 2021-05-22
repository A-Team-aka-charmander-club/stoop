import React, { useEffect } from 'react';
import styles from './styles';
import { View, Button, Text, ScrollView, SafeAreaView } from 'react-native';
import { logoutUser, getUserPostsThunk } from '../../store/user';
import { connect } from 'react-redux';
import { onLogoutPress } from '../Services/Services';

export function UserAccount(props) {
  useEffect(() => {
    props.getPosts(props.user.id);
  }, [props.navigation]);
  return (
    <SafeAreaView>
      <View>
        <Text>User Profile</Text>
        <Text>User</Text>
        <Button title="Logout" onPress={() => onLogoutPress(props)} />
      </View>
      <ScrollView stickyHeaderIndices={[0]}>
        {<Text style={styles.input}>Treasure You Found</Text>}
        {props.user.posts.map((post, index) => {
          return (
            <ListItem
              key={index}
              style={styles.itemText}
              bottomDivider
              onPress={() => {
                props.getPost(post);
                props.getPhoto(post.photos[0]);
                props.navigation.navigate('PostNav', {
                  screen: 'SinglePost',
                });
              }}>
              <Avatar source={{ url: post.photos[0].firebaseUrl }} />
              <ListItem.Content>
                <ListItem.Title>{post.title}</ListItem.Title>
                <ListItem.Subtitle>
                  {post.tags.map((tag, index) => {
                    return (
                      <Chip selectedColor="#3ca897" icon="tag" key={index}>
                        {tag.name}
                      </Chip>
                    );
                  })}{' '}
                </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
  };
};
const mapDispatch = (dispatch) => {
  return {
    logOut: () => dispatch(logoutUser()),
    getPosts: (userId) => dispatch(getUserPostsThunk(userId)),
  };
};

export default connect(mapStateToProps, mapDispatch)(UserAccount);

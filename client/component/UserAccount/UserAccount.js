import React, { useEffect } from 'react';
import styles from './styles';
import { View, Button, Text, ScrollView, SafeAreaView } from 'react-native';
import { Title, Chip } from 'react-native-paper';
import { ListItem, Avatar } from 'react-native-elements';
import { logoutUser, getUserPostsThunk } from '../../store/user';
import { connect } from 'react-redux';
import { onLogoutPress } from '../Services/Services';
import { getPost } from '../../store/post';
import { takePhoto } from '../../store/photo';

export function UserAccount(props) {
  // useEffect(() => {
  //   console.log('propsUSER', props.user);
  //   props.getPosts(props.user.id);
  // }, [props.navigation]);
  // console.log('PROPS USER OUT OF USE', props.user);
  return (
    <SafeAreaView>
      <View>
        <Title>{`${props.user.fullName}'s Profile`}</Title>
        <Text>User</Text>
        <Button title="Logout" onPress={() => onLogoutPress(props)} />
      </View>
      <ScrollView stickyHeaderIndices={[0]}>
        {<Text style={styles.input}>Treasure You Found</Text>}
        {props.user.posts && props.user.posts.length
          ? props.user.posts.map((post, index) => {
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
            })
          : null}
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
    getPost: (post) => dispatch(getPost(post)),
    getPhoto: (photo) => dispatch(takePhoto(photo)),
  };
};

export default connect(mapStateToProps, mapDispatch)(UserAccount);

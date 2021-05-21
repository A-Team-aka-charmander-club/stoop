import React, { useState } from 'react';

import { View, Button, Text, Image, ScrollView } from 'react-native';
import { ListItem } from 'react-native-elements';
import { logoutUser } from '../../store/user';
import { connect } from 'react-redux';
// import { firebase } from '../../../src/firebase/config';
import { onLogoutPress } from '../Services/Services';
import styles from './styles';
//import { grabPosts } from '../../store/profile';
import { getPost } from '../../store/post';

export class UserAccount extends React.Component {
  constructor(props) {
    super(props);
    console.log('Props:', this.props);
  }

  render() {
    return (
      <View>
        <Text> hi</Text>
        <Text> hey</Text>
        <View>
          <Image
            style={styles.logo}
            source={require('../../../assets/trashPanda.png')}
          />
          <Text>My Posts</Text>
          <Text>hey</Text>
          <ScrollView>
            <Text>My Posts</Text>
            {/* {this.props.posts.map((post, index) => {
              return (
                <ListItem
                  key={index}
                  onPress={() => {
                    this.props.getPost(post);
                  }}
                >
                  <ListItem.Title>{post.title}</ListItem.Title>
                </ListItem>
              );
            })} */}
          </ScrollView>
          <Button
            style={styles.logout}
            title='Logout'
            onPress={() => onLogoutPress(this.props)}
          />
        </View>
      </View>
    );
  }
}

//console.log('profile props post;', props.getPosts(posts));

const mapState = (state) => {
  return {
    post: state.post,
  };
};

const mapDispatch = (dispatch) => {
  return {
    logOut: () => dispatch(logoutUser()),
    getPost: (post) => dispatch(getPost(post)),
  };
};

export default connect(mapState, mapDispatch)(UserAccount);

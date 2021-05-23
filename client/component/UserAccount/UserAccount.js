import React, { useEffect } from 'react';
import styles from './styles';
import {
  View,
  Button,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Title, Chip } from 'react-native-paper';
import { ListItem, Avatar } from 'react-native-elements';
import { logoutUser, getUserPostsThunk } from '../../store/user';
import { connect } from 'react-redux';
import { onLogoutPress } from '../Services/Services';
import { getPost } from '../../store/post';
import { takePhoto } from '../../store/photo';
import theme from '../../../CustomProps/Theme';

export function UserAccount(props) {

  useEffect(() => {
    props.getPosts(props.user.id);
    console.log(props.user, 'user')
    const unsubscribe = props.navigation.addListener('didFocus', () => {
      console.log('hi')
      props.getPosts(props.user.id);
      console.log(props.user, 'user')
    });
    unsubscribe()
  }, [props.navigation]);
  
  return (
    <SafeAreaView style={styles.container}>
      <View styles={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image
          style={styles.logo}
          source={require('../../../assets/trashPandaNoWords.png')}
        />
        <View style={styles.logo}>
          <Title>{`${props.user.fullName}'s Profile`}</Title>
          <Text>{props.user.email}</Text>
        </View>

        <TouchableOpacity
          style={theme.buttonLarge}
          onPress={() => onLogoutPress(props)}>
          <Text style={theme.buttonTitleLarge}>Logout</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.scrollView} stickyHeaderIndices={[0]}>
        <View style={styles.midScreenHeader}>
          {
            <Text style={styles.titleMidScreenHeader}>
              Treasure You Discovered
            </Text>
          }
        </View>
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
                          <Chip
                            selectedColor={theme.colors.accent}
                            icon="tag"
                            key={index}>
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

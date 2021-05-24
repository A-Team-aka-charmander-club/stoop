import React, { useEffect } from 'react';
import styles from './styles';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Title, Chip, Avatar, Card } from 'react-native-paper';
import { ListItem } from 'react-native-elements';
import { logoutUser, getUserPostsThunk } from '../../store/user';
import { connect } from 'react-redux';
import { onLogoutPress } from '../Services/Services';
import { getPost } from '../../store/post';
import { takePhoto } from '../../store/photo';
import theme from '../../../CustomProps/Theme';

export function UserAccount(props) {
  useEffect(() => {
    props.getPosts(props.user.id);
    const unsubscribe = props.navigation.addListener('didFocus', () => {
      props.getPosts(props.user.id);
    });
    unsubscribe();
  }, [props.navigation]);

  const renderItem = ({ item }) => {
    return (
      <Card
        style={styles.scrollCard}
        onPress={() => {
          props.getPost(item);
          props.getPhoto(item.photos[0]);
          props.navigation.navigate('PostNav', { screen: 'SinglePost' });
        }}
      >
        <Card.Content style={styles.cardLayout}>
          <Avatar.Image source={{ url: item.photos[0].firebaseUrl }} />
          <View style={{ flexDirection: 'column', marginLeft: 10 }}>
            <View>
              <Title styles={styles.title}>{item.title}</Title>
            </View>

            <View style={{ flexDirection: 'row', margin: 5 }}>
              {item.tags.map((tag, index) => {
                return (
                  <Chip
                    mode='outlined'
                    selectedColor={theme.colors.accent}
                    size={10}
                    style={{
                      backgroundColor: theme.colors.lightBackground,
                      margin: 4,
                      borderWidth: 1,
                      borderColor: theme.colors.accent,
                      color: theme.colors.accent,
                    }}
                    icon='tag'
                    key={index}
                  >
                    {tag.name}
                  </Chip>
                );
              })}
            </View>
          </View>
        </Card.Content>
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View styles={{ justifyContent: 'center', alignItems: 'center' }}>
        <Image
          style={styles.logo}
          source={require('../../../assets/trashPandaNoWords.png')}
        />
        <View style={styles.logo}>
          <Title
            style={styles.title}
          >{`${props.user.fullName}'s Profile`}</Title>
          <Text>{props.user.email}</Text>
        </View>

        <TouchableOpacity
          style={theme.buttonLarge}
          onPress={() => onLogoutPress(props)}
        >
          <Text style={theme.buttonTitleLarge}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.midScreenHeader}>
        {
          <Text style={styles.titleMidScreenHeader}>
            Treasure You Discovered
          </Text>
        }
      </View>
      {props.user.posts && props.user.posts.length ? (
        <FlatList
          data={props.user.posts}
          renderItem={renderItem}
          keyExtractor={(post) => post.id.toString()}
          contentContainerStyle={styles.contentContainer}
        ></FlatList>
      ) : null}
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

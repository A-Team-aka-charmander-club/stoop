import React, { useState, useEffect } from 'react';
import {
  View,
  Animated,
  TouchableOpacity,
  Text,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { ListItem, Avatar } from 'react-native-elements';
import styles from './styles';
import { connect } from 'react-redux';
import HomeGoogleMapView from '../MapView/HomeGoogleMapView';
import { getPost } from '../../store/post';
import { takePhoto } from '../../store/photo';

export class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <HomeGoogleMapView navigation={this.props.navigation} />
        <ScrollView style={styles.scrollView} stickyHeaderIndices={[0]}>
          {<Text style={styles.input}>Nearby Treasure</Text>}
          {this.props.coordinates.map((post, index) => {
            return (
              <ListItem
                key={index}
                style={styles.itemText}
                bottomDivider
                onPress={() => {
                  this.props.getPost(post);
                  this.props.getPhoto(post.photos[0]);
                  this.props.navigation.navigate('PostNav', {
                    screen: 'SinglePost',
                  });
                }}
              >
                <Avatar source={{ url: post.photos[0].firebaseUrl }} />
                <ListItem.Content>
                  <ListItem.Title>{post.title}</ListItem.Title>
                  <ListItem.Subtitle>
                    {post.tags.map((tag, index) => {
                      return <Text key={index}>{tag.name} </Text>;
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
}
const mapStateToProps = (state) => {
  return {
    coordinates: state.coordinates,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    getPost: (post) => dispatch(getPost(post)),
    getPhoto: (photo) => dispatch(takePhoto(photo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

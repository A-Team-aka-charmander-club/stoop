import React, { useState, useEffect } from 'react';
import theme from '../../../CustomProps/Theme';
import 'react-native-get-random-values';
import {
  View,
  Animated,
  TouchableOpacity,
  Text,
  ScrollView,
  SafeAreaView,
  StickyHeaderComponent,
} from 'react-native';

import { ListItem, Avatar } from 'react-native-elements';
import { Chip, Banner } from 'react-native-paper';
import styles from './styles';
import { connect } from 'react-redux';
import HomeGoogleMapView from '../MapView/HomeGoogleMapView';
import { getPost } from '../../store/post';
import { takePhoto } from '../../store/photo';
import { getCoordinatesThunk } from '../../store/coordinates';


export function HomeScreen(props) {
  const [tags, setTags] = useState([]);
  const [region, setRegion] = useState({
    latitude: 40.751343151025615,
    longitude: -74.00289693630044,
    latitudeDelta: 0.0075,
    longitudeDelta: 0.0075,
  });

  useEffect(() => {
    setTags([]);
    setRegion({
      latitude: 40.751343151025615,
      longitude: -74.00289693630044,
      latitudeDelta: 0.0075,
      longitudeDelta: 0.0075,
    });
  }, [props.navigation]);

  function onTagPress(tagId) {
    if (!tags.includes(tagId)) {
      setTags([...tags, tagId]);
      props.getCoordinates(region, [...tags, tagId]);
    } else {
      let newArray = tags.filter((tag) => tag !== tagId);
      setTags(newArray);
      props.getCoordinates(region, newArray);
    }
  }
  {
    return (
      <SafeAreaView style={styles.container}>
        <HomeGoogleMapView
          navigation={props.navigation}
          region={region}
          setRegion={setRegion}
          tags={tags}
          style={{ margin: 0 }}
        />
        <ScrollView style={styles.scrollView} stickyHeaderIndices={[0]}>
          <View style={styles.midScreenHeader}>
            {<Text style={styles.titleMidScreenHeader}>Nearby Treasure</Text>}
          </View>

          {props.coordinates.map((post, index) => {
            return (
              <ListItem
                key={index}
                // style={styles.itemText}
                bottomDivider
                onPress={() => {
                  props.getPost(post);
                  props.getPhoto(post.photos[0]);
                  props.navigation.navigate('PostNav', {
                    screen: 'SinglePost',
                  });
                }}
              >
                <Avatar source={{ url: post.photos[0].firebaseUrl }} />
                <ListItem.Content>
                  <ListItem.Title>{post.title}</ListItem.Title>
                  <ListItem.Subtitle>
                    {post.tags.map((tag, index) => {
                      const tagId = tag.id;
                      let selected = false;
                      if (tags.includes(tagId)) {
                        selected = true;
                      }
                      return (
                        <Chip
                          selectedColor='#3ca897'
                          selected={selected}
                          icon='tag'
                          key={index}
                          onPress={() => onTagPress(tagId)}
                        >
                          {tag.name}
                        </Chip>
                      );
                    })}
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
    getCoordinates: (region, tags) =>
      dispatch(getCoordinatesThunk(region, tags)),
    getPost: (post) => dispatch(getPost(post)),
    getPhoto: (photo) => dispatch(takePhoto(photo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

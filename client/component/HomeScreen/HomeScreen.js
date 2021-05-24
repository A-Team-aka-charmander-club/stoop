import React, { useState, useEffect } from 'react';
import theme from '../../../CustomProps/Theme';
import 'react-native-get-random-values';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  LogBox,
  TouchableOpacity,
} from 'react-native';
// import TimeAgo from 'react-native-timeago';
import { Chip, Card, Avatar, Title, Paragraph } from 'react-native-paper';
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

    const unsubscribe = props.navigation.addListener('didFocus', () => {
      console.log('focussed');
    });
    unsubscribe();
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

  const renderItem = ({ item, separators }) => {
    return (
      <Card
        style={styles.scrollCard}
        onPress={() => {
          props.getPost(item);
          props.getPhoto(item.photos[0]);
          props.navigation.navigate('PostNav', {
            screen: 'SinglePost',
          });
        }}
      >
        <Card.Content style={styles.cardLayout}>
          <Avatar.Image
            source={{ url: item.photos[0].firebaseUrl }}
            style={styles.avatar}
          />
          <View>
            <Title styles={styles.title}>{item.title}</Title>
            {/* <TimeAgo time={item.createdAt} style={styles.timeAgo} /> */}
          </View>
          <View>
            {item.tags.map((tag, index) => {
              const tagId = tag.id;
              let selected = false;
              if (tags.includes(tagId)) {
                selected = true;
              }
              return (
                <Chip
                  mode='flat'
                  size={10}
                  style={{ backgroundColor: theme.colors.accent }}
                  selectedColor='#4169E1'
                  selected={selected}
                  icon='tag'
                  key={index}
                  textStyle={styles.tagText}
                  onPress={() => onTagPress(tagId)}
                >
                  {tag.name}
                </Chip>
              );
            })}
          </View>
        </Card.Content>
      </Card>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <HomeGoogleMapView
        navigation={props.navigation}
        region={region}
        setRegion={setRegion}
        tags={tags}
        style={{ margin: 0 }}
      />
      <View style={styles.midScreenHeader}>
        {<Text style={styles.titleMidScreenHeader}>Nearby Treasure</Text>}
      </View>
      <FlatList
        data={props.coordinates}
        renderItem={renderItem}
        keyExtractor={(post) => post.id.toString()}
        contentContainerStyle={styles.contenContainer}
      ></FlatList>
    </SafeAreaView>
  );
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

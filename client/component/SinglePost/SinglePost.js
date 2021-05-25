import React from 'react';
import styles, { BadgedIcon } from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Text, View, Image, TouchableOpacity } from 'react-native';
import { ListItem, Icon } from 'react-native-elements';
import { Card, Title, Chip, Paragraph } from 'react-native-paper';
import { connect } from 'react-redux';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { destroyPost } from '../../store/post';
import { takePhoto, clearPhoto } from '../../store/photo';
import theme from '../../../CustomProps/Theme';
import TimeAgo from 'react-native-timeago';

export const SinglePost = (props) => {
  function handleDelete() {
    props.deletePost(props.post.id, props.user.id);
  }

  function handleEdit() {
    props.takePhoto(props.post.photos[0]);
    props.navigation.navigate('Edit');
  }

  let CommentIcon ;
  if(props.post.comments){
    CommentIcon = BadgedIcon(props.post.comments.length);
  } else {
    CommentIcon = BadgedIcon(0);
  }

  if (props.post.id) {
    return (
      <KeyboardAwareScrollView
        style={{
          flex: 1,
          width: '100%',
          backgroundColor: theme.backgroundColor,
        }}
        keyboardShouldPersistTaps='always'
      >
        <View style={{ backgroundColor: theme.backgroundColor }}>
          <View style={styles.midScreenHeader}>
            <Title style={styles.titleMidScreenHeader}>Treasure</Title>
          </View>
          <Card style={styles.cardLayout}>
            <Card.Content style={{ backgroundColor: theme.backgroundColor }}>
              <Card.Cover
                source={{ url: props.post.photos[0].firebaseUrl }}
                style={styles.thumnbnail}
              />

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'baseline',
                  marginTop: 10,
                  backgroundColor: theme.backgroundColor,
                }}
              >
                <Icon name='treasure-chest' type='material-community' />
                <View style={{ marginLeft: 10, flexDirection: 'column' }}>
                  <View>
                    <Title>{props.post.title}</Title>
                    <Paragraph>{props.post.description}</Paragraph>
                    <TimeAgo
                      time={props.post.createdAt}
                      style={styles.timeAgo}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      marginBottom: 10,
                    }}
                  >
                    {props.post.tags.map((tag, index) => {
                      return (
                        <Chip
                          icon='tag'
                          key={index}
                          mode='outlined'
                          size={10}
                          style={{
                            backgroundColor: theme.colors.lightBackground,
                            margin: 4,
                            borderWidth: 1,
                            borderColor: theme.colors.accent,
                            color: theme.colors.accent,
                          }}
                          textStyle={styles.tagText}
                          selectedColor={theme.colors.accent}
                          tagStyle={styles.tagText}
                        >
                          {tag.name}
                        </Chip>
                      );
                    })}
                  </View>
                </View>
              </View>
            </Card.Content>

            {props.post.users[0].id === props.user.id ? (
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  marginBottom: 20,
                }}
              >
                <TouchableOpacity
                  onPress={handleDelete}
                  style={styles.buttonLarge}
                >
                  <Text style={styles.buttonTitleLarge}>Delete Post</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleEdit}
                  style={styles.buttonLarge}
                >
                  <Text style={styles.buttonTitleLarge}>Edit Post</Text>
                </TouchableOpacity>
              </View>
            ) : null}
          </Card>
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            region={{
              latitude: props.post.latitude,
              longitude: props.post.longitude,
              latitudeDelta: 0.0025,
              longitudeDelta: 0.0025,
            }}
          >
            <Marker
              image={require('../../../assets/x.png')}
              key={`marker${Date.now()}`}
              coordinate={{
                latitude: props.post.latitude,
                longitude: props.post.longitude,
              }}
            />
          </MapView>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              alignItems: 'flex-start',
              backgroundColor: theme.backgroundColor,
            }}
          >
            <Title
              style={{
                // flexDirection: 'row',
                // flexWrap: 'wrap',
                backgroundColor: theme.backgroundColor,
              }}
              navigation={props.navigation}
              onPress={() => props.navigation.navigate('CommentView')}
            >
              {CommentIcon}
            </Title>
            <Text
              style={{
                flex: 1,
                fontSize: 22,
                marginBottom: 10,
                marginLeft: 20,
              }}
              navigation={props.navigation}
              onPress={() => props.navigation.navigate('CommentView')}
            >
              Comments
            </Text>
          </View>
        </View>
      </KeyboardAwareScrollView>
    );
  } else {
    props.navigation.navigate('Post');
    return null;
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
    clearPhoto: () => dispatch(clearPhoto()),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SinglePost);

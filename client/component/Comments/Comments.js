import React, { useState, useEffect } from 'react';
import theme from '../../../CustomProps/Theme';
import {
  View,
  TextInput,
  FlatList,
  Text,
  LogBox,
  TouchableOpacity
} from 'react-native';
import { Snackbar } from 'react-native-paper';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux';
import TimeAgo from 'react-native-timeago';
import styles from './styles';
import {
  createComment,
  grabComment,
  destroyComment,
} from '../../store/comments';
import {
  Divider,
  Card,
  Button
} from 'react-native-paper';

export function CommentView(props) {
  const [comment, setComment] = useState('');
  const [visible, setVisible] = useState(false);

  const onDismissSnackBar = () => setVisible(false);

  useEffect(() => {
    props.getComment(props.post.id);
    setVisible(false);
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    LogBox.ignoreLogs(["Can't perform a React state update on an unmounted component"]);
    const unsubscribe = props.navigation.addListener('didFocus', () => {
      console.log()
    });
    unsubscribe()
  }, [props.comments.length])

  const handleSubmit = () => {
    if (!comment.length) {
      setVisible(true);
    } else {
      props.addComment(comment, props.post.id, props.user.id);
      setComment('');
    }
  };

  const handleDelete = (comment) => {
    props.deleteComment(props.user.id, comment.id);
  };

  const getHeader = () => {
    return <Text>{props.post.Title}</Text>;
  };

  const renderItem = ({ item }) => {
    return (
      <Card style={styles.commentCard}>
        <Card.Content>
          <Text>{item.content}</Text>
          <Divider />
          <Text>{item.user.fullName}</Text>
          <TimeAgo time={item.createdAt} />
          {item.user.id === props.user.id ? (
            <Button onPress={() => handleDelete(item)}>Delete</Button>
          ) : null}
        </Card.Content>
      </Card>
    );
  };

  return (
    <KeyboardAwareScrollView>
      <View style={styles.inner}>
        <FlatList
          style={{
            padding: 20,
            automaticallyAdjustContentInsets: false,
          }}
          inverted={false}
          data={props.comments.sort((c1, c2) => {
            let order;
            if (c1.updatedAt > c2.updatedAt) {
              order = 1;
            } else if (c1.updatedAt < c2.updatedAt) {
              order = -1;
            } else {
              if (c1.id < c2.id) {
                order = 1
              } else {
                order = -1
              }
            }
            return order;
          })}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
          ListHeaderComponent={getHeader}
        />

        <View style={styles.inner}>
          <TextInput placeholder="Add a comment..." style={styles.input} value={comment} onChangeText={(text) => setComment(text)} />
        </View>
        <View>
          <Snackbar
            style={styles.snackbar}
            visible={visible}
            onDismiss={onDismissSnackBar}
            action={{
              color: '#f8f5f2',
              label: 'Dismiss',
              onPress: onDismissSnackBar,
            }}>
            <Text>{`Message can't be blank!`}</Text>
          </Snackbar>
          {!visible && (
            <TouchableOpacity
              style={theme.buttonLarge}>
              <Text onPress={handleSubmit}>Submit</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const mapStateToProps = (state) => {
  return {
    post: state.post,
    user: state.user,
    comments: state.comments,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addComment: (comment, postId, userId) =>
      dispatch(createComment(comment, postId, userId)),
    getComment: (postId) => dispatch(grabComment(postId)),
    deleteComment: (userId, commentId) => dispatch(destroyComment(userId, commentId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentView);
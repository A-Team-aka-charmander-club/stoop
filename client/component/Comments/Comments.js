import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  SafeAreaView,
  FlatList,
  Text,
  LogBox
} from 'react-native';
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

  useEffect(() => {
    setComment('')
    props.getComment(props.post.id);
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
  }, [props.comments.length])

  const handleSubmit = () => {
    props.addComment(comment, props.post.id, props.user.id);
    setComment('');
  };

  const handleDelete = (comment) => {
    props.deleteComment(comment.id);
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
    <SafeAreaView >
      <KeyboardAwareScrollView>
        <SafeAreaView style={styles.inner}>

            <FlatList horizontal={false}
              style={{
                padding: 20,
                // height: 100,
                automaticallyAdjustContentInsets: true,
              }}
              data={props.comments}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
              ListHeaderComponent={getHeader}
            />

          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.inner}>
              <TextInput placeholder="Add a comment..." style={styles.textInput} value={comment} onChangeText={(text) => setComment(text)} />
            </View>
          </TouchableWithoutFeedback>
          <Button style={styles.button}>
            <Text onPress={handleSubmit}>Submit</Text>
          </Button>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    </SafeAreaView>
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
    deleteComment: (commentId) => dispatch(destroyComment(commentId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentView);
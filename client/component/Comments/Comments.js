import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  // TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';
import { Snackbar } from 'react-native-paper';
import { connect } from 'react-redux';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TimeAgo from 'react-native-timeago';
//import Icon from 'react-native-vector-icons';
import styles from './styles';
import {
  createComment,
  grabComment,
  destroyComment,
} from '../../store/comments';
import {
  Divider,
  Text,
  List,
  Paragraph,
  Card,
  Title,
  Button,
} from 'react-native-paper';

export function CommentView(props) {
  const [comment, setComment] = useState('');
  const [visible, setVisible] = useState(false);

  const onDismissSnackBar = () => setVisible(false);

  const handleSubmit = () => {
    if (!comment.length) {
      setVisible(true);
    } else {
      props.addComment(comment, props.post.id, props.user.id);
      setComment('');
    }
  };
  const handleDelete = (comment) => {
    props.deleteComment(comment.userId, comment.id);
  };
  useEffect(() => {
    props.getComment(props.post.id);
    setVisible(false);
  }, [props.comments.length]);

  const getHeader = () => {
    return <Text>{props.post.Title}</Text>;
  };

  const renderItem = ({ item }) => {
    return (
      <Card
      // style={styles.commentCard}
      >
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* <View style={styles.commentContainer}> */}
        <View>
          {/* {props.comments.length > 0 && props.comments */}
          <FlatList
            style={{
              padding: 20,
              // height: 100,
              automaticallyAdjustContentInsets: true,
            }}
            data={props.comments}
            renderItem={renderItem}
            keyExtractor={(item) => item.id.toString()}
            ListHeaderComponent={getHeader}
            // ListFooterComponent={getFooter}
          />
        </View>
        {/* replace this block w/flat list + renderitem  */}
        <KeyboardAvoidingView
          style={styles.keyboard}
          keyboardShouldPersistTaps="always">
          <TextInput
            placeholder="Add a comment..."
            style={styles.input}
            value={comment}
            onChangeText={(text) => setComment(text)} // handle input changes
          />
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
              <Text>Message can't be blank!</Text>
            </Snackbar>
            {!visible && (
              <Button color="blue" title="Post!" onPress={handleSubmit} />
            )}
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
    deleteComment: (userId, commentId) =>
      dispatch(destroyComment(userId, commentId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentView);

//onPress={() => handleDelete(comment)}

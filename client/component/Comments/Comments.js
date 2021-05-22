import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
  FlatList,
  KeyboardAvoidingView,
  Text
} from 'react-native';
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
  List,
  Paragraph,
  Card,
  Title, Button
} from 'react-native-paper';

const keyboardVerticalOffset = Platform.OS === 'ios' ? 40 : 0
export function CommentView(props) {
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    props.addComment(comment, props.post.id, props.user.id);
    setComment('');
  };
  const handleDelete = (comment) => {
    props.deleteComment(comment.id);
  };
  useEffect(() => {
    props.getComment(props.post.id);
  }, [props.comments.length]);

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
      {/* <KeyboardAvoidingView
          style={styles.keyboard}
          keyboardShouldPersistTaps="always">
          <TextInput
            placeholder="Add a comment..."
            style={styles.input}
            value={comment}
            onChangeText={(text) => setComment(text)} // handle input changes
          />

          <Button>
            <Text onPress={handleSubmit}>Submit</Text>
          </Button>
        </KeyboardAvoidingView> */}
      <KeyboardAvoidingView behavior='position' keyboardVerticalOffset={keyboardVerticalOffset}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardShouldPersistTaps="always"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.inner}>
            <Text style={styles.header}>Header</Text>
            <TextInput placeholder="Add a comment..." style={styles.textInput} value={comment} onChangeText={(text) => setComment(text)}/>
          </View>
        </TouchableWithoutFeedback>
        <Button style={styles.button}>
            <Text onPress={handleSubmit}>Submit</Text>
        </Button>
      </KeyboardAvoidingView>
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
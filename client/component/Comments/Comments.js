import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  // TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
} from 'react-native';
import { connect } from 'react-redux';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
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

  const handleSubmit = () => {
    props.addComment(comment, props.post.id, props.user.id);
  };
  const handleDelete = (comment) => {
    console.log('IN HANDLE DELETE: ', comment.id);
    props.deleteComment(comment.id);
  };
  useEffect(() => {
    props.getComment(props.post.id);
  }, [props.comments.length]);

  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, width: '100%' }}
      keyboardShouldPersistTaps='always'
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.commentContainer}>
          <View>
            <ScrollView
              style={{
                padding: 20,
                height: 100,
                // automaticallyAdjustContentInsets: true,
              }}
            >
              <Text>
                {props.comments.length > 0 && props.comments
                  ? props.comments.map((comment) => {
                      return (
                        <View key={comment.id}>
                          <Card>
                            <Card.Content>
                              <Text>{comment.content}</Text>
                              <Button onPress={() => handleDelete(comment)}>
                                Delete
                              </Button>
                            </Card.Content>
                          </Card>
                        </View>
                      );
                    })
                  : null}
                ;
              </Text>
            </ScrollView>
            <TextInput
              placeholder='Add a comment...'
              // keyboardType="twitter" // keyboard with no return button
              // autoFocus={true} // focus and show the keyboard
              style={styles.input}
              value={comment}
              onChangeText={(text) => setComment(text)} // handle input changes
            />
          </View>
          <TouchableOpacity>
            <Text onPress={handleSubmit}>Submit</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
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
  console.log('IN MAPDISPATCH');
  return {
    addComment: (comment, postId, userId) =>
      dispatch(createComment(comment, postId, userId)),
    getComment: (postId) => dispatch(grabComment(postId)),
    deleteComment: (commentId) => dispatch(destroyComment(commentId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentView);

//onPress={() => handleDelete(comment)}

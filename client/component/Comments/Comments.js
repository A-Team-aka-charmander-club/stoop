import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  Button,
  // TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  TextInput,
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
      <View style={styles.commentContainer}>
        <Text>!!!!!!!!!!!!!!</Text>
        <Text style={styles.name}>{props.post.title}</Text>
        <View>
          <ScrollView style={{ padding: 100 }}>
            <Text>
              Comments:
              {props.comments.length > 0 && props.comments
                ? props.comments.map((comment) => {
                    return (
                      <View key={comment.id}>
                        <Text>{comment.content}</Text>

                        <View>
                          <Button
                            title='Delete'
                            onPress={() => handleDelete(comment)}
                          />
                        </View>
                      </View>
                    );
                  })
                : null}
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
          <Button title='Submit' onPress={handleSubmit} />
        </TouchableOpacity>
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
  console.log('IN MAPDISPATCH');
  return {
    addComment: (comment, postId, userId) =>
      dispatch(createComment(comment, postId, userId)),
    getComment: (postId) => dispatch(grabComment(postId)),
    deleteComment: (commentId) => dispatch(destroyComment(commentId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentView);

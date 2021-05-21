import React, { useState, useEffect } from 'react';
import {
  View,
  Image,
  // TouchableHighlight,
  TouchableOpacity,
  ScrollView,
  TextInput,
  SafeAreaView,
  FlatList,
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
    setComment('');
  };
  const handleDelete = (comment) => {
    props.deleteComment(comment.id);
  };
  useEffect(() => {
    props.getComment(props.post.id);
  }, [props.comments.length]);
  console.log('PROPS.COMMENTS: ', props.comments[0]);
  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, width: '100%' }}
      keyboardShouldPersistTaps='always'
    >
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.commentContainer}>
          <View>
            <FlatList
              style={{
                padding: 20,
                height: 100,
                // automaticallyAdjustContentInsets: true,
              }}
            >
              {/* replace this block w/flat list + renderitem  */}
              {props.comments.length > 0 && props.comments
                ? props.comments.map((comment) => {
                    return (
                      <Card key={comment.id} style={styles.commentCard}>
                        <Card.Content>
                          <Text>{comment.content}</Text>
                          <Button onPress={() => handleDelete(comment)}>
                            Delete
                          </Button>
                        </Card.Content>
                      </Card>
                    );
                  })
                : null}
              ;
            </FlatList>
            <TextInput
              placeholder='Add a comment...'
              style={styles.input}
              value={comment}
              onChangeText={(text) => setComment(text)} // handle input changes
            />
          </View>
          <Button>
            <Text onPress={handleSubmit}>Submit</Text>
          </Button>
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
  return {
    addComment: (comment, postId, userId) =>
      dispatch(createComment(comment, postId, userId)),
    getComment: (postId) => dispatch(grabComment(postId)),
    deleteComment: (commentId) => dispatch(destroyComment(commentId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentView);

//onPress={() => handleDelete(comment)}

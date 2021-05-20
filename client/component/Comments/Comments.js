import React, { PureComponent, useState, useEffect } from 'react';
import {
  View,
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
import { createComment, grabComment } from '../../store/comments';
import {
  Divider,
  Text,
  List,
  Paragraph,
  Card,
  Title,
} from 'react-native-paper';

export function CommentView(props) {
  const [comment, setComment] = useState('');
  console.log('PROPS.COMMENTS: ', props.comments);
  // console.log('PROPS.USER: ', props.user);

  const handleSubmit = () => {
    props.addComment(comment, props.post.id, props.user.id);
  };
  useEffect(() => {
    props.getComment(props.post.id);
  }, [props.comments.length]);

  const data = props.comments;
  return (
    <KeyboardAwareScrollView
      style={{ flex: 1, width: '100%' }}
      keyboardShouldPersistTaps='always'
    >
      <View style={styles.commentContainer}>
        <View>
          <ScrollView style={{ padding: 100 }}>
            <Text>
              {props.comments.length > 0 && props.comments
                ? props.comments.map((comment) => {
                    return (
                      <Card>
                        <Card.Content>
                          <Text>{comment.content}</Text>
                        </Card.Content>
                      </Card>
                      //<CommentCard comment={comment.content} />
                      // <View key={comment.id} style={styles.singleComment}>
                      // <View>
                      //   <Paragraph style={styles.singleComment}>
                      //     {comment.content}
                      //   </Paragraph>
                      //   <Paragraph> </Paragraph>
                      // </View>
                      // </View> */
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
  return {
    addComment: (comment, postId, userId) =>
      dispatch(createComment(comment, postId, userId)),
    getComment: (postId) => dispatch(grabComment(postId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CommentView);

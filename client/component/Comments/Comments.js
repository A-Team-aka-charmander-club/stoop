import React, { PureComponent, useState, useEffect } from 'react';
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
import { createComment, grabComment } from '../../store/comments';
import Comments from 'react-native-comments';

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
        <Text>!!!!!!!!!!!!!!</Text>
        <Text style={styles.name}>{props.post.title}</Text>
        <View>
          <ScrollView style={{ padding: 100 }}>
            <Text>
              Comments:
              {props.comments.length > 0 && props.comments ? (
                <Comments data={data} />
              ) : null}
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

{
  /* <Text>
              Comments:
              {props.comments.length > 0 && props.comments
                ? props.comments.map((comment) => {
                    return comment.content;
                  })
                : null}
            </Text> */
}

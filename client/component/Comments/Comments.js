import React, { PureComponent, useState } from 'react';
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
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';
import { createComment } from '../../store/comments';

export function Comments(props) {
  const [comment, setComment] = useState('');

  const handleSubmit = () => {
    props.addComment(comment, props.post.id, props.user.id);
  };
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
            <Text>COMMENTS WILL GO HERE </Text>
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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Comments);

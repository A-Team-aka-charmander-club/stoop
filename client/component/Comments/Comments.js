import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Alert,
  TextInput,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TimeAgo from 'react-native-timeago';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles from './styles';

export function Comments(props) {
  return (
    <View style={styles.commentContainer}>
      <Text>!!!!!!!!!!!!!!</Text>
      <Text>{props.post.title}</Text>
      <View>
        <TextInput
          placeholder='Add a comment...'
          // keyboardType="twitter" // keyboard with no return button
          // autoFocus={true} // focus and show the keyboard
          style={styles.input}
          value={props.comments}
          // onChangeText={this.onChangeText} // handle input changes
          // onSubmitEditing={this.onSubmitEditing} // handle submit event
        />
      </View>
    </View>
  );
}

const mapStateToProps = (state) => {
  return {
    post: state.post,
    user: state.user,
    comments: state.comments,
  };
};

export default connect(mapStateToProps, null)(Comments);
// Comment.propTypes = {
//   data: PropTypes.object,
//   body: PropTypes.string,
//   styles: PropTypes.object,
//   canEdit: PropTypes.bool,
//   canEdit: PropTypes.bool,
//   child: PropTypes.bool,
//   editComment: PropTypes.func,
//   likeAction: PropTypes.func,
//   liked: PropTypes.bool,
//   likesNr: PropTypes.number,
//   likesTapAction: PropTypes.func,
//   replyAction: PropTypes.func,
//   deleteAction: PropTypes.func,
//   reportAction: PropTypes.func,
//   reported: PropTypes.bool,
//   updatedAt: PropTypes.string,
//   username: PropTypes.string,
//   usernameTapAction: PropTypes.func
// };

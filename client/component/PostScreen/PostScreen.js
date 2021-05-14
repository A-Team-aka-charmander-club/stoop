// what is this?

//click '+' to create post
// brings up camera (to take picture)
// once picture is taken (or uploaded) => another screen with text input fields + tags + location info (something maps)
// submit creates post
// confirmation that it worked somehow (navigates to post)

import React, { useState } from 'react';
import styles from './styles';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  TextInput,
} from 'react-native';
import { firebase } from '../../../src/firebase/config';
import { connect } from 'react-redux';

export const PostScreen = (props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  return (
    <View style={styles.container}>
      <KeyboardAwareScrollView
        style={{ flex: 1, width: '100%' }}
        keyboardShouldPersistTaps='always'
      >
        <Text>Create Post</Text>

        {/* photo display */}
        <Image source={{ uri: props.photo }} style={styles.thumbnail} />

        {/* post form */}
        <TextInput
          style={styles.input}
          placeholder='Title'
          value={title}
          onChangeText={(text) => setTitle(text)}
        />

        <TextInput
          style={styles.input}
          placeholder='Description'
          value={description}
          onChangeText={(text) => setDescription(text)}
        />
        {/* <TextInput style={styles.input} placeholder='Tags'></TextInput> */}

        {/* submit */}
        <TouchableOpacity style={styles.button} onPress>
          <Text style={styles.button}>Post!</Text>
        </TouchableOpacity>

        {/* mapview */}
      </KeyboardAwareScrollView>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    photo: state.photo,
  };
};

export default connect(mapStateToProps, null)(PostScreen);

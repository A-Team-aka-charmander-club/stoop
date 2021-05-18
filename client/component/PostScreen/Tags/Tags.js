import React, { Component } from 'react';
import { Dimensions, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TagInput from 'react-native-tags-input';
import styles from './styles';
import { addTags, removeTags } from '../../../store/tag';
import { connect } from 'react-redux';

export function Tags(props) {
  const updateTagState = (state) => {
    console.log(state);
    props.setTags(state);
    if (state.tagsArray !== props.reduxTags) {
      props.addTags(state.tagsArray);
    }
  };

  return (
    <View style={styles.container}>
      <TagInput
        updateState={updateTagState}
        tags={props.tags}
        placeholder="Tags..."
        label="Press space to add a tag"
        labelStyle={{ color: '#fff' }}
        leftElement={<MaterialCommunityIcons name="tag-multiple" />}
        leftElementContainerStyle={{ marginLeft: 3 }}
        containerStyle={{ width: Dimensions.get('window').width - 40 }}
        inputContainerStyle={[styles.textInput]}
        autoCorrect={false}
        tagStyle={styles.tag}
        tagTextStyle={styles.tagText}
        keysForTag={' '}
      />
    </View>
  );
}
const mapStateToProps = (state) => {
  return {
    reduxTags: state.tags,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTags: (tags) => dispatch(addTags(tags)),
    removeTags: () => dispatch(removeTags()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tags);

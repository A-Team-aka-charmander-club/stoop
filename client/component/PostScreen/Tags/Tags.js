import React, { Component } from 'react';
import { Dimensions, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TagInput from 'react-native-tags-input';
import styles from './styles';
import { addTags, removeTags } from '../../../store/tag';
import { connect } from 'react-redux';

const mainColor = '#3ca897';

export class Tags extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tags: {
        tag: '',
        tagsArray: [],
      },
      tagsColor: mainColor,
      tagsText: '#fff',
    };
  }

  updateTagState = (state) => {
    this.setState({
      tags: state,
    });
    if (state.tagsArray !== this.props.tags) {
      this.props.addTags(state.tagsArray);
    }
  };

  componentWillUnmount() {
    this.setState({
      tags: {
        tag: '',
        tagsArray: [],
      },
    });
    this.props.removeTags();
  }

  render() {
    return (
      <View style={styles.container}>
        <TagInput
          updateState={this.updateTagState}
          tags={this.state.tags}
          placeholder="Tags..."
          label="Press space to add a tag"
          labelStyle={{ color: '#fff' }}
          leftElement={
            <MaterialCommunityIcons
              name="tag-multiple"
              color={this.state.tagsText}
            />
          }
          leftElementContainerStyle={{ marginLeft: 3 }}
          containerStyle={{ width: Dimensions.get('window').width - 40 }}
          inputContainerStyle={[
            styles.textInput,
            { backgroundColor: this.state.tagsColor },
          ]}
          inputStyle={{ color: this.state.tagsText }}
          onFocus={() =>
            this.setState({ tagsColor: '#fff', tagsText: mainColor })
          }
          onBlur={() =>
            this.setState({ tagsColor: mainColor, tagsText: '#fff' })
          }
          autoCorrect={false}
          tagStyle={styles.tag}
          tagTextStyle={styles.tagText}
          keysForTag={' '}
        />
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    tags: state.tags,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addTags: (tags) => dispatch(addTags(tags)),
    removeTags: () => dispatch(removeTags()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Tags);

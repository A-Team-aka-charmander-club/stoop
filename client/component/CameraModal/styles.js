import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Button,
  Image,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

export selectFile = () => {
  var options = {
    title: 'Select Image',
    // customButtons: [
    //   {
    //     name: 'customOptionKey',
    //     title: 'Choose file from Custom Option',
    //   },
    // ],
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };

  ImagePicker.showImagePicker(options, (res) => {
    console.log('Response = ', res);

    if (res.didCancel) {
      console.log('User cancelled image picker');
    } else if (res.error) {
      console.log('ImagePicker Error: ', res.error);
    } else if (res.customButton) {
      console.log('User tapped custom button: ', res.customButton);
      alert(res.customButton);
    } else {
      let source = res;
      this.setState({
        resourcePath: source,
      });
    }
  });
};

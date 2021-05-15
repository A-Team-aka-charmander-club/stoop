import * as ImagePicker from 'expo-image-picker';

// allows you to open camera roll + select image (necessary for app use)
let openImagePickerAsync = async (props) => {
  let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (!permissionResult.granted) {
    alert('Permission to acccess camera roll is required!');
    return;
  }

  let pickerResult = await ImagePicker.launchImageLibraryAsync();

  if (pickerResult.cancelled) {
    return;
  }

  if (!pickerResult.cancelled) {
    props.takePhoto(pickerResult.uri);
  }
};

let openCameraAsync = async (props) => {
  //returns permission object
  let permission = await ImagePicker.requestCameraPermissionsAsync();

  if (!permission) {
    alert('Permission to acccess camera roll is required!');
  }
  // returns picture object
  const picture = await ImagePicker.launchCameraAsync();
  if (!picture.cancelled) {
    props.takePhoto(picture.uri);
  }
};

export { openCameraAsync, openImagePickerAsync };

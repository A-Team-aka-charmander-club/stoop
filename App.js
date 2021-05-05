import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import logo from './assets/logo.png'
import * as ImagaPicker from 'expo-image-picker';

export default function App() {
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagaPicker.requestMediaLibraryPermissionsAsync();

    if(!permissionResult.granted){
      alert("Permission to acccess camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult, 'picker result')
  }


  return (
    <View style={styles.container}>
    <Image source={logo} style={styles.image}/>
      <Text style={styles.text}>To share photo with a friend, just press the button</Text>
      {/* <StatusBar style="auto" />
       */}
       <TouchableOpacity
        onPress={openImagePickerAsync}
        style={styles.button}
       >
         <Text style={styles.buttonText}>
           Take a photoo
         </Text>
       </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#888',
    fontSize: 18,
    marginHorizontal: 15
  },
  image: {
    width: 305,
    height: 159,
    marginBottom: 10
  },
  button: {
    backgroundColor:'blue',
    padding: 20,
    borderRadius: 5
  }, 
  buttonText: {
    fontSize: 20,
    color: '#fff'
  }
});

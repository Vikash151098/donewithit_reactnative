import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Platform, Text, View, Image, TextInput, TouchableOpacity } from 'react-native';
import logo from './assets/profile_logo.png';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';
import uploadToAnonymousFilesAsync from 'anonymous-files';

export default function App() {

  let ImageObj = logo;
  const [selectedImage, setSelectedImage] = React.useState(null);
  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);

    if (pickerResult.cancelled === true) {
      return;
    }
    if (Platform.OS === 'web') {
      let remoteUri = await uploadToAnonymousFilesAsync(pickerResult.uri);
      setSelectedImage({ localUri: pickerResult.uri, remoteUri });
    } else {
      setSelectedImage({ localUri: pickerResult.uri, remoteUri: null });
    }
    // setSelectedImage({ localUri: pickerResult.uri });
  };
  let openShareDialogAsync = async () => {
    if (!(await Sharing.isAvailableAsync())) {
      alert(`The image is available for sharing at: ${selectedImage.remoteUri}`);
      return;
    }

    await Sharing.shareAsync(selectedImage.localUri);
  };

  if (selectedImage !== null) {
    ImageObj = { uri: selectedImage.localUri };
    // return (
    //   <View style={styles.container}>
    //     <Image source={{ uri: selectedImage.localUri }} style={styles.thumbnail} />
    //     <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
    //       <Text style={styles.buttonText}>Share this photo</Text>
    //     </TouchableOpacity>
    //   </View>
    // );
  }
  return (
    <View style={styles.container}>
      {/* <Image source={{ uri: "https://i.imgur.com/TkIrScD.png" }} style={styles.logo} /> */}
      <Image source={ImageObj} style={styles.thumbnail}></Image>
      <Text style={{ color: "#f0f8ff", fontSize: 40, textTransform: "uppercase" }}>
        Mahabodhi Tech
      </Text>
      <TouchableOpacity
        onPress={openImagePickerAsync}
        style={styles.button}>
        <Text style={styles.buttonText}>Pick a photo</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
        <Text style={styles.buttonText}>Share this photo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4b0082",
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "blue",
    padding: 20,
    borderRadius: 5,
    margin: 10
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
  },
  thumbnail: {
    width: 300,
    height: 300,
    justifyContent: "center",
    borderRadius: 150,

  }
});


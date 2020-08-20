import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput } from 'react-native';

export default function App() {
  const [text, setText] = useState('');
  return (
    <View style={styles.container}>
      <TextInput
        style={{ height: 40 }}
        placeholder="Type here to translate!"
        onChangeText={text => setText(text)}
        defaultValue={text}
      />
      <Text style={{ padding: 10, fontSize: 42 }}>
        {text.split(' ').map((word) => word || "kumar").join(' ')}
      </Text>
    </View>
  );
}


const displayName = (name) => {
  return (
    <Text>{name}</Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


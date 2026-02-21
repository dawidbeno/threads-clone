import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function NewPostScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>New Post</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    color: '#888',
  },
});

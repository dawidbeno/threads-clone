import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import ActivityPost from '../components/ActivityPost';
import { mockActivityPosts } from '../data/mockActivityPosts';

export default function ActivityScreen() {
  return (
    <FlatList
        style={{ backgroundColor: 'white' }}
        data={mockActivityPosts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ActivityPost post={item} />}
    />
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

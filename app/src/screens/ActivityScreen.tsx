import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import ActivityPost from '../components/ActivityPost';
import { mockActivityPosts } from '../data/mockActivityPosts';
import FilterTabs from '../components/FilterTabs';

export default function ActivityScreen() {
  return (
    <ScrollView style={{ backgroundColor: 'white' }} stickyHeaderIndices={[0]}>

      <FilterTabs />

      {mockActivityPosts.map(post => (
        <ActivityPost key={post.id.toString()} post={post} />
      ))}

    </ScrollView>
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

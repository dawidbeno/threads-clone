import { Entypo } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import FilterMessages from '../components/FilterMessages';
import NotificationCard from '../components/NotificationCard';
import SuggestedProfileCard from '../components/Suggested';
import { mockSuggestedProfiles } from '../data/mockSuggested';

export default function SearchScreen() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.row}>
        <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          <Text style={styles.titleText}>Messages</Text>
          <Ionicons name="notifications-off-outline" size={26} color="#000" style={{ marginLeft: 4 }} />
        </View>
        <Entypo name="new-message" size={26} color="#000" />
      </View>
      <ScrollView 
      stickyHeaderIndices={[1]}
      style={{ flex: 1, backgroundColor: '#fff' }}>
        {/* Child 0: Search bar */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color="#888" />
          <Text style={styles.searchPlaceholder}>Search</Text>
        </View>
        {/* Child 1: Placeholder content */}
        <View style={styles.row}>
          <FilterMessages />
        </View>

        <View>
          <NotificationCard />
        </View>

        <Text style={styles.suggestedText}>Navrhovane</Text>

        {mockSuggestedProfiles.map((profile) => (
        <SuggestedProfileCard
          key={profile.id}
          profile={profile}
          onMessage={() => console.log('Message', profile.username)}
          onDismiss={() => console.log('Dismiss', profile.username)}
        />
      ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  titleText: {
    fontSize: 34,
    fontWeight: 'bold',
  },
  suggestedText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#aaa',
    marginTop: 8,
    marginLeft: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    marginHorizontal: 16,
    marginTop: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    gap: 8,
  },
  searchPlaceholder: {
    color: '#888',
    fontSize: 16,
},
});
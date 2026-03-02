import { Entypo } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

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
});
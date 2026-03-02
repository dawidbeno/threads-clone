// src/components/SuggestedProfileCard.tsx

import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SuggestedProfile } from '../types';

export default function SuggestedProfileCard({ profile, onMessage, onDismiss }: {
  profile: SuggestedProfile;
  onMessage?: () => void;
  onDismiss?: () => void;
}) {
  return (
    <View style={{ backgroundColor: '#fff' }}>
      <View style={styles.container}>
        <Image source={{ uri: profile.avatarUrl }} style={styles.avatar} />

        <View style={styles.textColumn}>
          <Text style={styles.username} numberOfLines={1}>{profile.username}</Text>
          <Text style={styles.subtitle} numberOfLines={2}>{profile.subtitle}</Text>
        </View>

        <TouchableOpacity style={styles.messageBtn} onPress={onMessage}>
          <Text style={styles.messageBtnText}>Message</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.dismissBtn} onPress={onDismiss}>
          <Ionicons name="close" size={20} color="#999" />
        </TouchableOpacity>
      </View>

      <View style={styles.separator} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 12,
    paddingBottom: 0,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#eee',
  },
  textColumn: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
  },
  username: {
    fontSize: 15,
    fontWeight: '700',
    color: '#000',
  },
  subtitle: {
    fontSize: 14,
    color: '#999',
    marginTop: 2,
  },
  messageBtn: {
    backgroundColor: '#000',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  messageBtnText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  dismissBtn: {
    marginLeft: 12,
    padding: 4,
  },
  separator: {
    height: 0.5,
    backgroundColor: '#e0e0e0',
    marginLeft: 76,  // 16 (padding) + 48 (avatar) + 12 (gap)
    marginTop: 12,
  },
});
import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { mockUsers } from '../data/mockuser';

const user = mockUsers[0];

export default function NewPostScreen() {
  const [postText, setPostText] = useState('');
  const inputRef = useRef<TextInput>(null);

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>New thread</Text>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="document-text-outline" size={22} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="ellipsis-horizontal-circle-outline" size={22} color="#000" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.divider} />

      <ScrollView style={styles.body} keyboardShouldPersistTaps="handled">
        {/* Composer row */}
        <View style={styles.composerRow}>
          {/* Avatar + thread line */}
          <View style={styles.avatarColumn}>
            <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
            <View style={styles.threadLine} />
          </View>

          {/* Text area */}
          <View style={styles.contentColumn}>
            {/* Username + Add topic */}
            <View style={styles.usernameRow}>
              <Text style={styles.username}>{user.username}</Text>
              <TouchableOpacity style={styles.addTopicBtn}>
                <Text style={styles.addTopicText}> › Add topic</Text>
              </TouchableOpacity>
            </View>

            {/* Text input */}
            <TextInput
              ref={inputRef}
              style={styles.textInput}
              placeholder="What's new?"
              placeholderTextColor="#aaa"
              multiline
              autoFocus
              value={postText}
              onChangeText={setPostText}
              selectionColor="#000"
            />

            {/* Attachment icons */}
            <View style={styles.attachmentRow}>
              <TouchableOpacity style={styles.attachmentIcon}>
                <Ionicons name="image-outline" size={22} color="#aaa" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.attachmentIcon}>
                <Text style={styles.gifLabel}>GIF</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.attachmentIcon}>
                <Ionicons name="list-outline" size={22} color="#aaa" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.attachmentIcon}>
                <Ionicons name="mic-outline" size={22} color="#aaa" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.attachmentIcon}>
                <Ionicons name="ellipsis-horizontal" size={22} color="#aaa" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Add to thread row */}
        <View style={styles.addThreadRow}>
          <Image source={{ uri: user.avatarUrl }} style={styles.smallAvatar} />
          <Text style={styles.addThreadText}>Add to thread</Text>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.replyOptions}>
          <Ionicons name="git-network-outline" size={18} color="#aaa" />
          <Text style={styles.replyOptionsText}>Reply options</Text>
        </TouchableOpacity>

        <View style={styles.footerRight}>
          <TouchableOpacity style={styles.toggleBtn}>
            <Ionicons name="happy-outline" size={24} color="#aaa" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.postBtn, postText.length > 0 && styles.postBtnActive]}
            disabled={postText.length === 0}
          >
            <Text style={[styles.postBtnText, postText.length > 0 && styles.postBtnTextActive]}>
              Post
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#fff',
  },

  // Header
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  cancelText: {
    color: '#000',
    fontSize: 16,
  },
  headerTitle: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  headerRight: {
    flexDirection: 'row',
    gap: 8,
  },
  headerIcon: {
    padding: 2,
  },

  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ccc',
  },

  // Body
  body: {
    flex: 1,
    paddingTop: 16,
  },

  // Composer
  composerRow: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  avatarColumn: {
    alignItems: 'center',
    marginRight: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
  },
  threadLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#ddd',
    marginTop: 8,
    borderRadius: 1,
    minHeight: 40,
  },
  contentColumn: {
    flex: 1,
    paddingBottom: 12,
  },
  usernameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  username: {
    color: '#000',
    fontWeight: '700',
    fontSize: 15,
  },
  addTopicBtn: {
    marginLeft: 2,
  },
  addTopicText: {
    color: '#aaa',
    fontSize: 15,
  },
  textInput: {
    color: '#000',
    fontSize: 15,
    lineHeight: 22,
    paddingTop: 0,
    paddingBottom: 8,
  },
  attachmentRow: {
    flexDirection: 'row',
    gap: 16,
    marginTop: 8,
  },
  attachmentIcon: {
    padding: 2,
  },
  gifLabel: {
    color: '#aaa',
    fontSize: 13,
    fontWeight: '700',
    borderWidth: 1.5,
    borderColor: '#aaa',
    borderRadius: 4,
    paddingHorizontal: 3,
    paddingVertical: 1,
  },

  // Add to thread
  addThreadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 16,
    marginLeft: 10,
    gap: 12,
  },
  smallAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    opacity: 0.4,
  },
  addThreadText: {
    color: '#aaa',
    fontSize: 15,
  },

  // Footer
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#ddd',
  },
  replyOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  replyOptionsText: {
    color: '#aaa',
    fontSize: 14,
  },
  footerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  toggleBtn: {
    width: 44,
    height: 28,
    backgroundColor: '#eee',
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  postBtn: {
    backgroundColor: '#eee',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  postBtnActive: {
    backgroundColor: '#000',
  },
  postBtnText: {
    color: '#aaa',
    fontWeight: '600',
    fontSize: 15,
  },
  postBtnTextActive: {
    color: '#000',
  },
});

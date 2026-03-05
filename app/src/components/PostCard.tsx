import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Post } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';

export default function PostCard({ post }: { post: Post }) {
  // Track whether the current user has liked this post
  const [isLiked, setIsLiked] = useState(false);

  return (
    <View style={styles.postContainer}>
        <Image 
        source={{ uri: post.avatarUrl }}
        style={{ width: 44, height: 44, borderRadius: 22 }}
        />
        <View style={styles.postContent}>
            <View style={styles.row}>
                <Text style={styles.userName}>{post.username}</Text>
                <Text style={styles.time}>{formatDistanceToNow(new Date(post.createdAt), { addSuffix: false })}</Text>
            </View>
            <Text style={styles.content}>{post.content}</Text>
            <View style={styles.buttonsRow}>
                <TouchableOpacity onPress={() => setIsLiked(!isLiked)}>
                    <View style={styles.row}>
                        <Ionicons 
                          name={isLiked ? "heart" : "heart-outline"} 
                          size={20} 
                          color={isLiked ? "red" : "gray"} 
                        />
                        <Text style={[styles.stats, isLiked && { color: 'red' }]}>
                          {isLiked ? post.likesCount + 1 : post.likesCount}
                        </Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log('Comments pressed!')}>
                    <View style={styles.row}>
                        <Ionicons name="chatbubble-outline" size={20} color="gray" />
                        <Text style={styles.stats}>{post.commentsCount}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log('Reposts pressed!')}>
                    <View style={styles.row}>
                        <Ionicons name="repeat-outline" size={20} color="gray" />
                        <Text style={styles.stats}>{post.repostsCount}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log('Share pressed!')}>
                    <View style={styles.row}>
                        <Ionicons name="share-outline" size={20} color="gray" />
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    postContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor : '#fff',
    },
    postContent: {
        flex: 1,
        marginLeft: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    time: {
        color: 'gray',
        marginLeft: 5,
    },
    content: {
        paddingVertical: 10,
        fontSize: 14,
    },
    buttonsRow: {
        flexDirection: 'row',
        marginTop: 4,
        gap: 20,
    },
    stats:{
        fontSize: 12,
        color: 'gray',
        marginLeft: 4,
    },
});
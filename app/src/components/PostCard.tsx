import { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ScrollView } from 'react-native';
import { Post } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

function ImageGallery({ images }: { images: string[] }) {
  return (
    <View style={{ marginBottom: 8 }}>
        {images.length === 1 && (
        <Image 
        source={{ uri: images[0] }}
        style={{ width: '100%', height: 200, borderRadius: 10, marginTop: 10 }}
        resizeMode="cover"
        />
        )}
        {images.length > 1 && (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 10 }}>
                {images.map((img, index) => (
                    <Image 
                        key={index}
                        source={{ uri: img }}
                        style={{ width: 160, height: 200, borderRadius: 10, marginRight: 8 }}
                        resizeMode="cover"
                    />
                ))}
            </ScrollView>
        )}
    </View>
  );
}

export default function PostCard({ post }: { post: Post }) {
  // Track whether the current user has liked this post
  const [isLiked, setIsLiked] = useState(false);

  // 0 - shows first numer
  // 1 - shows second number (likesCount + 1)
  const slide = useSharedValue(0);

  // When slide si 1, translateY is -16, showing the second number. 
  // When slide is 0, translateY is 0, showing the first number.
  const animatedStackStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: -slide.value * 16 }],
  }));

  const handleLikePress = () => {
    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    // Animate the number change
    slide.value = withTiming(newIsLiked ? 1 : 0, { duration: 250 });
  };

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
            {post.images && <ImageGallery images={post.images} />}
            <View style={styles.buttonsRow}>
                <TouchableOpacity onPress={handleLikePress}>
                    <View style={styles.row}>
                        <Ionicons 
                        name={isLiked ? "heart" : "heart-outline"} 
                        size={20} 
                        color={isLiked ? "red" : "gray"} 
                        />
                        <View style={{ overflow: 'hidden', height: 16 }}>
                            <Animated.View style={animatedStackStyle}>
                                <Text style={{ height: 16, lineHeight: 16, color: 'grey', marginLeft: 4 }}>{post.likesCount}</Text>
                                <Text style={{ height: 16, lineHeight: 16, color: 'red', marginLeft: 4 }}>{post.likesCount + 1}</Text>
                            </Animated.View>
                        </View>
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
        marginTop: 8,
        gap: 20,
    },
    stats:{
        fontSize: 12,
        color: 'gray',
        marginLeft: 4,
    },
});
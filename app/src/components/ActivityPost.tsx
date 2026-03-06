import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { Activity } from '../types';
import { formatDistanceToNow } from 'date-fns';
import { Ionicons } from '@expo/vector-icons';
import Entypo from '@expo/vector-icons/Entypo';
import { useState } from 'react';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated/';

export default function ActivityPostCard({ post }: { post: Activity }) {
    const [isLiked, setIsLiked] = useState(false);
    const slide = useSharedValue(0);

    const handleLikePress = () => {
        const newIsLiked = !isLiked;
        setIsLiked(newIsLiked);
        // Animate the number change
        slide.value = withTiming(newIsLiked ? 1 : 0, { duration: 250 });
    };

    const animatedStackStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: -slide.value * 16 }],
    }));

  return (
    <View style={styles.postContainer}>
        <Image
            source={{ uri: post.avatarUrl }}
            style={styles.avatar}
        />
        <View style={styles.postContent}>
            <View style={styles.row}>
                <Text style={styles.userName}>{post.username}</Text>
                <Text style={[styles.subtext, { marginLeft: 5 }]}>
                    {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
                </Text>
                <Entypo
                    style={{ marginLeft: 'auto' }}
                    name="dots-three-horizontal"
                    size={18}
                    color="gray"
                    marginRight={8}
                />
            </View>

            <View style={styles.contentWithThumbnail}>
                <View style={styles.textColumn}>
                    <Text style={styles.subtext}>Suggested thread</Text>
                    <Text style={styles.content} numberOfLines={3}>
                        {post.content}
                    </Text>
                </View>

                {post.imageUrls?.length === 2 && (
                    <View style={styles.thumbnailStack}>
                        <Image
                            source={{ uri: post.imageUrls[1] }}
                            style={[styles.thumbnail, styles.thumbnailBottom]}
                        />
                        <Image
                            source={{ uri: post.imageUrls[0] }}
                            style={[styles.thumbnail, styles.thumbnailTop]}
                        />
                    </View>
                )}

                {post.imageUrls?.length === 1 && (
                    <Image
                        source={{ uri: post.imageUrls[0] }}
                        style={styles.thumbnailOne}
                    />
                )}
            </View>

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
                <TouchableOpacity>
                    <View style={styles.row}>
                        <Ionicons name="chatbubble-outline" size={20} color="gray" />
                        <Text style={styles.stats}>{post.commentsCount}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.row}>
                        <Ionicons name="repeat-outline" size={20} color="gray" />
                        {post.repostsCount > 0 && (
                            <Text style={styles.stats}>{post.repostsCount}</Text>
                        )}
                    </View>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Ionicons name="share-outline" size={20} color="gray" />
                </TouchableOpacity>
            </View>

            <View style={styles.separator} />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    postContainer: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: '#fff',
    },
    avatar: {
        width: 44,
        height: 44,
        borderRadius: 22,
    },
    postContent: {
        flex: 1,
        marginLeft: 10,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    subtext: {
        color: 'gray',
    },
    contentWithThumbnail: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 4,
    },
    textColumn: {
        flex: 1,
        marginRight: 8,
    },
    content: {
        fontSize: 14,
        marginTop: 2,
    },
    thumbnailStack: {
        width: 46,
        height: 46,
    },
    thumbnail: {
        width: 36,
        height: 36,
        borderRadius: 8,
    },
    thumbnailOne: {
        width: 44,
        height: 44,
        top: 10,
        right: 6,
        borderRadius: 8,
    },
    thumbnailBottom: {
        position: 'absolute',
        bottom: 0,
        right: 0,
    },
    thumbnailTop: {
        position: 'absolute',
        top: 20,
        right: 10,
        width: 40,
        height: 40,
        borderWidth: 2,
        borderColor: '#fff',
    },
    buttonsRow: {
        flexDirection: 'row',
        marginTop: 8,
        gap: 20,
    },
    stats: {
        fontSize: 12,
        color: 'gray',
        marginLeft: 4,
    },
    separator: {
        height: 0.5,
        backgroundColor: '#e0e0e0',
        marginTop: 12,
    },
});
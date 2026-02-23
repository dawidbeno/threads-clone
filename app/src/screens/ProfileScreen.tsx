import { Text, View, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import NewPost from '../components/NewPost';
import { mockProfilePosts } from '../data/mockProfilePosts';
import PostCard from '../components/PostCard';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRef } from 'react';

function ActionButton({ title }: { title: string }) {
    return (
        <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>{title}</Text>
        </TouchableOpacity>
    );
}

function ProfileHeader() {
    return (
        <View>
            <View style={styles.paddedSection}>
                <View style={styles.row}>
                    <View>
                        <Text style={styles.name}>David Beno</Text>
                        <Text>son_of_a_coffee</Text>
                    </View>
                    <Image
                        source={{ uri: 'https://randomuser.me/api/portraits/men/97.jpg' }}
                        style={styles.avatar}
                    />
                </View>

                <Text style={styles.bio}>Toto je moje bio, ktore o mne vlastne ani nic nepovie :P</Text>

                <View style={styles.pillRow}>
                    <View style={styles.pill}>
                        <Text style={styles.pillText}>coffee</Text>
                    </View>
                    <View style={styles.pill}>
                        <Text style={styles.pillText}>computer science</Text>
                    </View>
                    <View style={styles.pill}>
                        <Text style={styles.pillText}>+</Text>
                    </View>
                </View>

                <View style={styles.avatarsRow}>
                    <Image source={{ uri: 'https://randomuser.me/api/portraits/women/69.jpg' }} style={styles.smallAvatar} />
                    <Image source={{ uri: 'https://randomuser.me/api/portraits/men/97.jpg' }} style={[styles.smallAvatar, styles.avatarOverlap]} />
                    <Image source={{ uri: 'https://randomuser.me/api/portraits/women/45.jpg' }} style={[styles.smallAvatar, styles.avatarOverlap]} />
                    <Text style={styles.followersText}>Followers: 1234</Text>
                </View>

                <View style={styles.actionButtonsRow}>
                    <ActionButton title="Edit profile" />
                    <ActionButton title="Share profile" />
                </View>
            </View>

            <View style={styles.tabsRow}>
                <TouchableOpacity style={[styles.tab, styles.activeTab]}>
                    <Text style={styles.activeTabText}>Threads</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab}>
                    <Text style={styles.tabText}>Replies</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab}>
                    <Text style={styles.tabText}>Media</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.tab}>
                    <Text style={styles.tabText}>Reposts</Text>
                </TouchableOpacity>
            </View>

            <NewPost />
        </View>
    );
}

export default function ProfileScreen() {
    const insets = useSafeAreaInsets();
    const scrollY = useRef(new Animated.Value(0)).current;

    const HEADER_MAX_HEIGHT = insets.top + 48; // 48 is the height of the header content
    const HEADER_MIN_HEIGHT = insets.top;
    const ICON_FADE_DISTANCE = 48; // Distance at which icons are fully faded out
    const HEADER_COLLAPSE_DISTANCE = 48; // Distance at which header is fully collapsed

    const headerHeight = scrollY.interpolate({
        inputRange: [0, HEADER_COLLAPSE_DISTANCE],
        outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
        extrapolate: 'clamp',
    });

    const iconOpacity = scrollY.interpolate({
        inputRange: [0, ICON_FADE_DISTANCE],
        outputRange: [1, 0],
        extrapolate: 'clamp',
    });

    console.log('insets.top:', insets.top);

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {/* Collapsing header */}
            <Animated.View style={{
                height: headerHeight,
                backgroundColor: '#fff',
                overflow: 'hidden',
                justifyContent: 'flex-end',
            }}>
                <Animated.View style={{
                    opacity: iconOpacity,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 16,
                    marginBottom: 16,
                }}>
                    <Ionicons name="bar-chart-outline" size={24} color="#000" />
                    <View style={{ flexDirection: 'row', gap: 16 }}>
                        <Ionicons name="search-outline" size={24} color="#000" />
                        <Ionicons name="logo-instagram" size={24} color="#000" />
                        <Ionicons name="menu-outline" size={26} color="#000" />
                    </View>
                </Animated.View>
            </Animated.View>

            {/* FlatList */}
            <Animated.FlatList
                data={mockProfilePosts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <PostCard post={item} />}
                ListHeaderComponent={() => <ProfileHeader />}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                style={styles.container}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    paddedSection: {
        padding: 16,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        borderColor: '#ddd',
        borderWidth: 1,
    },
    bio: {
        marginTop: 10,
    },
    pillRow: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 16,
    },
    pill: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 20,
        paddingHorizontal: 12,
        paddingVertical: 6,
    },
    pillText: {
        color: '#555',
        fontWeight: '500',
    },
    smallAvatar: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#fff',
    },
    avatarOverlap: {
        marginLeft: -10,
    },
    avatarsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
    },
    followersText: {
        marginLeft: 12,
        color: '#555',
    },
    actionButtonsRow: {
        flexDirection: 'row',
        gap: 8,
        marginTop: 16,
    },
    actionButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    actionButtonText: {
        fontWeight: '600',
        fontSize: 14,
    },
    tabsRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    tab: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 6,
    },
    activeTab: {
        borderBottomWidth: 1,
        borderBottomColor: '#000',
    },
    tabText: {
        color: '#aaa',
        fontWeight: '500',
    },
    activeTabText: {
        color: '#000',
        fontWeight: '600',
    },
    separator: {
        height: 1,
        backgroundColor: '#eee',
    },
    topBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    topBarRight: {
        flexDirection: 'row',
        gap: 16,
        alignItems: 'center',
    },
});
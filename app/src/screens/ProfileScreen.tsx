import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import NewPost from '../components/NewPost';
import { mockProfilePosts } from '../data/mockProfilePosts';
import PostCard from '../components/PostCard';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
    useSharedValue,
    useAnimatedScrollHandler,
    useAnimatedStyle,
    interpolate,
    Extrapolation,
} from 'react-native-reanimated';

const ICON_BAR_HEIGHT = 48;

function ActionButton({ title }: { title: string }) {
    return (
        <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>{title}</Text>
        </TouchableOpacity>
    );
}

function ProfileContent() {
    return (
        <>
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
        </>
    );
}

export default function ProfileScreen() {
    const insets = useSafeAreaInsets();
    const scrollY = useSharedValue(0);

    // Point at which icons have fully scrolled past the status bar
    const COLLAPSE_END = insets.top + ICON_BAR_HEIGHT;

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            scrollY.value = event.contentOffset.y;
        },
    });

    // Icons fade out as they scroll into the status bar zone
    const iconBarStyle = useAnimatedStyle(() => ({
        opacity: interpolate(
            scrollY.value,
            [0, COLLAPSE_END * 0.5],
            [1, 0],
            Extrapolation.CLAMP,
        ),
    }));

    // White overlay snaps in right when icons are fully gone
    // This prevents profile content from showing behind status bar
    const overlayStyle = useAnimatedStyle(() => ({
    opacity: scrollY.value >= COLLAPSE_END * 0.5 ? 1 : 0,
}));

    const ListHeader = () => (
        <View>
            {/* Spacer — pushes icons below status bar initially */}
            <View style={{ height: insets.top }} />

            {/* Icon bar — scrolls naturally with content */}
            <Animated.View style={[styles.iconBar, iconBarStyle]}>
                <Ionicons name="bar-chart-outline" size={24} color="#000" />
                <View style={{ flexDirection: 'row', gap: 16 }}>
                    <Ionicons name="search-outline" size={24} color="#000" />
                    <Ionicons name="logo-instagram" size={24} color="#000" />
                    <Ionicons name="menu-outline" size={26} color="#000" />
                </View>
            </Animated.View>

            {/* Profile content */}
            <ProfileContent />
        </View>
    );

    return (
        <View style={{ flex: 1, backgroundColor: '#fff' }}>
            {/* White overlay — only appears after icons are gone */}
            <Animated.View
                style={[
                    {
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: insets.top,
                        backgroundColor: '#fff',
                        zIndex: 10,
                    },
                    overlayStyle,
                ]}
            />

            {/* Single scroll surface — everything scrolls together */}
            <Animated.FlatList
                data={mockProfilePosts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <PostCard post={item} />}
                ListHeaderComponent={ListHeader}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
                style={styles.container}
                onScroll={scrollHandler}
                scrollEventThrottle={16}
                scrollIndicatorInsets={{ top: insets.top }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    iconBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        height: ICON_BAR_HEIGHT,
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
});
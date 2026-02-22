import { Text, View, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import NewPost from '../components/NewPost';
import { mockProfilePosts } from '../data/mockProfilePosts';
import PostCard from '../components/PostCard';

function ActionButton({ title }: { title: string }) {
    return (
        <TouchableOpacity style={styles.actionButton}>
            <Text style={styles.actionButtonText}>{title}</Text>
        </TouchableOpacity>
    );
}

function ListHeader() {
    return (
        <View>
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
    return (
        <View style={styles.container}>
            {/* Static profile header */}
            <View style={styles.headerContainer}>
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

            {/* Posts list with NewPost as header */}
            <FlatList
                data={mockProfilePosts}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => <PostCard post={item} />}
                ListHeaderComponent={<ListHeader />}
                ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContainer: {
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
        paddingVertical: 4,
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
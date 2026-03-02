import { StyleSheet, FlatList, View, Text, TextInput, Image } from "react-native";
import PostCard from "../components/PostCard";
import { mockPosts } from "../data/mockPosts";
import Ionicons from "@expo/vector-icons/build/Ionicons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

function NewPost() {
    return (
        <View>
            <View style={styles.row}>
                <Image 
                source={{ uri: 'https://randomuser.me/api/portraits/men/97.jpg' }}
                style={{ width: 44, height: 44, borderRadius: 22 }}
                />
                <View style={styles.postContent}>
                    <Text style={styles.userName}>David Beno</Text>
                    <TextInput
                        placeholder="What's on your mind?"
                    />
                </View>
            </View>
            <View style={styles.separator} />
        </View>
    );
}

export default function FeedScreen() {
    const insets = useSafeAreaInsets();
    return (
        <View style={{ flex: 1, paddingTop: insets.top, backgroundColor: 'white' }}>
            <View style={styles.header}>
                <Ionicons name="menu-outline" size={30} color="#aaa" />
                <Ionicons name="logo-threads" size={30} />
                <Ionicons name="search-outline" size={30} color="#aaa" />
            </View>
            <FlatList
                    style={{ backgroundColor: 'white' }}
                    data={mockPosts}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <PostCard post={item} />}
                    ItemSeparatorComponent={() => <View style={styles.separator} />}
                    ListHeaderComponent={<NewPost />} />
        </View>
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        padding: 10,
    },
    userName: {
        fontWeight: 'bold',
        fontSize: 15,
    },
    postContent: {
        flex: 1,  // takes up all remaining space after the avatar
        marginLeft: 10,
    },
    separator: {
        height: 0.5,
        backgroundColor: 'lightgray',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        backgroundColor: 'white',
    },
});
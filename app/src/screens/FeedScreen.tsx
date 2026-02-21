import { StyleSheet, FlatList, View, Text, TextInput, Image } from "react-native";
import PostCard from "../components/PostCard";
import { mockPosts } from "../data/mockPosts";

function FeedHeader() {
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
    return (
        <FlatList
            style={{ backgroundColor: 'white' }}
            data={mockPosts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => <PostCard post={item} />}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            ListHeaderComponent={<FeedHeader />}
        />
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
    }
});
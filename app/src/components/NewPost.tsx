import { View, Image, TextInput, Text, StyleSheet } from "react-native";

export default function NewPost() {
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

import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import PostCard from './src/components/PostCard';
import { mockPosts } from './src/data/mockPosts';

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <PostCard post={mockPosts[0]} />
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

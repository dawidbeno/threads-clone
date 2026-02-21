import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import PostCard from './src/components/PostCard';
import { mockPosts } from './src/data/mockPosts';
import FeedScreen from './src/screens/FeedScreen';

export default function App() {
  return (
    <NavigationContainer>
      <View style={styles.container}>
        <FeedScreen />
        <StatusBar style="auto" />
      </View>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 80,
  },
});

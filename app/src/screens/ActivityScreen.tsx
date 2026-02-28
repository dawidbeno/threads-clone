import React from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView } from 'react-native';
import ActivityPost from '../components/ActivityPost';
import { mockActivityPosts } from '../data/mockActivityPosts';
import FilterTabs from '../components/FilterTabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

export default function ActivityScreen() {
  const insets = useSafeAreaInsets()
  const scrollY = useSharedValue(0)
  const TITLE_HEIGHT = 50

  const headerStyle = useAnimatedStyle(() => ({
      height: interpolate(
          scrollY.value,
          [0, TITLE_HEIGHT],
          [insets.top + TITLE_HEIGHT, insets.top],
          'clamp'
      ),
  }))

  const titleStyle = useAnimatedStyle(() => ({
      opacity: interpolate(
          scrollY.value,
          [0, TITLE_HEIGHT],
          [1, 0],
          'clamp'
      ),
  }))

  const scrollHandler = useAnimatedScrollHandler({
      onScroll: (event) => {
          scrollY.value = event.contentOffset.y
      },
  })

  return (
    <View style={{ flex: 1 }}>
      <Animated.View style={[styles.titleContainer, headerStyle]}>
        <Animated.View style={[titleStyle, { flexDirection: 'row', alignItems: 'center'}]}>
          <Text style={styles.title}>Activity</Text>
          <Ionicons name="notifications-off-outline" size={26} color="#000" style={{ marginLeft: -8 }} />
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView style={[styles.animatedScroll]} 
      stickyHeaderIndices={[0]} 
      scrollEventThrottle={16}
      onScroll={scrollHandler}>

        <FilterTabs />

        {mockActivityPosts.map(post => (
          <ActivityPost key={post.id.toString()} post={post} />
        ))}

      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  animatedScroll: {
    backgroundColor: 'white',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    paddingHorizontal: 16,
  },
  titleContainer: {
    backgroundColor: 'white',
    justifyContent: 'flex-end',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    color: '#888',
  },
});

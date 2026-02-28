import React, { useState } from 'react';
import { View, Text, StyleSheet, RefreshControl } from 'react-native';
import ActivityPost from '../components/ActivityPost';
import { mockActivityPosts } from '../data/mockActivityPosts';
import FilterTabs from '../components/FilterTabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { interpolate, useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

export default function ActivityScreen() {
  const [refreshing, setRefreshing] = useState(false)
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

  const onRefresh = () => {
      setRefreshing(true)
      setTimeout(() => setRefreshing(false), 1500)
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Animated.View style={[styles.titleContainer, headerStyle]}>
        <Animated.View style={[titleStyle, styles.titleRow]}>
          <Text style={styles.title}>Activity</Text>
          <Ionicons name="notifications-off-outline" size={26} color="#000" style={{ marginLeft: 4 }} />
        </Animated.View>
      </Animated.View>

      <FilterTabs />

      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
          />
        }
      >
        {mockActivityPosts.map(post => (
          <ActivityPost key={post.id.toString()} post={post} />
        ))}
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    paddingLeft: 16,
  },
  titleContainer: {
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    paddingBottom: 6,
  },
});
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
      transform: [{
        translateY: interpolate(
            scrollY.value,
            [0, TITLE_HEIGHT],
            [0, 15],  // positive = moves down, countering the upward collapse
            'clamp'
        ),
    }],
  }))

  const scrollHandler = useAnimatedScrollHandler({
      onScroll: (event) => {
          scrollY.value = event.contentOffset.y
      },
  })

  const onRefresh = () => {
      setRefreshing(true)
      setTimeout(() => setRefreshing(false), 1000)
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.titleContainer, headerStyle]}>
        <Animated.View style={[titleStyle, styles.titleRow]}>
          <Text style={styles.title}>Activity</Text>
          <Ionicons name="notifications-off-outline" size={26} color="#000" style={{ marginLeft: 4 }} />
        </Animated.View>
      </Animated.View>

      <View style={{ flex: 1 }}>
        <Animated.ScrollView
          scrollEventThrottle={16}
          onScroll={scrollHandler}
          contentContainerStyle={{ paddingTop: 50 }}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              progressViewOffset={40}
            />
          }>
          {mockActivityPosts.map(post => (
            <ActivityPost key={post.id.toString()} post={post} />
          ))}
        </Animated.ScrollView>
        {/* FRONT layer, floats on top */}
          <View style={{ position: 'absolute', top: 0, left: 0, right: 0 }}>
            <FilterTabs />  
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1, 
    backgroundColor: 'white'
  },
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
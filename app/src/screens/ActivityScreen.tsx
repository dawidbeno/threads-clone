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
  
  const TITLE_HEIGHT = 50;
  const FILTER_TABS_HEIGHT = 46; // Make sure this matches your actual FilterTabs component height
  const HEADER_FULL_HEIGHT = insets.top + TITLE_HEIGHT;

  // 1. Move the entire header up using translateY instead of changing its layout height
  const headerStyle = useAnimatedStyle(() => ({
      transform: [{
          translateY: interpolate(
              scrollY.value,
              [0, TITLE_HEIGHT],
              [0, -TITLE_HEIGHT / 1.5], // Moves up completely out of view
              'clamp'
          )
      }],
  }))

  const titleStyle = useAnimatedStyle(() => ({
      opacity: interpolate(
          scrollY.value,
          [0, TITLE_HEIGHT],
          [1, 0],
          'clamp'
      ),
      // Removed the custom translateY here, as the whole header moving handles the motion naturally now
  }));

  // 2. Animate the tabs to start below the header, and scroll up until they hit the safe area
  const filterTabsStyle = useAnimatedStyle(() => ({
      transform: [{
          translateY: interpolate(
              scrollY.value,
              [0, TITLE_HEIGHT],
              [HEADER_FULL_HEIGHT, insets.top], 
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
      
      {/* ScrollView takes up the whole screen now */}
      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={scrollHandler}
        // 3. Push the first post down so it starts underneath the floating header and tabs
        contentContainerStyle={{ paddingTop: HEADER_FULL_HEIGHT + FILTER_TABS_HEIGHT }}
        snapToOffsets={[0, TITLE_HEIGHT]}
        snapToEnd={false}
        decelerationRate="fast"
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            // Ensure the loading spinner isn't hidden behind the sticky header
            progressViewOffset={40}
          />
        }>
        {mockActivityPosts.map(post => (
          <ActivityPost key={post.id.toString()} post={post} />
        ))}
      </Animated.ScrollView>

      {/* ABSOLUTE FLOATING HEADER */}
      <Animated.View style={[
          styles.titleContainer, 
          headerStyle, 
          { height: HEADER_FULL_HEIGHT, paddingTop: insets.top }
      ]}>
        <Animated.View style={[titleStyle, styles.titleRow]}>
          <Text style={styles.title}>Activity</Text>
          <Ionicons name="notifications-off-outline" size={26} color="#000" style={{ marginLeft: 4 }} />
        </Animated.View>
      </Animated.View>

      {/* ABSOLUTE FLOATING TABS */}
      <Animated.View style={[styles.filterTabsContainer, filterTabsStyle]}>
          <FilterTabs />  
      </Animated.View>

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
    paddingBottom: 6,
  },
  title: {
    fontSize: 34,
    fontWeight: 'bold',
    paddingLeft: 16,
  },
  titleContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    justifyContent: 'flex-end',
    zIndex: 5,
  },
  filterTabsContainer: {
    position: 'absolute',
    top: 0, 
    left: 0,
    right: 0,
    zIndex: 10,
  }
});
import { createStaticNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/ProfileScreen';
import ActivityScreen from '../screens/ActivityScreen';
import FeedScreen from '../screens/FeedScreen';
import SearchScreen from '../screens/SearchScreen';
import NewPostScreen from '../screens/NewPostScreen';
import Ionicons from '@expo/vector-icons/build/Ionicons';

const TabNavigator = createBottomTabNavigator({
    screens: {
        Home: {
            screen: FeedScreen,
            options: {
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="home-outline" size={size} color={color} />
                ),
            }
        },
        Search: {
            screen: SearchScreen,
            options: {
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="search-outline" size={size} color={color} />
                ),
            }
        },
        NewPost: {
            screen: NewPostScreen,
            options: {
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="add-circle-outline" size={size} color={color} />
                ),
            }
        },
        Activity: {
            screen: ActivityScreen,
            options: {
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="heart-outline" size={size} color={color} />
                ),
            }
        },
        Profile: {
            screen: ProfileScreen,
            options: {
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="person-outline" size={size} color={color} />
                ),
            }
        },
    }
});

export const Navigation = createStaticNavigation(TabNavigator);
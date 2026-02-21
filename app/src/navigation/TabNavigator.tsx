import { createStaticNavigation } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/ProfileScreen';
import ActivityScreen from '../screens/ActivityScreen';
import FeedScreen from '../screens/FeedScreen';
import SearchScreen from '../screens/SearchScreen';
import NewPostScreen from '../screens/NewPostScreen';

const TabNavigator = createBottomTabNavigator({
    screens: {
        Home: FeedScreen,
        Search: SearchScreen,
        NewPost: NewPostScreen,
        Activity: ActivityScreen,
        Profile: ProfileScreen,
    }
});

export const Navigation = createStaticNavigation(TabNavigator);
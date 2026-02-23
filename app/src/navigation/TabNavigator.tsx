import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/ProfileScreen';
import ActivityScreen from '../screens/ActivityScreen';
import FeedScreen from '../screens/FeedScreen';
import SearchScreen from '../screens/SearchScreen';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './RootNavigator';

function ComposeButton(props: any) {
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
    return (
        <TouchableOpacity
            {...props}
            onPress={() => navigation.navigate('NewPost')}
        />
    );
}

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
        Compose: {
            screen: FeedScreen,
            options: {
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="add-circle-outline" size={size} color={color} />
                ),
                tabBarButton: (props) => <ComposeButton {...props} />,
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
                headerShown: false,
            }
        },
    }
});

export default TabNavigator;
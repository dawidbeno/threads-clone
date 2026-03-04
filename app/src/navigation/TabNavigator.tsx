import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ProfileScreen from '../screens/ProfileScreen';
import ActivityScreen from '../screens/ActivityScreen';
import FeedScreen from '../screens/FeedScreen';
import Ionicons from '@expo/vector-icons/build/Ionicons';
import { TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from './RootNavigator';
import MessagesScreen from '../screens/MessagesScreen';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import AntDesign from '@expo/vector-icons/AntDesign';

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
    screenOptions: {
        tabBarShowLabel: false,
        tabBarStyle: {
            paddingTop: 10,
        },
    },
    screens: {
        Home: {
            screen: FeedScreen,
            options: {
                tabBarIcon: ({ size, focused }) => (
                    <Octicons name={focused ? "home-fill" : "home"} size={size} color="black" />
                ),
                headerShown: false,
            }
        },
        Messages: {
            screen: MessagesScreen,
            options: {
                tabBarIcon: ({ size, focused }) => (
                    <FontAwesome name={focused ? "envelope" : "envelope-o"} size={size} color="black" />
                ),
                headerShown: false,
            }
        },
        Compose: {
            screen: FeedScreen,
            options: {
                tabBarIcon: ({ color, size }) => (
                    <View style={{
                        width: 44,
                        height: 44,
                        borderRadius: 12,
                        backgroundColor: '#ececec',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }}>
                        <AntDesign name="plus" size={26} color="grey" />
                    </View>
                ),
                tabBarButton: (props) => <ComposeButton {...props} />,
            }
        },
        Activity: {
            screen: ActivityScreen,
            options: {
                tabBarIcon: ({ size, focused }) => (
                    <Octicons name={focused ? "heart-fill" : "heart"} size={size} color="black" />
                ),
                headerShown: false,
            }
        },
        Profile: {
            screen: ProfileScreen,
            options: {
                tabBarIcon: ({ size, focused }) => (
                    <FontAwesome5 name={focused?"user-alt" : "user"} size={size} color="black" />
                ),
                headerShown: false,
            }
        },
    }
});

export default TabNavigator;
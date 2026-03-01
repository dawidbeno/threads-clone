import { createStaticNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import NewPostScreen from '../screens/NewPostScreen';

export type RootStackParamList = {
    NewPost: undefined;
    Tabs: undefined;
};

const RootNavigator = createNativeStackNavigator({
    screens: {
        Tabs: {
            screen: TabNavigator,
            options: {
                headerShown: false,
            }
        },
        NewPost: {
            screen: NewPostScreen,
            options: {
                presentation: 'modal',
                headerShown: false,
            }
        },
    }
});

export const Navigation = createStaticNavigation(RootNavigator);
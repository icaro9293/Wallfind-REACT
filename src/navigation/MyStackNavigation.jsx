import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import ShowWallpaper from "../screens/ShowWallpaper";
import CollectionScreen from "../screens/CollectionScreen";
import CollectionDetailsScreen from "../screens/CollectionDetailsScreen";
import SearchScreen from "../screens/SearchScreen";
// import LikeComponent from "../screens/LikeComponent";
import LikeScreen from "../screens/LikeScreen";

const Stack = createNativeStackNavigator()

export function HomeStack() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,

        }}>
            <Stack.Screen name='HOME_SCREEN' component={HomeScreen}></Stack.Screen>
            <Stack.Screen name='SHOW_WALLPAPER_SCREEN' component={ShowWallpaper}></Stack.Screen>
        </Stack.Navigator>
    )
}

export function CollectionStack() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="COLLECTION_SCREEN" component={CollectionScreen}></Stack.Screen>
            <Stack.Screen name="COLLECTION_DETAILS_SCREEN" component={CollectionDetailsScreen}></Stack.Screen>
            <Stack.Screen name='SHOW_WALLPAPER_SCREEN' component={ShowWallpaper}></Stack.Screen>
        </Stack.Navigator>
    )
}

export function SearchStack() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="SEARCH_SCREEN" component={SearchScreen}></Stack.Screen>
            <Stack.Screen name="SHOW_WALLPAPER_SCREEN" component={ShowWallpaper}></Stack.Screen>
        </Stack.Navigator>
    )
}

export function LikeStack() {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen name="LIKE_SCREEN" component={LikeScreen}></Stack.Screen>
            <Stack.Screen name="SHOW_WALLPAPER_SCREEN" component={ShowWallpaper}></Stack.Screen>
        </Stack.Navigator>
    )
}
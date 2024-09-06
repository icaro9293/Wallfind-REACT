import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import LinearGradient from 'react-native-linear-gradient'
import HomeScreen from './src/screens/HomeScreen'
import { HomeStack, CollectionStack, SearchStack, LikeStack } from './src/navigation/MyStackNavigation' //como não é export 'defalt' tem que importar assim.
// import { CollectionStack } from './src/navigation/MyStackNavigation'
import CollectionScreen from './src/screens/CollectionScreen'
import SearchScreen from './src/screens/SearchScreen'
import LikeScreen from './src/screens/LikeScreen'
import SplashScreen from 'react-native-splash-screen'

const Tab = createBottomTabNavigator()

const App = () => {
  useEffect(() => {
    SplashScreen.hide()
  }, [])
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,
        tabBarStyle: {
          height: 80,
          position: 'absolute',
          left: 20,
          right: 20,
          bottom: 20,
          borderRadius: 30,
        },
        tabBarBackground: () => {
          return (
            <LinearGradient
              colors={['purple', 'blue']}
              style={{
                flex: 1,
                borderRadius: 30
              }}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}

            ></LinearGradient>
          )
        },
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'grey'
      }}>
        <Tab.Screen name='HOME_STACK' component={HomeStack} options={{
          tabBarIcon: ({ color, focused, size }) => {
            return (
              <AntDesign name={'home'} size={focused ? 40 : 30} color={color}></AntDesign>
            )
          }
        }}></Tab.Screen>
        <Tab.Screen name='COLLECTION_STACK' component={CollectionStack} options={{
          tabBarIcon: ({ color, focused, size }) => {
            return (
              <FontAwesome5 name={'th-large'} size={focused ? 40 : 30} color={color}></FontAwesome5>
            )
          }
        }}></Tab.Screen>
        <Tab.Screen name='SEARCH_STACK' component={SearchStack} options={{
          tabBarIcon: ({ color, focused, size }) => {
            return (
              <AntDesign name={'search1'} size={focused ? 40 : 30} color={color}></AntDesign>
            )
          }
        }}></Tab.Screen>
        <Tab.Screen name='LIKE_STACK' component={LikeStack} options={{
          tabBarIcon: ({ color, focused, size }) => {
            return (
              <AntDesign name={'hearto'} size={focused ? 40 : 30} color={color}></AntDesign>
            )
          }
        }}></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default App
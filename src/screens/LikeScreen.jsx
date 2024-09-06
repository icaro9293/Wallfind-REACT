import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import data from '../data/imagens.json'
import ImageCard from '../components/ImageCard'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const LikeComponent = () => {
    const navigation = useNavigation()
    const [wallpapers, setWallpapers] = useState([])
    useEffect(() => {
        getWallpapersFromAsyncStorage()
    }, [])
    const handleBackPress = () => {
        navigation.navigate('HOME_SCREEN')
    }

    const getWallpapersFromAsyncStorage = async () => {
        let imagens = await AsyncStorage.getItem('imagens')
        imagens = imagens ? JSON.parse(imagens) : []
        setWallpapers(imagens)
    }

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backIconContainer} onPress={() => {
                handleBackPress()
            }}>
                <Ionicons name={'chevron-back'} size={30} color={'white'}></Ionicons>
            </TouchableOpacity>
            <View>
                <Text style={styles.headerText}>Favoritos</Text>
                <Text style={styles.headerSubText}>Esses são seus wallpapers favoritos</Text>
            </View>
            <FlatList
                data={wallpapers}
                renderItem={({ item, index }) => {
                    return (
                        <ImageCard item={item} index={index}></ImageCard>
                    )
                }}
                numColumns={2}
                contentContainerStyle={{
                    paddingBottom: 200
                }}
            ></FlatList>
        </View>
    )
}

const LikeScreen = () => {
    const isFocused = useIsFocused()
    return isFocused ? <LikeComponent></LikeComponent> : null
}

export default LikeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121928',
        padding: 20
    },
    backIconContainer: {
        height: 40,
        width: 40,
        borderRadius: 15,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10
    },
    headerText: {
        color: 'white',
        fontSize: 30,
        fontWeight: '600'
    },
    headerSubText: {
        color: 'grey',
        fontSize: 20,
        fontWeight: '300'
    }

})
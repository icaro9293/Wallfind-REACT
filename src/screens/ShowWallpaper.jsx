import { ActivityIndicator, Alert, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDownloadFile } from '../hooks/useDownloadFile'
import Share from 'react-native-share'
import ReactNativeBlobUtil from 'react-native-blob-util'

const ShowWallpaper = () => {
    const { downloadFile, porcentagem, downloading } = useDownloadFile()
    const route = useRoute()
    const item = route.params.item
    const navigation = useNavigation()
    const handleBackPress = () => {
        navigation.goBack()
    }
    const handleDownload = () => {
        downloadFile(item.image, item.name)
    }

    const handleLike = async (item) => {
        let likedWallpapers = await AsyncStorage.getItem('imagens')
        likedWallpapers = likedWallpapers ? JSON.parse(likedWallpapers) : []
        let isExist = likedWallpapers.findIndex((image) => {
            return image?._id === item?._id
        })
        if (isExist < 0) { // retorna -1 caso o item não esteja na lista
            likedWallpapers = [item, ...likedWallpapers]
            await AsyncStorage.setItem('imagens', JSON.stringify(likedWallpapers))
            Alert.alert('Adicionado aos Favoritos.', 'O wallpaper selecionado foi adicionado aos favoritos com sucesso',
                [
                    {
                        text: 'Fechar',
                        style: 'cancel'
                    },
                    {
                        text: 'Ver Favoritos',
                        onPress: () => {
                            navigation.navigate('LIKE_STACK')
                        }
                    }
                ]
            )
        } else {
            Alert.alert('Adicionado aos Favoritos.', 'O wallpaper selecionado foi adicionado aos favoritos com sucesso',
                [
                    {
                        text: 'Fechar',
                        style: 'cancel'
                    },
                    {
                        text: 'Ver Favoritos',
                        onPress: () => {
                            navigation.navigate('LIKE_STACK')
                        }
                    }
                ]
            )
        }
    }
    const handleShare = (item) => {
        try {
            ReactNativeBlobUtil.fetch('GET', item.image).then((res) => {
                let status = res.info().status
                if (status === 200) {
                    let base64Str = res.base64()
                    let options = {
                        url: `data:image/jpeg;base64,${base64Str}`
                    }
                    Share.open(options)
                        .then((res) => {
                            console.log(res)
                        })
                        .catch((err) => {
                            err && console.log(err)
                        })
                }
            })

        } catch (error) {

        }
    }
    return (
        <>
            <StatusBar hidden></StatusBar>
            <ImageBackground source={{
                uri: item.image
            }} style={styles.container}>

                <TouchableOpacity onPress={() => { handleBackPress() }} style={styles.backIconContainer}>
                    <Ionicons name={'chevron-back'} size={35} color={'white'}></Ionicons>
                </TouchableOpacity>
                <View style={styles.iconContainer}>
                    <TouchableOpacity onPress={() => {
                        handleLike(item)
                    }}>
                        <AntDesign name={'hearto'} size={30} color={'white'}></AntDesign>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => {
                        handleDownload(item)
                    }}>
                        <AntDesign name={'download'} size={30} color={'white'}></AntDesign>

                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        handleShare(item)
                    }}>
                        <FontAwesome name={'share'} size={30} color={'white'}></FontAwesome>
                    </TouchableOpacity>
                </View>
                {
                    downloading ? (<>
                        <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                            <ActivityIndicator color={'white'} size={'50'}></ActivityIndicator>
                            <Text style={{ color: 'white' }}>Progresso: {porcentagem}%</Text>
                        </View>
                    </>) : null
                }
            </ImageBackground>
        </>
    )
}

export default ShowWallpaper

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#121928',
        flex: 1
    },
    backIconContainer: {
        height: 40,
        width: 40,
        borderRadius: 10,
        margin: 20,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconContainer: {
        position: 'absolute',
        bottom: 150,
        right: 20,
        height: 150,
        // borderWidth: 1,
        // borderColor: 'white',
        justifyContent: 'space-between'
    }
})
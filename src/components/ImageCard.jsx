import { ActivityIndicator, Alert, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useDownloadFile } from '../hooks/useDownloadFile'

const imagemURL = 'https://wallpapers.com/images/high/elegant-iphone-lvssqrgch7ufrn8s.webp'

const ImageCard = ({ item }) => {
    const { downloadFile, downloading, porcentagem } = useDownloadFile()
    const navigation = useNavigation()
    const handleNavigate = () => {
        navigation.navigate('SHOW_WALLPAPER_SCREEN', { item })
    }

    const handleDownload = async (item) => {
        await downloadFile(item.image, item.name)
    }

    const handleLike = async (item) => {
        let likedWallpapers = await AsyncStorage.getItem('imagens')
        likedWallpapers = likedWallpapers ? JSON.parse(likedWallpapers) : []
        let isExist = likedWallpapers.findIndex((image) => {
            return image.id === item.id
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
        }
    }

    return (
        <TouchableOpacity style={styles.container} onPress={() => {
            handleNavigate(item)
        }}>
            <View style={styles.containerImagem}>
                <Image source={{ uri: item.image }} style={styles.imagem}></Image>

            </View>
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
            </View>
            {
                downloading ? (<>
                    <View style={{ justifyContent: 'center', alignItems: 'center', flex: 1, ...StyleSheet.absoluteFillObject, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <ActivityIndicator color={'white'} size={'50'}></ActivityIndicator>
                        <Text style={{ color: 'white' }}>Progresso: {porcentagem}%</Text>
                    </View>
                </>) : null
            }
        </TouchableOpacity>
    )
}

export default ImageCard

const styles = StyleSheet.create({
    container: {
        height: 300,
        width: '50%',
        backgroundColor: '#121928',
        // borderWidth: 1,
        // borderColor: 'black',
        borderRadius: 20,
        overflow: 'hidden',
        marginRight: 0,
        // marginHorizontal: 10,
        marginVertical: 10,
        resizeMode: 'cover',
    },
    imagem: {
        gap: 10,
        flex: 1,
        borderRadius: 15
    },
    iconContainer: {
        position: 'absolute',
        bottom: 20,
        right: 15,
        height: 70,
        // borderWidth: 1,
        // borderColor: 'white',
        justifyContent: 'space-between'
    },
    containerImagem: {
        padding: 10,
        width: '100%',
        height: '100%',
        borderRadius: 15
        // margin: 10
    }
})
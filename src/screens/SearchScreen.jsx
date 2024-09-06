import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AntDesign from 'react-native-vector-icons/AntDesign'
// import data from '../data/imagens.json'
import ImageCard from '../components/ImageCard'
import { useNavigation } from '@react-navigation/native'
import { api } from '../utils/api'
import { useDebouncedCallback } from 'use-debounce'

const SearchScreen = () => {
    const [wallpapers, setWallpapers] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchValue, setSearchValue] = useState('')
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(false)

    const navigation = useNavigation()
    const handleCloseButton = () => {
        navigation.goBack()
    }

    useEffect(() => {
        getAllWallpapers()
    }, [page])

    const getAllWallpapers = async (value) => {
        try {
            setLoading(true)
            const response = await api.get('/api/wallpapers', {
                params: {
                    page,
                    searchValue,
                }
            })
            const newWallpapers = response?.data?.wallpapers || []
            if (newWallpapers.length) {
                if (page == 1) {
                    setWallpapers(newWallpapers)
                } else {
                    setWallpapers([...wallpapers, ...newWallpapers])
                }
            }
            if (newWallpapers.length < 10) {
                setHasMore(false)
            } else {
                setHasMore(true)
            }
            setLoading(false)
        } catch (error) {
            console.log('error: ', error)
            setLoading(false)
        }
    }

    const fetchMoreWallpapers = () => {
        if (hasMore == true) {
            setPage(page + 1)
        }
    }

    const debounced = useDebouncedCallback((value) => {
        setSearchValue(value)
        setPage(1)
        getAllWallpapers(value)
    }, 500)

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.textContainer}>
                    <Text style={styles.textoHeader}>Buscar</Text>
                    <Text style={styles.textoSubHeader}>Buscando em um base de dados de centenas de fotos</Text>
                </View>
                <View style={styles.iconContainer}>
                    <TouchableOpacity style={styles.icon} onPress={() => {
                        handleCloseButton()
                    }}>
                        <AntDesign name={'close'} size={30} color={'white'}></AntDesign>
                    </TouchableOpacity>
                </View>
            </View>
            {/* input container */}
            <View style={styles.inputContainer}>
                <AntDesign name={'search1'} size={30} color={'grey'}></AntDesign>
                <TextInput
                    style={styles.textInput}
                    placeholder='Procurar'
                    placeholderTextColor={'grey'}
                    onChangeText={(value) => {
                        console.log('valor digitado: ', value)
                        debounced(value)
                    }}
                ></TextInput>
            </View>
            <FlatList
                data={wallpapers}
                renderItem={({ item, index }) => (
                    <ImageCard item={item} index={index}></ImageCard>
                )}
                numColumns={2}
                contentContainerStyle={{
                    paddingBottom: 300
                }}
                onEndReachedThreshold={0.7}
                onEndReached={fetchMoreWallpapers}
                ListFooterComponent={<>
                    {
                        loading && (
                            <View style={{ paddingVertical: 20 }}>
                                <ActivityIndicator size={'large'} color={'white'}></ActivityIndicator>
                            </View>
                        )
                    }
                </>}
            ></FlatList>
        </View>
    )
}

export default SearchScreen

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        backgroundColor: '#121928',
        padding: 20
    },
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textContainer: {
        width: '80%'
    },
    iconContainer: {

    },
    icon: {
        backgroundColor: 'grey',
        height: 40,
        width: 40,
        borderRadius: 15,
        justifyContent: 'center',
        alignItems: 'center'

    },
    textoHeader: {
        color: 'white',
        fontSize: 25,
        fontWeight: '600'
    },
    textoSubHeader: {
        color: 'grey',
        fontSize: 15,
        fontWeight: '400'
    },
    inputContainer: {
        height: 50,
        borderWidth: 2,
        borderColor: 'lightblue',
        marginVertical: 20,
        borderRadius: 10,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10
    },
    textInput: {
        flex: 1,
        color: 'white',
        marginLeft: 10
    }
})
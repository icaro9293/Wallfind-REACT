import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import data from '../data/imagens.json'
import ImageCard from '../components/ImageCard'
import { api } from '../utils/api'

const CollectionDetailsScreen = () => {
    const navigation = useNavigation()
    const route = useRoute()
    const item = route.params.item

    const [wallpapers, setWallpapers] = useState([])
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(false)
    const [page, setPage] = useState(1)

    const handleBackPress = () => {
        navigation.goBack()
    }

    useEffect(() => {
        if (item?._id) {
            getAllWallpapers()
        }
    }, [page])

    const getAllWallpapers = async () => {
        try {
            setLoading(true)
            const response = await api.get('api/wallpapers', {
                params: {
                    page,
                    category: item._id
                }
            })
            const newWallpapers = response?.data?.wallpapers || []
            if (newWallpapers.length) {
                setWallpapers([...wallpapers, ...newWallpapers])

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

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => { handleBackPress() }} style={styles.backIconContainer}>
                <Ionicons name={'chevron-back'} size={35} color={'white'}></Ionicons>
            </TouchableOpacity>
            <View>
                <Text style={styles.textoHeader}>{item.name}</Text>
                <Text style={styles.textoSubHeader}>Lista Completa de Wallpapers da Coleção {item.name}</Text>
            </View>
            <TouchableOpacity>
                <FlatList
                    data={wallpapers}
                    renderItem={({ item, index }) => (
                        <ImageCard item={item} index={index}></ImageCard>
                    )}
                    numColumns={2}
                    contentContainerStyle={{
                        paddingBottom: 200
                    }}
                    ListFooterComponent={<>
                        {
                            loading && (
                                <View style={{ paddingVertical: 20 }}>
                                    <ActivityIndicator size={'large'} color={'white'}></ActivityIndicator>
                                </View>
                            )
                        }
                    </>}
                    onEndReachedThreshold={0.7}
                    onEndReached={fetchMoreWallpapers}
                >

                </FlatList>
            </TouchableOpacity>
        </View>
    )
}

export default CollectionDetailsScreen

const styles = StyleSheet.create({
    backIconContainer: {
        height: 40,
        width: 40,
        borderRadius: 10,
        // margin: 20,
        backgroundColor: 'grey',
        justifyContent: 'center',
        alignItems: 'center'
    },
    container: {
        flex: 1,
        backgroundColor: '#121928',
        padding: 20
    },
    textoHeader: {
        fontSize: 22,
        color: 'white',
        fontWeight: '600',
        marginVertical: 10
    },
    textoSubHeader: {
        fontSize: 15,
        color: '#cccc'
    }
})
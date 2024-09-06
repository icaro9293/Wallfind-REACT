import { ActivityIndicator, FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import ImageCard from '../components/ImageCard'
// import data from '../data/imagens.json'
import { api } from '../utils/api'

const HomeScreen = () => {
    const [wallpapers, setWallpapers] = useState([])
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(false)
    const [page, setPage] = useState(1)

    useEffect(() => {
        getAllWallpapers()
    }, [page])

    const getAllWallpapers = async () => {
        try {
            setLoading(true)
            const response = await api.get('/api/wallpapers', {
                params: {
                    page,
                }
            })
            console.log('page: ', page)
            const newWallpapers = response?.data?.wallpapers || []
            if (newWallpapers.length) {
                console.log(newWallpapers.length)
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
            <Header></Header>
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
            ></FlatList>

        </View>
    )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#121928',
        flex: 1,
        paddingHorizontal: 20
    }
})
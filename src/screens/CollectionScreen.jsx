import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import CategoryCard from '../components/CategoryCard'
// import data from '../data/category.json'
import { api } from '../utils/api'

const CollectionScreen = () => {
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)


    useEffect(() => {
        getAllCategories()
    }, [])

    const getAllCategories = async () => {
        try {
            setLoading(true)
            const response = await api.get('/api/categories')
            setCategories(response?.data?.category)
            setLoading(false)

        } catch (error) {
            console.log('error: ', error)
            setLoading(false)
        }

    }
    return (
        <View style={styles.container}>
            <Header></Header>
            <Text style={styles.textHeader}>Coleções</Text>
            <FlatList
                data={categories}
                renderItem={({ item, index }) => (
                    <CategoryCard item={item} index={index}></CategoryCard>
                )}
                contentContainerStyle={{
                    paddingBottom: 300
                }}
            >
            </FlatList>
        </View>
    )
}

export default CollectionScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#121928',
        paddingHorizontal: 20
    },
    textHeader: {
        color: 'white',
        fontSize: 30,
        fontWeight: '700'
    }
})
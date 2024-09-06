import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'


const CategoryCard = ({ item, index }) => {
    const navigation = useNavigation()
    const handleNavigate = (item) => {
        navigation.navigate('COLLECTION_DETAILS_SCREEN', { item })
    }

    return (
        <TouchableOpacity style={styles.container} onPress={() => {
            handleNavigate(item)
        }}>
            <Image source={{ uri: item.image }} style={styles.imagem}></Image>
            <View style={styles.overlay} />
            <View style={styles.textoContainer}>
                <Text style={styles.texto}>{item.name}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CategoryCard

const styles = StyleSheet.create({
    container: {
        marginVertical: 20,
        // borderRadius: 20
    },
    imagem: {
        height: 120,
        width: '100%',
        // marginVertical: 20
        borderRadius: 20
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0,0,0,0.5)'
    },
    texto: {
        color: 'white',
        fontSize: 30,
        fontWeight: '700'
    },
    textoContainer: {
        position: 'absolute',
        bottom: 50,
        left: 20
    }
})
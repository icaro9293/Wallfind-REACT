import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Feather from 'react-native-vector-icons/Feather'

const Header = () => {
    return (
        <View style={styles.container}>
            <Feather name={'menu'} color={'white'} size={30}></Feather>
            <Image source={require('../assets/logo.png')} style={styles.logo}></Image>
            <Feather name={'bell'} color={'white'} size={30}></Feather>
        </View>
    )
}

export default Header

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 5,
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        elevation: 10
    },
    logo: {
        height: 60,
        width: 60
    }
})
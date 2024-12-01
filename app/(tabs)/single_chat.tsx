import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'
import { Header, ScreenWrapper } from '@/components'
import { hp, wp } from '@/helpers'

const SingleChat = () => {
    return (

        
        <View
        style={styles.container}
        >
        <Stack />
                <Header title={'Chat Screen'}/>

            </View>

    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: wp(5),
    
    }
})

export default SingleChat
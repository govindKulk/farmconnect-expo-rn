import { View, Text } from 'react-native'
import React from 'react'
import { Header, ScreenWrapper } from '@/components'
import { Stack } from 'expo-router'
import { theme } from '@/constants'

const ToDo = () => {

    (
        <ScreenWrapper
        
        >

            <Header title='Coming Soon' showBackButton/>
            <View
                style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <Text
                    style={{

                        textAlign: "center",
                        color: theme.colors.primaryDark
                    }}
                >ComingSoon</Text>

            </View>
        </ScreenWrapper>
    )
}

export default ToDo
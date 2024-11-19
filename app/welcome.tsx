import { Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Button from '@/components/Button'
import ScreenWrapper from '@/components/ScreenWrapper'
import { StatusBar } from 'expo-status-bar'
import { wp, hp } from '@/helpers/common'
import { theme } from '@/constants/theme'
import { useRouter } from 'expo-router'
import { useThemeColor } from '@/hooks/useThemeColor'

const Welcome = () => {

    const router = useRouter();
    const headingTextColor = useThemeColor({light: theme.colors.textDark, dark: theme.colors.primaryDark}, "text");
    return (
        <ScreenWrapper
        
        >
            <StatusBar style="dark" />

            <View
                style={styles.container}
            >
                <View>
                    <View
                        style={styles.imageContainer}
                    >
                        <Image source={require('@/assets/images/farmer.png')}

                        />
                    </View>
                    <View
                        style={styles.textContainer}
                    >
                        <Text
                            style={{
                                fontSize: wp(10),
                                fontWeight: "900",
                                color: headingTextColor
                            }}

                        >FarmConnect</Text>
                        <Text
                            style={{
                                fontSize: wp(4),
                                color: theme.colors.textLight
                            }}
                        >Empowering Farmers, Enriching Lives</Text>
                    </View>
                </View>
                
                {/* footer */}
                <View
                    style={{
                        width: "100%",
                        gap: 10
                    }}
                >
                    <Button title="Getting Started" hasShadow buttonStyle={{
                        marginHorizontal: wp(3)
                    }}
                    onPress={() => router.push('/signup')}
                    />
                        <View style={styles.bottomTextContainer}>
                        <Text style={styles.loginText}>{'Already have an account!'}</Text>

                        <Pressable onPress={() => router.push('/login')}>
                            <Text
                                style={[
                                    styles.loginText,
                                    { color: theme.colors.primary, fontWeight: theme.fonts.semibold },
                                ]}
                            >
                                {'Login'}
                            </Text>
                        </Pressable>
                    </View>
                </View>
            </View>



        </ScreenWrapper>
    )
}

export default Welcome

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "space-evenly",
        flex: 1
    },
    imageContainer: {
        justifyContent: "center",
        alignItems: "center",
        alignSelf: "center"
    },
    textContainer: {
        alignItems: "center",
        justifyContent: "center"
    },
    loginText: {
        color: theme.colors.textLight,
        fontSize: hp(1.6),
        textAlign: 'center',
    },
    bottomTextContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 5,
    },
})
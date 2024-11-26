import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { FC } from 'react'
import { theme } from '@/constants'
import { hp, wp } from '@/helpers'
import { useThemeColor } from '@/hooks/useThemeColor'
import { IUser } from '@/types'
import { ThemedText } from './ThemedText'
import { ThemedView } from './ThemedView'
import Icon from '@/assets/icons'
import Avatar from './Avatar'

import Entypo from '@expo/vector-icons/Entypo';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router'

export interface Product {
    title: string;
    description: string;
    price: string;
}
export type Bidder = Partial<IUser> & { message: string, bid: string };
interface BuyerProductCardProps {
    product: Record<any,any>,
    openModal: () => void
}


const BuyerProductCard: FC<BuyerProductCardProps> = ({
    product,
    openModal
}) => {

    const bgColor = useThemeColor({
        light: "white",
        dark: theme.colors.primaryDark
    }, "background")

    const router = useRouter();
    return (
        <View
            style={[styles.cardContainer, {
                backgroundColor: bgColor,
                borderRadius: 16
            }]}
        >
            {/* left col */}
            <View
                style={styles.leftCol}
            >

                <View
                    style={{
                        flexDirection: 'row',
                        gap: 5,
                        
                    }}
                >
                    <Avatar size={wp(15)} uri={product.user.image} style={{
                        alignSelf: "flex-start"
                    }} />
                    <View
                        style={{
                            flex: 1
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: theme.fonts.medium,
                                fontSize: hp(2.25)
                            }}
                        >
                            {product.crop.name}
                        </Text>
                        <Text
                            style={{
                                fontSize: hp(1.75),
                                fontWeight: theme.fonts.semibold
                            }}
                        >
                            By {product.user.name}
                        </Text>
                        <Text
                            style={{
                                fontSize: hp(1.5),
                            }}
                        >
                            {product.description}
                        </Text>
                        <Text
                            style={{
                                fontSize: hp(1.5),

                            }}
                        >
                            Expected Rate: {product.expected_rate} RS / {product.unit}
                        </Text>
                    </View>
                </View>

                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        gap: wp(5),
                        paddingTop: hp(4),
                        alignItems: "flex-end"

                    }}
                >

                    <TouchableOpacity
                        style={{
                            borderColor: '#3cb5e0',
                            borderWidth: 1,
                            borderRadius: wp(100),
                            padding: 2

                        }}

                    >
                        <Entypo name="chat" size={24} color="#3cb5e0" />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => openModal()}
                        style={{
                            borderColor: 'green',
                            borderWidth: 1,
                            borderRadius: wp(100),
                            padding: 2

                        }}

                    >
                        {/* Letter B Icon */}
                        <FontAwesome name="money" size={24} color="green" />
                    </TouchableOpacity>
                </View>



            </View>
            {/* right col */}
            <ThemedView

                style={[styles.rightCol, {
                    elevation: 5,
                    maxWidth: wp(40),
                    maxHeight: 128,
                    borderRadius: 160,
                    flex: 1
                }]}
            >

                <Image source={require('@/assets/images/tomato.jpg')}
                    style={{
                        width: "100%",
                        maxHeight: "100%",
                        borderRadius: 16
                    }}
                />

                <Text
                style={{
                    textAlign: "center",  
                    fontSize: hp(1.5)
                }}
                >
                    {product.title}
                </Text>
            </ThemedView>
        </View>
    )
}


const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        gap: 20,
        paddingHorizontal: wp(2),
        paddingVertical: wp(3)
    },
    leftCol: {
        width: wp(50)
    },
    rightCol: {

    }
})
export default BuyerProductCard
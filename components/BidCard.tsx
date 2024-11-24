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

export interface Product {
    title: string;
    description: string;
    price: string;
}
export type Bidder = Partial<IUser> & { message: string, bid: string };
interface BidCardProps {
    product: Product;
    bidder: Bidder
}


const BidCard: FC<BidCardProps> = ({
    product,
    bidder
}) => {

    const bgColor = useThemeColor({
        light: "white",
        dark: theme.colors.primaryDark
    }, "background")
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
                        alignItems: 'center'
                    }}
                >
                    <Avatar size={60} />
                    <View
                        style={{
                            flex: 1
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: theme.fonts.medium,
                                fontSize: hp(2)
                            }}
                        >
                            {bidder.name}
                        </Text>
                        <Text
                            style={{
                                fontSize: hp(1.5),
                            }}
                        >
                            {bidder.message}
                        </Text>
                        <Text
                            style={{
                                fontSize: hp(1.5),

                            }}
                        >
                            Bid Amount: {bidder.bid}RS / KG
                        </Text>
                    </View>
                </View>

                <View
                    style={{
                        flex: 1,
                        flexDirection: 'row',
                        gap: 5,
                        paddingVertical: 5,
                        justifyContent: 'space-evenly',
                        alignItems: "center"
                    }}
                >

                    <TouchableOpacity
                        style={{
                            borderColor: 'green',
                            borderWidth: 1,
                            borderRadius: wp(100),
                            padding: 2

                        }}
                    >
                        <Entypo name="check" size={24} color="green" />
                    </TouchableOpacity>
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
                        style={{
                            borderColor: 'red',
                            borderWidth: 1,
                            borderRadius: wp(100),
                            padding: 2

                        }}
                    >
                        <Entypo name="cross" size={24} color="red" />
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
export default BidCard
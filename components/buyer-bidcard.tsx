import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
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
import { supabase } from '@/lib/supabase'
import { useRouter } from 'expo-router'
import { getUserImageSrc } from '@/services'
import { useAuth } from '@/contexts/AuthContext'
import { createConversations } from '@/services/messageService'

export interface Product {
    title: string;
    description: string;
    price: string;
}
export type Bidder = Partial<IUser> & { message: string, bid: string };
interface BuyerBidCardProps {
    bid: any,
    onBidCancel: () => void
}


const BuyerBidCard: FC<BuyerBidCardProps> = ({
    bid,
    onBidCancel
}) => {

    const bgColor = useThemeColor({
        light: "white",
        dark: theme.colors.primaryDark
    }, "background")


    const onCancel = async () => {
        const { error } = await supabase.from('bids').delete().eq("id", bid.id);
        if (error) {
            Alert.alert("Error while deleting bid");
            return;
        }
        Alert.alert("Successfully deleted bid");
        onBidCancel();
    }

    const router = useRouter();
    const {user} = useAuth()
    async function handleChatClick() {
        console.log('clicked')
        const data = await createConversations(bid?.farmer?.id , user?.id );
        if(data?.success){
            // console.log(data.data);
            if(data?.data){
                router.push({
                        pathname: '/(buyer)/single_chat',
                        params: {
                            conversationId: data.data.id as string
                        }
                    })

            }
        }
    }
    return (
        <View
        style={{
            flex: 1
        }}
        >
            <View
                style={[styles.cardContainer, {
                    backgroundColor: bgColor,
                    borderRadius: 18,
                    borderBottomEndRadius: (bid?.status  ? 0 : 18),
                    borderBottomStartRadius: (bid?.status ? 0 : 18),
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
                        <Avatar size={60} uri={bid.farmer.image} />
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
                                {bid.farmer.name}
                            </Text>
                            <Text
                                style={{
                                    fontSize: hp(1.5),
                                }}
                            >
                                {bid.message}
                            </Text>
                            <Text
                                style={{
                                    fontSize: hp(1.5),

                                }}
                            >
                                Bid Amount: {bid.bid_price}RS / KG
                            </Text>
                        </View>
                    </View>

                    <View
                        style={{
                            flex: 1,
                            flexDirection: 'row',
                            gap: wp(5),
                            paddingVertical: 5,
                            alignItems: "center"
                        }}
                    >


                        <TouchableOpacity
                            onPress={handleChatClick}
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
                            onPress={onCancel}
                        >
                            <Entypo name="trash" size={24} color="red" />
                        </TouchableOpacity>
                    </View>



                </View>
                {/* right col */}
                <View

                    style={[styles.rightCol, {
                        elevation: 5,
                        maxWidth: wp(40),
                        maxHeight: 128,
                        borderRadius: 160,
                        flex: 1,
                        alignItems: 'center',
                        justifyContent: 'center',
                        overflow: 'hidden'
                    }]}
                >

                    <Image source={getUserImageSrc(bid?.product.cover_image, true)}
                        style={{
                            width: "100%",
                            maxHeight: hp(10),
                            borderRadius: 16,
                            flex: 1
                        }}
                    />

                    <Text
                        style={{

                            textAlign: "center",
                            fontSize: hp(1.5)
                        }}
                    >
                        {bid.product.crop.name}
                    </Text>
                </View>

                
            </View>

            {bid?.status == "accepted" && <View
                    style={{
                        flex: 1,
                        padding: 5,
                        borderBottomLeftRadius: 18,
                        borderBottomRightRadius: 18,
                        backgroundColor: theme.colors.primary
                    }}
                >
                    <Text
                        style={{
                            color: "white",
                            textAlign: "center",
                            fontWeight: theme.fonts.bold
                        }}
                    >
                        Accepted
                    </Text>
                </View>}
                {bid?.status == "cancelled" && <View
                    style={{
                        flex: 1,
                        padding: 5,
                        borderBottomLeftRadius: 18,
                        borderBottomRightRadius: 18,
                        backgroundColor: theme.colors.rose
                    }}
                >
                    <Text
                        style={{
                            color: "white",
                            textAlign: "center",
                            fontWeight: theme.fonts.bold
                        }}
                    >
                        Cancelled
                    </Text>
                </View>}
        </View>
    )
}


const styles = StyleSheet.create({
    cardContainer: {
        flexDirection: 'row',
        flex: 1,
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
export default BuyerBidCard


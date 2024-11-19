import React from 'react'
import { View } from 'react-native-reanimated/lib/typescript/Animated'
import { ThemedView } from '../ThemedView'
import { ThemedText } from '../ThemedText'
import { Image, Pressable, TouchableOpacity } from 'react-native'
import { AntDesign, Ionicons } from '@expo/vector-icons'
import { useThemeColor } from '@/hooks/useThemeColor'
import { hp, wp } from '@/helpers'
import { theme } from '@/constants'
import { darkColors } from '@rneui/themed'

interface ProductCardProps {
    title: string
    description: string
    price: string
    imgSource: string | undefined
}


const ProductCard: React.FunctionComponent<ProductCardProps> = ({
    title,
    description,
    price,
    imgSource = "@/assets/images/tomato.jpg"
}) => {

    const color = useThemeColor({
        light: theme.colors.text,
        dark: theme.colors.textDark
    }, "text")
    return (
        <ThemedView
            lightColor='white'
            darkColor={theme.colors.primaryDark}
            style={{
       
                borderWidth: 0.7,
                borderRadius: 12,
                overflow: "hidden",
                borderColor: 'rgba(0,0,0,0.5)',
                shadowRadius: 50,
                shadowColor: theme.colors.primaryDark,
                shadowOffset: { width: 20, height: 20 },
                elevation: 5

            }}
        >
            <ThemedView
                  lightColor='white'
                  darkColor={theme.colors.primaryDark}
                style={{
                    flexDirection: "row",
                    padding: 10,
                }}
            >
                <ThemedView
                        lightColor='white'
                        darkColor={theme.colors.primaryDark}
                    style={{
                        flex: 1
                    }}
                >
                    <ThemedText
                        type={"subtitle"}
                        style={{
                            color,
                            fontSize: hp(2.5)
                        }}
                    >
                        {title}
                    </ThemedText>


                    <ThemedText
                        style={{
                            fontSize: hp(1.5),
                            fontWeight: 600
                        }}
                    >
                        {price}RS / KG
                    </ThemedText>

                    <ThemedText
                        style={{
                            fontSize: hp(1.5),

                        }}
                        lightColor='gray'
                        darkColor='white'
                    >
                        {description}
                    </ThemedText>



                </ThemedView>

                <ThemedView
                
                    style={{
                        elevation: 5,
                        maxWidth: wp(40),
                        maxHeight: 128,
                        borderRadius: 160,
                        flex: 1
                    }}
                >

                    <Image source={require("@/assets/images/tomato.jpg")}
                        style={{
                            width: "100%",
                            maxHeight: "100%",
                            borderRadius: 16
                        }}
                    />
                </ThemedView>
            </ThemedView>

            <ThemedView
                    lightColor='white'
                    darkColor={theme.colors.primaryDark}
                style={{
                    flexDirection: 'row',
                    gap: 4,
                    alignItems: "center",
                    justifyContent: 'flex-end',
                    padding: 2
                }}
            >


                <ThemedText
                    style={{
                        fontWeight: 700,
                        fontSize: 14,
                        color
                    }}
                >
                    Edit
                    <AntDesign name="right" size={14} color={color} />
                </ThemedText>


            </ThemedView>
        </ThemedView>
    )
}

export default ProductCard

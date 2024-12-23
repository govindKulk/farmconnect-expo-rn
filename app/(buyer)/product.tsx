import { View, Text, Alert, Image, TouchableOpacity } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Stack, useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router'
import { Header, Loading, ScreenWrapper } from '@/components'
import { getSingleProduct } from '@/services/produceService'
import { hp, wp } from '@/helpers'
import { getUserImageSrc } from '@/services'
import { theme } from '@/constants'
import { AntDesign, FontAwesome } from '@expo/vector-icons'
import { supabase } from '@/lib/supabase'
import Icon from '@/assets/icons'
import { useThemeColor } from '@/hooks/useThemeColor'

const ProductDetails = () => {
    const params = useLocalSearchParams();
    const [product, setProduct] = useState<any>();
    const fetchProduct = async () => {
        const { data } = await getSingleProduct(params.productId as string);
        console.log("fetched single product is ", data)
        if (data) {
            setProduct(data);
        } else {
            Alert.alert("Product not found", "Error fetching product data");
            return;
        }
    }

    const router = useRouter();
    useEffect(() => {
        fetchProduct();
    }, [params.productId])

    
    const [loading, setLoading] = useState(false);
  const onDelete = async () => {
    setLoading(true);
    const {error} = await supabase.from('products').delete().eq("id", params.productId);
    if(error){
      setLoading(false);
      Alert.alert("Error while deleting bid");
      return;
    }
    setLoading(false);
    Alert.alert("Successfully deleted bid");
    router.back();
}

     const color = useThemeColor({}, "text")
    return (
        <View style={{
            flex: 1,
            gap: 10,
            paddingHorizontal: wp(3.5),
            paddingVertical: hp(2)
        }}>
            <Header title={product?.crop.name || ""} showBackButton={true} />

            <View
                style={{
                    flex: 1,
                    paddingHorizontal: wp(5),
                    gap: 10
                }}
            >

                <View
                    style={{
                        width: "100%",
                        // overflow: "hidden",
                        height: hp(30),
                        borderRadius: 18,
                        elevation: 5,
                        shadowColor: "white",
                        shadowOffset: 10,
                        shadowOpacity: 0.4,
                        shadowRadius: 10,
                        position: "relative"
                    }}
                >

                {product?.is_organic &&    <View
                    style={{
                        // width: 128,
                        position: "absolute",
                        zIndex: 10,
                        right: -5,
                        top: -5,
                        display: "inline-flex",
                        padding: 5,
                        borderRadius: 12,
                        borderColor: "white",
                        borderWidth: 1,
                        transform: [
                            {
                                rotate: "-20deg"
                            }
                        ],
                        backgroundColor: theme.colors.primary

                    }}
                    >
                        <Text
                        style={[{
                            color,
                            fontWeight: "bold",
                            fontSize: 12
                        }]}
                        >
                            100% Organic
                        </Text>
                    </View>}
                    <Image
                        source={getUserImageSrc(product?.cover_image, true)}
                        style={{
                            flex: 1,
                            width: "100%",
                            height: "100%",
                            borderRadius: 18,
                        }} />
                </View>
                <Text
                    style={{
                        fontSize: hp(3),
                        fontWeight: theme.fonts.bold,
                        color
                    }}
                >{product?.crop.name}</Text>
                <Text
                    style={{
                        fontSize: hp(2),
                        fontWeight: 600,
                        color
                    }}
                >
                    Expected Rate: {product?.expected_rate} RS / per ({product?.unit})
                </Text>
                <Text
                    style={{
                        fontSize: hp(2),
                        fontWeight: 600,
                        color
                    }}
                >
                    Quanity: {product?.quantity}  ({product?.unit})
                </Text>
                <Text
                    style={{
                        fontSize: hp(2),
                        fontWeight: 600,
                        color
                    }}
                >
                    Produce Cycle: {product?.produce_cycle}
                </Text>

                <Text
                    style={{
                        fontSize: hp(2),
                        color

                    }}

                >
                    {product?.description}
                </Text>

                <View
                style={{
                    flexDirection: "row",
                    gap: 20,
                    alignItems: "center",
                    
                }}
                >
      <TouchableOpacity
                            onPress={() => router.push({
                                pathname: "/(buyer)",
                                params: {
                                    modal: "open",
                                    product: product?.id
                                }
                            })}


                            style={{
                                borderColor: 'green',
                                borderWidth: 1,
                                borderRadius: wp(100),
                                padding: 5,
                                flex: 1,
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "row",
                                gap: 10,
                                marginVertical: 10
                            }}

                        >
                            {/* Letter B Icon */}
                            <FontAwesome name="money" size={24} color="green"
                            
                            />
                            <Text
                            style={{
                                color: "green",
                                fontWeight: theme.fonts.bold
                            }}
                            >
                                Apply Bid
                            </Text>
                        </TouchableOpacity>

           

                      
                    

                </View>

            </View>
        </View>
    )
}

export default ProductDetails
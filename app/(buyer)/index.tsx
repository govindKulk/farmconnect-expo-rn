import { View, Text, StyleSheet, Image, ScrollView, Modal, TextInput, Pressable, Touchable, TouchableOpacity, KeyboardAvoidingView, Alert } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { BackButton, Button, ScreenWrapper, TextField } from '@/components'
import Icon from '@/assets/icons'
import { hp, wp } from '@/helpers'
import { fetchAllProducts } from '@/services/produceService'
import { router, useFocusEffect, useLocalSearchParams, useRouter } from 'expo-router'
import ProductCard from '@/components/farmer-home/product-card'
import { theme } from '@/constants'
import BuyerProductCard, { Product } from '@/components/buyer-product-card'
import { Entypo } from '@expo/vector-icons'
import CustomPicker from '@/components/CustomPicker'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import { useThemeColor } from '@/hooks/useThemeColor'

const BuyerHomeScreen = () => {

    const searchRef = useRef<string>();
    const [products, setProducts] = useState<Record<any, any>[]>([]);
    let [productsCopy, setProductsCopy] = useState<any>([]);


    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState<Record<any,any>>();

    // input states
    const [bidPrice, setBidPrice] = useState<string>("");
    const [quantiy, setQuantity] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [bidType, setBidType] = useState<string>("partial");

    
    const openModal = (product: any) => {
        setSelectedProduct(product);
        setIsModalVisible(true);
    };

    const closeModal = () => {
        router.push({pathname: '/(buyer)/'});
        setIsModalVisible(false);
        setSelectedProduct({});
    };

    const {user} = useAuth();
    const submitBid = async () => {
        // Send bidDetails to the backend (Supabase API call)
        const apiBody = {
            bid_price: bidPrice,
            message: message,
            quantity: quantiy,
            bid_type: bidType,
            buyer_id: user?.id,
            product_id: selectedProduct?.id,
            farmer_id: selectedProduct?.user.id


        }
        console.log(apiBody);
        const {error} = await supabase.from('bids').insert(apiBody);
        console.log(error);
        if(error){
            console.log("error inserting data ", error);
            Alert.alert("Error submitting bid request. ");
            closeModal();
            return;
        }
        Alert.alert("Successfully submited bid request.");

        closeModal();
    };

    const params = useLocalSearchParams();

    useEffect(() => {
        if(params?.modal == "open" && params?.product){
           const product = products.find(product => product.id == params.product);
           if(product){
            openModal(product);
           }
        }
    }, [params])

    useFocusEffect(

        useCallback(() => {
            async function fetchProducts() {
                const products = await fetchAllProducts();
                setProducts(products.data as any);
                setProductsCopy(products.data as any);
               
                console.log("Products ", products)
            }
            fetchProducts();
        }, [])
    )

    const onTextChange = (value: string) => {
        searchRef.current = value;
        if (true){
            let filteredProducts = productsCopy.filter((p: any) => p.crop.name == value);
            console.log(productsCopy.length)
            if(filteredProducts.length > 0){

                setProducts(filteredProducts);
            }else{
                setProducts(productsCopy);
            }


        }
    }
      const bgColor = useThemeColor({}, "background")
      const color = useThemeColor({}, "text")

    return (

            <KeyboardAvoidingView
                style={[styles.container, {
                    backgroundColor: bgColor
                }]}
            >

                {/* Search Bar */}
                <TextField
                    icon={<Icon name={'mail'} size={26} strokeWidth={1.6} />}
                    onChangeText={onTextChange}
                    placeholder={'Search for yields.. '}
                    
                />

                <ScrollView

                    contentContainerStyle={
                        styles.productList
                    }
                >
                    {
                        products.length > 0 ? products.map((item, key) => (<BuyerProductCard openModal={() => openModal(item)} key={key} product={item as Product}

                        />)) : <View
                            style={{
                                flex: 1,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >

                            <View
                                style={{
                                    justifyContent: "center",
                                    alignItems: "center",
                                    alignSelf: "center"
                                }}
                            >
                                <Image source={require('@/assets/images/farmer.png')}

                                />
                            </View>

                            <Text
                                style={{
                                    fontSize: hp(2),
                                    fontWeight: theme.fonts.semibold,
                                    textAlign: 'center',
                                    color: theme.colors.textLight
                                }}
                            >You have not uploaded any products so far. Click on the plus icon to add your first product.</Text>
                        </View>
                    }

                    {/* Bid Modal */}
                    {isModalVisible && (
                        <Modal transparent={true}
                        style={{
                            position: "relative"
                        }}
                        visible={isModalVisible} animationType="slide">

                            <View style={[styles.modalContainer, {
                                backgroundColor: bgColor,
                                paddingVertical: hp(2),
                                paddingHorizontal: wp(3),
                                alignItems: 'center',
                                justifyContent: "center",
                                gap: 10
                            }]}>


                                <TouchableOpacity
                                    style={{
                                        borderColor: color,
                                        borderWidth: 1,
                                        borderRadius: wp(100),
                                        padding: 2,
                                        alignSelf: 'flex-end',
                                        position: "absolute",
                                        top: 10,
                                        right: 10
                                    }}
                                    onPress={closeModal}
                                >
                                    <Entypo name="cross" size={24} color={color} />
                                </TouchableOpacity>

                                    <Text
                                    style={{
                                        color,
                                        fontSize: 24,
                                        fontWeight: 'bold'
                                    }}
                                    >
                                        Place Bid
                                    </Text>
                        
                                    <TextInput
                                        value={bidPrice}
                                        onChangeText={(value) => setBidPrice(value)}
                                        placeholder="Enter bid price"
                                        placeholderTextColor={color}
                                        style={[styles.input, {
                                            backgroundColor: bgColor,
                                            color,
                                            borderColor: color,
                                            borderWidth: 1,
                                            borderRadius: 12

                                        }]}
                                        keyboardType="numeric"

                                    />
           
                                <TextInput
                                    multiline={true}
                                    value={message}
                                    onChangeText={(value) => setMessage(value)}
                                    placeholderTextColor={color}
                                    placeholder="Enter message"
                                    style={[styles.input, {
                                            backgroundColor: bgColor,
                                            color,
                                            borderColor: color,
                                            borderWidth: 1,
                                            borderRadius: 12

                                        }]}

                                />
                                <TextInput
                                    multiline={true}
                                    value={quantiy}
                                    onChangeText={(value) => setQuantity(value)}
                                    keyboardType='numeric'
                                    placeholderTextColor={color}
                                    placeholder="Bid Quantity"
                                    style={[styles.input, {
                                            backgroundColor: bgColor,
                                            color,
                                            borderColor: color,
                                            borderWidth: 1,
                                            borderRadius: 12

                                        }]}

                                />

                                <CustomPicker
                                
                                options={[
                                    {
                                        value: "partial",
                                        label: "partial",
                                    },
                                    {
                                        value: "full",
                                        label: "full",
                                    }
                                ]}

                                selectedValue={bidType}
                                labelText="Select Bid Type"
                                containerStyle={{
                                    width: "100%",
                                    backgroundColor: "white"
                                }}
                                setselectedValue={(value) => setBidType(value)}
                                />
                                

                                <Button
                                title='Apply Bid'
                                hasShadow={true}
                                buttonStyle={{
                                    width: "100%",
                                    marginVertical: hp(1)
                                }}
                                loading={false}
                                onPress={() => submitBid()}
                                titleStyle={{
                                    
                                }}
                                />

                                {/* <Button title="Cancel" onPress={closeModal} color="red" /> */}
                            </View>
                        </Modal>
                    )}
                </ScrollView>


            </KeyboardAvoidingView>

    )
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        paddingHorizontal: wp(4.5),
        paddingVertical: hp(2)
    },
    productList: {
        gap: 20,
        paddingVertical: hp(4)
    },
    modalContainer: {

        alignItems: 'center',
        backgroundColor: "#f0efef",
        borderRadius: 10,
        width: wp(90),
        height: hp(90),
        margin: "auto",
        padding: wp(2)
    },
    input: {
        width: '100%',
        padding: 8,
        margin: 8,
        backgroundColor: 'white',
        borderRadius: 8,
    },
    button: {
        backgroundColor: theme.colors.primary,
        padding: 5,
        borderRadius: 8,
        width: "100%"

    }
})

export default BuyerHomeScreen
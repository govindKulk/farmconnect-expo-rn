import { Image, StyleSheet, Platform, View, Text, Alert, Modal, TouchableOpacity, TextInput } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, ScrollView } from 'react-native';
import ProductCard from '@/components/farmer-home/product-card';
import { hp, wp } from '@/helpers';
import { Button, Header, ScreenWrapper } from '@/components';
import { Tabs, useFocusEffect, useRouter } from 'expo-router';
import LogoHeader from '@/components/LogoHeader';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { FAB } from '@rneui/themed';
import { theme } from '@/constants';
import { useCallback, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { Entypo } from '@expo/vector-icons';
import CustomPicker from '@/components/CustomPicker';


const data = [
  {
    title: "Tomatoes",
    description: "Organic fresh tomatoes, an yield of 1 quintal",
    price: "50",
    source: '@/assets/images/tomato.jpg'
  },
  {
    title: "Potatoes",
    description: "Organic fresh potatoes, an yield of 1 quintal",
    price: "@/assets/images/potatoes.jpg"
  },

]

export default function HomeScreen() {

  const router = useRouter();
  const { user } = useAuth();
  const [products, setProducts] = useState<Record<any, any>[]>([]);

  
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Record<any,any>>();

  const openModal = (product: any) => {
    setSelectedProduct(product);
    setIsModalVisible(true);
};

const closeModal = () => {
    setIsModalVisible(false);
    setSelectedProduct({});
};

const submitBid = async () => {
  // Send bidDetails to the backend (Supabase API call)
  const apiBody = {
      // bid_price: bidPrice,
      // message: message,
      // quantity: quantiy,
      // bid_type: bidType,
      buyer_id: user?.id,
      product_id: selectedProduct?.id,
      farmer_id: selectedProduct?.user.id


  }
  console.log(apiBody);
  const {error} = await supabase.from('bids').insert(apiBody);
  console.log(error);
  if(error){
      console.log("error inserting data ", error);
      Alert.alert("Error inserting data ");
      closeModal();
      return;
  }
  Alert.alert("Successfully inserted data");

  closeModal();
};

  useFocusEffect(  useCallback(() => {

    const userType = user?.user_type;
    console.log("userType ", userType)
    if (userType === "buyer") {
      router.replace("/(buyer)");
      return;

    }

    const fetchProducts = async () => {


      const { data, error } = await supabase
        .from('products')
        .select(`
        id,
        crop_id,
        description,
        crop: crops (name),
        cover_image,
        expected_rate,
        quantity
      `)
        .eq('farmer_id', user?.id);

      if (error) {
        console.log(error)
        return;
      }
      console.log("products >> ", data);
      setProducts(data);
    }
    fetchProducts();
  }, []))
  return (



    <View
      style={{
        flex: 1,
        backgroundColor: "white"
      }}
    >
      <ScrollView
        contentContainerStyle={{
          gap: 8,
          paddingVertical: 6,
          flex: 1,
          paddingHorizontal: wp(5)
        }}
      >

        <Header showBackButton={false} title='Your Produce' />
        {/* <FlatList
            data={data}
            renderItem={({item}) => (<ProductCard title={item.title} description={item.description} price={item.price}/>)}
            contentContainerStyle={{
              gap: 8
            }}
            /> */}
        {
          products.length > 0 ? products.map((item, key) => (<ProductCard key={key} title={item.crop.name} description={item.description} price={item.expected_rate} product={item} imgSource={item.source} openModal={() => openModal(item)}/>)) : <View
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


      </ScrollView>

      <FAB
        visible={true}
        placement="right"
        icon={{ name: "add", color: "black" }}
        style={{
          backgroundColor: "white"
        }}
        onPress={() => router.push('/add-produce')}
        buttonStyle={{
          backgroundColor: theme.colors.darkLight
        }}
      />

{isModalVisible && (
                        <Modal transparent={true} visible={isModalVisible} animationType="slide">

                            <View style={styles.modalContainer}>


                                <TouchableOpacity
                                    style={{
                                        borderColor: 'black ',
                                        borderWidth: 1,
                                        borderRadius: wp(100),
                                        padding: 2,
                                        alignSelf: 'flex-end'

                                    }}
                                    onPress={closeModal}
                                >
                                    <Entypo name="cross" size={24} color="black" />
                                </TouchableOpacity>

                        
                                    <TextInput
                       
                                        placeholder="Enter bid price"
                                        style={styles.input}
                                        keyboardType="numeric"

                                    />
           
                                <TextInput
                                    multiline={true}
          
                                    placeholder="Enter message"
                                    style={styles.input}

                                />
                                <TextInput
                                    multiline={true}
             
                                    keyboardType='numeric'
                                    placeholder="Bid Quantity"
                                    style={styles.input}

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

                                selectedValue={"partial"}
                                labelText="Select Bid Type"
                                containerStyle={{
                                    width: "100%",
                                    backgroundColor: "white"
                                }}
                                setselectedValue={(value) => {}}
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
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
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
});

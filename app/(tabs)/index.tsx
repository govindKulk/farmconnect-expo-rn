import { Image, StyleSheet, Platform, View, Text} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, ScrollView } from 'react-native';
import ProductCard from '@/components/farmer-home/product-card';
import { hp, wp } from '@/helpers';
import { Header, ScreenWrapper } from '@/components';
import { Tabs, useRouter } from 'expo-router';
import LogoHeader from '@/components/LogoHeader';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { FAB } from '@rneui/themed';
import { theme } from '@/constants';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';

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
  const {user} = useAuth();
  const [products, setProducts] = useState<Record<any,any>[]>([]);
  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
      .from('products')
      .select(`
        id,
        crop_id,
        crop: crops (name),
        expected_rate,
        quantity
      `)
      .eq('farmer_id', user?.id);

      if(error) {
        console.log(error)
        return;
      }
      console.log("products >> ",data);
      setProducts(data);
    }
    fetchProducts();
  }, [])
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

        <Header showBackButton={false} title='Your Produce'/>
        {/* <FlatList
            data={data}
            renderItem={({item}) => (<ProductCard title={item.title} description={item.description} price={item.price}/>)}
            contentContainerStyle={{
              gap: 8
            }}
            /> */}
        {
          products.length > 0 ? products.map((item, key) => (<ProductCard key={key} title={item.crop.name} description={item.description} price={item.expected_rate} imgSource={item.source} />)) : <View
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
      icon={{name: "add", color: "black"}}
      style={{
        backgroundColor: "white"
      }}
      onPress={() => router.push('/add-produce')}
      buttonStyle={{
        backgroundColor: theme.colors.darkLight
      }}
      />
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
});

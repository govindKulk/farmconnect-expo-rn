import { Image, StyleSheet, Platform, View} from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList, ScrollView } from 'react-native';
import ProductCard from '@/components/farmer-home/product-card';
import { hp, wp } from '@/helpers';
import { ScreenWrapper } from '@/components';
import { Tabs } from 'expo-router';
import LogoHeader from '@/components/LogoHeader';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { FAB } from '@rneui/themed';
import { theme } from '@/constants';

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
  return (



    <View
    style={{
      flex: 1
    }}
    >
        <ScrollView
      contentContainerStyle={{
        gap: 8,
        paddingVertical: 6,
        paddingHorizontal: wp(5)
      }}
      >

        <ThemedText
          type='title'
          style={{
            fontSize: hp(3.5)
          }}
        >
          Your Produce
        </ThemedText>
        {/* <FlatList
            data={data}
            renderItem={({item}) => (<ProductCard title={item.title} description={item.description} price={item.price}/>)}
            contentContainerStyle={{
              gap: 8
            }}
            /> */}
        {
          data.map((item, key) => (<ProductCard key={key} title={item.title} description={item.description} price={item.price} imgSource={item.source} />))
        }

  
      </ScrollView>

      <FAB
      visible={true}
      placement="right"
      icon={{name: "add", color: "black"}}
      style={{
        backgroundColor: "white"
      }}
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

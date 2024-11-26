import { View, Text, FlatList, Alert } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Header, Loading, ScreenWrapper } from '@/components'
import BidCard, { Bidder, Product } from '@/components/BidCard'
import { hp, wp } from '@/helpers'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import { Link, useFocusEffect } from 'expo-router'
import BuyerBidCard from '@/components/buyer-bidcard'
import { Image } from 'react-native'
import { theme } from '@/constants'
const data: {
  product: Product,
  bidder: Bidder
}[] = [
    {
      product: {
        title: "Tomatoes",
        description: "Organic fresh tomatoes, an yield of 1 quintal",
        price: "50"
      },
      bidder: {
        name: "Kulkarni Vedant",
        bid: "40",
        message: "I want to buy your yield."

      }
    },
    {
      product: {
        title: "Potatoes",
        description: "Organic fresh potatoes, an yield of 1 quintal",
        price: "30"
      },
      bidder: {
        name: "Shinde Rushikesh",
        bid: "15",
        message: "I want to buy your yield."

      }
    }

  ]

const Bids = () => {

  const [bids, setBids] = useState<Record<any, any>[]>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const getBids = async function () {
    setLoading(true);
    const { data, error } = await supabase.from('bids').select('*, farmer: users!bids_farmer_id_fkey (id, name, image), product: products (crop : crops(name))').eq("buyer_id", user?.id);
    console.log("data ", data);
    if (error) {
      console.log(error);
      setTimeout(() => setLoading(false), 2000)
      Alert.alert("Error while fetching bids.");
      return;
    }
    setBids(data);
    setLoading(false);


  }

  useFocusEffect(useCallback(() => {getBids()}, []))

  
  if (loading) {
    return (
      <ScreenWrapper>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Loading />

        </View>
      </ScreenWrapper>
    )
  }
  return (

    <View
      style={{
        flex: 1,
        paddingHorizontal: wp(5)
      }}
    >
      <Header title="Your Bids" showBackButton={false} />

      {bids.length > 0 ? <FlatList
        data={bids}
        renderItem={({ item }) => (<BuyerBidCard bid={item} onBidCancel={() => getBids()} />)}
        contentContainerStyle={{
          gap: 8
        }}

      /> : <View
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
        >You have not applied bid on a product so far.
          <Link href="/(buyer)"
            style={{
              color: theme.colors.primary,
              fontWeight: "bold",
            }}
          >
            Apply Now
          </Link>
        </Text>

      </View>}
    </View>


  )
}

export default Bids
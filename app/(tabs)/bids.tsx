import { View, Text, FlatList } from 'react-native'
import React from 'react'
import { Header, ScreenWrapper } from '@/components'
import BidCard, { Bidder, Product } from '@/components/BidCard'
import { wp } from '@/helpers'
const data : {
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
  return (

    <View
    style={{
      flex: 1,
      paddingHorizontal: wp(5)
    }}
    >
    <Header title="Received Bids" showBackButton={false} />

            <FlatList
            data={data}
            renderItem={({item}) => (<BidCard product={item.product} bidder={item.bidder}/>)}
            contentContainerStyle={{
              gap: 8
            }}

            />
      </View>


  )
}

export default Bids
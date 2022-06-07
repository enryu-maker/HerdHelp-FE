import {
  Alert,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';

import React, {Component} from 'react';
import { COLORS, FONTS } from '../../Components/Constants';
import { images } from '../../Components/Constants';
import Header from '../../Components/Header';
import SubscriptionCard from './SubscriptionCard';
import iap from 'react-native-iap';

const itemSkus = Platform.select({
  ios: [
    'T1699',
    'T21199', // dooboolab
    'T32599',
],
android: [
   'com.example.coins100'
]
});
export default function Subscription({navigation}) {
  const[products,setProducts] = React.useState([]);
  
  React.useEffect(()=>{
    RNIap.initConnection().catch(()=>{
      console.log("Something went wrong")
    }).then(()=>{
      console.log("connection establised ")
      RNIap.getProducts(itemSkus).then((res)=>{
        setProducts(res);
      }).catch(()=>{
        console.log('Something went wrong')
      })
    })
    const updateSubscription=RNIap.purchaseUpdatedListener((purchase)=>{
      const receipt = purchase.transactionReceipt;
      if(receipt){
        RNIap.finishTransaction(purchase);
      }
    })
    return()=>{
      updateSubscription.remove();
    }
  },[])

  return (

    <View style={{
      justifyContent:"center",
      alignSelf:"center"
    }}>
      <Header 
      leftComponent={
        <View
          style={{
            justifyContent: 'center',
            position: 'absolute',
            marginTop: 20,
            zIndex: 1,
          }}>
          <TouchableOpacity
            style={{
              marginLeft: 25,
              backgroundColor:COLORS.Primary,
              height:40,
              width:40,
              justifyContent:"center",
              borderRadius:40/2,
              }}
            onPress={() => {
              navigation.openDrawer()
            }}>
            <Image
              source={images.menu}
              style={{width: 25, height: 25, tintColor: COLORS.white,alignSelf:"center"}}
            />
          </TouchableOpacity>
        </View>
      }
      title={"Subscription"}
      />
      <FlatList 
      data={products}
      keyExtractor={item=>item.productId}
      renderItem={({item,index})=>(
        <SubscriptionCard
        key={index}
        label={item.title}
        desc={item.description}
        price={item.price}
        onPress={()=>{
          iap.requestSubscription(item.productId)
        }}
        />
      )}
      />
    </View>

  )
}
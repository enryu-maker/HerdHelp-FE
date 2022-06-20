import {
  Platform,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  Text
} from "react-native";

import React, { Component } from "react";
import { COLORS, FONTS } from "../../Components/Constants";
import { images } from "../../Components/Constants";
import Header from "../../Components/Header";
import SubscriptionCard from "./SubscriptionCard";
import RNIap, { initConnection } from "react-native-iap";

import ActivityIndicatorExample from "../../Components/Loading";
import { showMessage } from "react-native-flash-message";

const itemSkus = Platform.select({
  ios: [
    "T1699",
    "T21199", // dooboolab
    "T32599",
  ],
  android: [
    "tier1699",
    "tier1199", // dooboolab
    "tier2599",
  ],
});
export default function Subscription({ navigation, route }) {
  const [products, setProducts] = React.useState([]);
  const [Loading, setLoading] = React.useState(false);
  const [cond, setCond] = React.useState(false);
  const [msg, setMsg] = React.useState('hello there');


  React.useEffect(() => {
    let {msg} = route.params;
    // setMsg(msg)
    let {cond} = route.params;
    setCond(cond)

    RNIap.initConnection()
      .catch(() => {
        setLoading(false);
        showMessage({
          message: 'Cannot Load the Subscription',
          type: 'danger',
          backgroundColor: COLORS.red,
          color: COLORS.white,
          titleStyle: {
            alignSelf: 'center',
            ...FONTS.h3,
          },
          animationDuration: 250,
        });
      })
      .then(() => {
        showMessage({
          message: 'Subscription List Loading...',
          type: 'success',
          backgroundColor: COLORS.Primary,
          color: COLORS.white,
          titleStyle: {
            alignSelf: 'center',
            ...FONTS.h3,
          },
          animationDuration: 250,
        });
        RNIap.getProducts(itemSkus)
          .then((res) => {
            setProducts(res);
          })
          .catch((e) => {
            console.log(e);
            console.log("Something went wrong");
          });
      });
    const updateSubscription = RNIap.purchaseUpdatedListener((purchase)=>{
      const receipt = purchase.transactionReceipt;
      if (receipt) {
        RNIap.finishTransaction(purchase);
      }
    });
    return () => {
      updateSubscription.remove();
    };
  }, []);
  return (
    <View
      style={{
        justifyContent: 'center',
        alignSelf: "center",
      }}
    >
      <Header
      leftComponent={
          <View
            style={{
              justifyContent: "center",
              position: "absolute",
              marginTop: 20,
              zIndex: 1,
            }}
          >
            <TouchableOpacity
              style={{
                marginLeft: 25,
                backgroundColor: COLORS.Primary,
                height: 40,
                width: 40,
                justifyContent: 'center',
                borderRadius: 40 / 2,
              }}
              onPress={() => {
                navigation.openDrawer();
              }}
            >
              <Image
                source={images.menu}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: COLORS.white,
                  alignSelf: "center",
                }}
              />
            </TouchableOpacity>
          </View>
        }
        title={'Subscription'}
      />
      {
        cond?<Text style={{
          color:COLORS.red,
          ...FONTS.h3,
          alignSelf:"center",
          paddingBottom:10
        }}>{msg}</Text>:null
      }
      
      {products.length<=0?(
        <ActivityIndicatorExample />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(item) => item.productId}
          renderItem={({ item, index }) => (
            <SubscriptionCard
              key={index}
              label={item.title}
              desc={item.description}
              price={item.price}
              onPress={() => {
                RNIap.requestSubscription(item.productId);
              }}
            />
          )}
        />
      )}
    </View>
  );
}

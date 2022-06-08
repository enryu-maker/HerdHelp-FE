import {
  Platform,
  View,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";

import React, { Component } from "react";
import { COLORS, FONTS } from "../../Components/Constants";
import { images } from "../../Components/Constants";
import Header from "../../Components/Header";
import SubscriptionCard from "./SubscriptionCard";
import iap from "react-native-iap";

import ActivityIndicatorExample from "../../Components/Loading";
import { showMessage } from "react-native-flash-message";

const itemSkus = Platform.select({
  ios: [
    "T1699",
    "T21199", // dooboolab
    "T32599",
  ],
  android: ["com.example.coins100"],
});
export default function Subscription({ navigation }) {
  const  [products, setProducts] = React.useState([]);
  const  [Loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(true);
    iap
      .initConnection()
      .catch(() => {
        setLoading(false);;
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
          message: 'Subscription List Loaded',
          type: 'success',
          backgroundColor: COLORS.Primary,
          color: COLORS.white,
          titleStyle: {
            alignSelf: 'center',
            ...FONTS.h3,
          },
          animationDuration: 250,
        });
        setLoading(false);;
        iap
          .getProducts(itemSkus)
          .then((res) => {
            setProducts(res);
          })
          .catch(() => {
            console.log("Something went wrong");;
            setLoading(false);;
          });;
      });;
    const updateSubscription = iap.purchaseUpdatedListener((purchase)=>{
      const receipt = purchase.transactionReceipt;
      if  (receipt) {
        iap.finishTransaction(purchase);
      }
    });
    return  () => {
      updateSubscription.remove();
    };
  }, []);;
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
                navigation.openDrawer();;
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
      {Loading ? (
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
                iap.requestSubscription(item.productId);;
              }}
            />
          )}
        />
      )}
    </View>
  );
}

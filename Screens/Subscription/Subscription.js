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
    "T699",
  ],
  android: [
    "t699",
  ],
});
export default function Subscription({ navigation, route }) {
  const [products, setProducts] = React.useState([]);
  const [Loading, setLoading] = React.useState(false);
  const [cond, setCond] = React.useState(false);
  const [msg, setMsg] = React.useState('hello there');
  const [productID, setProductID] = React.useState('');

  async function sendReceipt({
    tier,
    receipt,
    purchase
  }) {
    setLoading(true)
      try{
        await axiosIns.post(`subscriptions/activate/`,{
          'tier': tier,
          'reciept':receipt
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((Response)=>{
          if (Response.status==200){
            dispatch(getHerds())
            setLoading(false)
            showMessage({
              message: "Status Updated",
              type: "default",
              backgroundColor: COLORS.Primary,
              color:COLORS.white,
              titleStyle:{
                alignSelf:"center",
                ...FONTS.h3
              },
              animationDuration:250,
              icon:"success",
              style:{
                justifyContent:"center"
              }
            });
            clear()
            RNIap.finishTransaction(purchase);
          }
          else{
          setLoading(false)
          showMessage({
            message: `Animal with tag ${tag} not found here`,
            type: "default",
            backgroundColor: COLORS.red,
            color:COLORS.white,
            titleStyle:{
              alignSelf:"center",
              ...FONTS.h3
            },
            animationDuration:250,
            icon:"danger",
            style:{
              justifyContent:"center"
            }
          });
          }
        })
      }catch(err){
        console.log(err)
        setLoading(false)
        showMessage({
          // message: `${err.response.data.msg}`,
          type: "default",
          backgroundColor: COLORS.red,
          color:COLORS.white,
          titleStyle:{
            alignSelf:"center",
            ...FONTS.h3
          },
          animationDuration:250,
          icon:"danger",
          style:{
            justifyContent:"center"
          }
        });
      }
    }
  
  React.useEffect(() => {
    let { msg } = route.params;
    // setMsg(msg)
    let { cond } = route.params;
    setCond(cond)
    
    RNIap.initConnection()
      .catch(() => {
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
    const updateSubscription = RNIap.purchaseUpdatedListener( (purchase) => {
      console.log(purchase)
      const receipt = purchase.transactionReceipt;
      const receiptBodyios = {
        'receipt-data': purchase.transactionReceipt,
        'password': '70abed6eca1f43d7ba739bd37015da78'
      };
      sendReceipt(productID,receipt)
       const results =  Platform.OS==="ios"? 
         RNIap.validateReceiptIos(receiptBodyios,true):
         RNIap.validateReceiptAndroid(
          purchase.packageNameAndroid,
          purchase.productId,
          purchase.purchaseToken,
          "verify@pc-api-4637307351252359025-733.iam.gserviceaccount.com",
          true,
          )
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
        cond ? <Text style={{
          color: COLORS.red,
          ...FONTS.h3,
          alignSelf: "center",
          paddingBottom: 10
        }}>{msg}</Text> : null
      }
      {products.length <= 0 ? (
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
              price={item.localizedPrice}
              onPress={() => {
                setLoading(true)
                setProductID(item.title)
                RNIap.requestSubscription(item.productId);
                setLoading(false)
              }}
            />
          )}
        />
      )}
      {
        Loading ? <ActivityIndicatorExample /> : null
      }
    </View>
  );
}

import { View, Text, Platform, Alert } from 'react-native'
import React from 'react'
import Header from '../../Components/Header'
import { COLORS, FONTS, images, SIZES } from '../../Components/Constants'
import TextButton from '../../Components/TextButton'
import * as RNIap from 'react-native-iap';
import InfoItem from '../../Components/InfoItem'
import CheckBox from '@react-native-community/checkbox';
export default function Subscription() {
  const itemSkus = Platform.select({
    ios: [
      'T699'
    ],
    android: [
      't699'
    ]
  });
  const [product, setProduct] = React.useState({})
  const [checked, setChecked] = React.useState(false);
  const getProduct = async (itemSkus) => {
    try {
      const products = await RNIap.getSubscriptions(itemSkus);
      setProduct(products[0])
    } catch (err) {
      console.warn(err);
    }
  }
  const requestSubscription = async (product) => {
    try {
      await RNIap.requestSubscription(product.productId);
    } catch (err) {
      console.warn(err.code, err.message);
    }
  }

  React.useEffect(() => {
    RNIap.initConnection()
    getProduct(itemSkus)
    const updateSubscription = RNIap.purchaseUpdatedListener( (purchase) => {
      console.log(purchase)
      const receiptBodyios = {
        'receipt-data': purchase.transactionReceipt,
        'password': '82b1481ce1844e5b87fbb8da408e7c4e'
      };
       const results =  Platform.OS==="ios"? 
         RNIap.validateReceiptIos(receiptBodyios):
         RNIap.validateReceiptAndroid(
          purchase.packageNameAndroid,
          purchase.productId,
          purchase.purchaseToken,
          "verify@pc-api-4637307351252359025-733.iam.gserviceaccount.com",
          true,
          )
      console.log(results.status)
    });
    return () => {
      updateSubscription.remove();
    };
  }, [])
  function renderHeader() {
    return (
      <Header title={"Subscription"} />
    )
  }
  
  function renderBody(product) {
    return (
      <View style={{
        width: "88%",
        height: 400,
        backgroundColor: COLORS.lightGray2,
        borderRadius: SIZES.padding,
        alignSelf: "center",
        paddingHorizontal: SIZES.radius,
      }}>
        <Text style={{
          ...FONTS.h2,
          alignSelf: "center",
          marginTop: 20
        }}>
          {"HerdHelp Premium"}
        </Text>
        <Text style={{
          ...FONTS.body3,
          alignSelf: "center",
          marginTop: 10
        }}>
          {` When you choose to purchase Herd Help Premium, payment will be charged to your iTunes/Playstore account, and your account will be charged for renewal 24 hours prior to the end of the current period. Auto-renewal may be turned off at any time by going to your settings in the iTunes Store after purchase. Current price for the Herd Help Premium is `}
          <Text style={{
            ...FONTS.h3,
            alignSelf: "center",
          }}>{product.localizedPrice}</Text> per month ​and may vary by country.
        </Text>
        <InfoItem label={"Price"} value={`${product.localizedPrice}/Month`} />
      </View>
    )
  }
  return (
    <View style={{
      flex: 1,
      backgroundColor: COLORS.white,
    }}>
      {renderHeader()}
      <View style={{
        flex: 1,
        justifyContent: "space-evenly",
        alignSelf: "center"
      }}>
        {renderBody(product)}
        <View style={{
          width:"88%",
          flexDirection:"row",
          alignItems:"center",
          alignSelf:"center"
        }}>
        <CheckBox
          tintColor={COLORS.lightGray1}
          onCheckColor={ COLORS.Primary}
          onTintColor={COLORS.Primary}
          boxType={"square"}
          disabled={false}
          value={checked}
          animationDuration={0.5}
          onValueChange={(value) =>
            setChecked(value)
          }
        />
        <Text style={{
            ...FONTS.h4,
            marginLeft:10
          }}>I accept Terms & Condition</Text>
        </View>
        <TextButton
          border={false}
          buttonContainerStyle={{
            width: 250,
            borderWidth: 3,
            borderColor:checked?COLORS.Primary:COLORS.lightGray1,
            backgroundColor:COLORS.white
          }}
          onPress={()=>{
            requestSubscription(product)
          }}
          label={"Start Trail"}
          labelStyle={{
            color: checked?COLORS.Primary:COLORS.lightGray1
          }}
          icon={images.subs}
          iconStyle={{
            tintColor: checked?COLORS.Primary:COLORS.lightGray1
          }}
          disabled={!checked}
        />
      </View>
    </View>
  )
}
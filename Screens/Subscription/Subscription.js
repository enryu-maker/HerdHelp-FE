import { View, Text, Platform, Alert, TouchableOpacity, Linking, ScrollView } from 'react-native'
import React from 'react'
import Header from '../../Components/Header'
import { COLORS, FONTS, images, SIZES } from '../../Components/Constants'
import TextButton from '../../Components/TextButton'
import IAP from 'react-native-iap';
import InfoItem from '../../Components/InfoItem'
import CheckBox from '@react-native-community/checkbox';
import { useDispatch } from 'react-redux'
import { updateSubs } from '../../Store/actions'
import Loader from '../../Components/Loader'
export default function Subscription() {
  const [product, setProduct] = React.useState({})
  const [checked, setChecked] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const getSubscriptionplan=()=>{
    const planId = Platform.select({
      ios:['1M_699_1M0'],
      android:['hh_t699']
    })
    IAP.getSubscriptions(planId)
    .then(res=>{
      setProduct(res[0])
    })
    .catch(e=>{
      console.log(e)
    })
  }

  const buySelectedPlan= async (plan) =>{
    setLoading(true)
    try{
       await IAP.requestSubscription({sku:plan.productId});
    }
    catch(err){
      console.log(err)
      console.log("error")
    }
  }
  
  const dispatch = useDispatch()
  React.useEffect(async() => {
    await IAP.initConnection().then((result)=>{
      getSubscriptionplan()
    }).catch((err)=>{
      console.log(err)
    })
    const updatePurchaseListner = IAP.purchaseUpdatedListener(purchase=>{
      try{
        if(purchase){
          const receipt = purchase?.transactionReceipt
          ? purchase?.transactionReceipt
          : purchase?.originalJson

          if(receipt){
            const ackResult = IAP.finishTransaction(purchase)
            dispatch(updateSubs(receipt?true:false))
          }
        }
        setLoading(false)
      }
      catch(err){
        console(err)
        setLoading(false)

      }
    })
    const purchaseErrorListner = IAP.purchaseErrorListener(errror=>{
      console.log(errror)
      setLoading(false)

    })

    return ()=>{
      updatePurchaseListner.remove();
      purchaseErrorListner.remove();
    }
  }, [])
  function renderHeader() {
    return (
      <Header title={"Subscription"} />
    )
  }
  
  function renderBody(product) {
    return (
      <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: SIZES.padding,
                    width: "88%",
        // height: 400,
        backgroundColor: COLORS.lightGray2,
        borderRadius: SIZES.padding,
        alignSelf: "center",
        paddingHorizontal: SIZES.radius,
                }}>
      {/* <View style={{
        
      }}> */}
        <Text style={{
          ...FONTS.h2,
          alignSelf: "center",
          marginTop: 5
        }}>
          {"HerdHelp Free Trial"}
        </Text>
        <Text style={{
          ...FONTS.body3,
          alignSelf: "center",
          // marginTop: 10
        }}>
          {`When you subscribe to Herd Help Premium, Payments will be charged to your iTunes account. Auto renewal may be turned off at any time. Current price for Herd Help is ${product?.localizedPrice} per month. Your first 30 days are free. Herd Help is a tool to track your animals weights, health, treatments, lineage, profits and losses. Removing the app doesn’t automatically cancel the subscription You need to remove it from App Store.`}
          <Text style={{
            ...FONTS.h3,
            alignSelf: "center",
          }}>{'\n'}One month free trial after that {product?.localizedPrice} per month ​and may vary by country.</Text> 
        </Text>
        <InfoItem buttonStyle={{
        }} label={"First Month"} value={`${product?.introductoryPrice}`} />
        <InfoItem buttonStyle={{
          marginTop:-20
        }} label={"After That"} value={`${product?.localizedPrice}/Month`} />
      {/* </View> */}
      </ScrollView>
    )
  }
  return (
    <View style={{
      flex: 1,
      backgroundColor: COLORS.white,
    }}>
      <Loader loading={loading} />
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
          alignSelf:"center",
          padding:SIZES.padding
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
        <TouchableOpacity 
        onPress={()=>{
          Linking.openURL("https://herdhelp.com/terms-and-condition")
        }}>
        <Text style={{
            ...FONTS.h4,
            marginLeft:10,
            textDecorationLine:"underline",
            textDecorationColor:"blue"
          }}>I accept Terms & Condition</Text>
        </TouchableOpacity>

        </View>
        

        <TextButton
          border={false}
          buttonContainerStyle={{
            width: 250,
            borderWidth: 3,
            borderColor:checked?COLORS.Primary:COLORS.lightGray1,
            backgroundColor:COLORS.white,
            marginBottom:15
          }}
          onPress={()=>{buySelectedPlan(product)}} 
          loading={loading}
          label={"Start Trial"}
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
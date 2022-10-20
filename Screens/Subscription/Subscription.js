import { View, Text, Platform, Alert } from 'react-native'
import React from 'react'
import Header from '../../Components/Header'
import { COLORS, FONTS, images, SIZES } from '../../Components/Constants'
import TextButton from '../../Components/TextButton'
import IAP from 'react-native-iap';
import InfoItem from '../../Components/InfoItem'
import CheckBox from '@react-native-community/checkbox';
import { useDispatch } from 'react-redux'
import { updateSubs } from '../../Store/actions'
export default function Subscription() {
  const itemSkus = Platform.select({
    ios: [
      'T699'
    ],
    android: [
      'hh_t699'
    ]
  });
  const [product, setProduct] = React.useState({})
  const [checked, setChecked] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const getSubscriptionplan=()=>{
    const planId = Platform.select({
      ios:['T699'],
      android:['hh_t699']
    })
    IAP.getSubscriptions(planId)
    .then(res=>{
      console.log(res)
      setProduct(res[0])
    })
    .catch(e=>{
      console.log(e)
    })
  }

  const buySelectedPlan= async (plan) =>{
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
      console.log(result)
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
            console.log(ackResult)
          }
        }
        
      }
      catch(err){
        console(err)
      }
    })
    const purchaseErrorListner = IAP.purchaseErrorListener(errror=>{
      console.log(errror)
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
          {"HerdHelp Free Trial"}
        </Text>
        <Text style={{
          ...FONTS.body3,
          alignSelf: "center",
          marginTop: 10
        }}>
          {`When you choose to purchase Herd Help Premium, payment will be charged to your iTunes/Playstore account, and your account will be charged for renewal 24 hours prior to the end of the current period. Auto-renewal may be turned off at any time by going to your settings in the iTunes Store after purchase. Current price for the Herd Help Premium is `}
          <Text style={{
            ...FONTS.h3,
            alignSelf: "center",
          }}>{product?.localizedPrice}</Text> per month ​and may vary by country.
        </Text>
        <Text style={{
            ...FONTS.h3,
            alignSelf: "center",
            fontWeight:"bold"
          }}> One Month Free Trial After that  </Text>
        <InfoItem buttonStyle={{
          marginTop:-10
        }} label={"Price"} value={`${product?.localizedPrice}/Month`} />
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
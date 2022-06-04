import {View, Text, TouchableOpacity, Image, Platform,Alert} from 'react-native';
import {CardField, CardForm,confirmPayment,PaymentIntents,ThreeDSecure,useStripe} from '@stripe/stripe-react-native';
import React from 'react';
import {images, FONTS, SIZES, COLORS} from '../../Components/Constants';
import Header from '../../Components/Header';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import TextButton from '../../Components/TextButton';
import ApiService from './api';
import axiosIns from '../../helpers/helpers';
import Alerts from '../Alerts/Alerts';
import Loading from './Loading';
export default function Payment({navigation,route}) {
  const [card,setCard] = React.useState([])
  const [cond,setCond] = React.useState(false)
  const [loading,setLoading] = React.useState(false)
  const [label,setLabel] = React.useState('')
  const [Amount,setAmount] =React.useState(0)
  const [line1, setLine1] = React.useState('');
  const [city, setCity] = React.useState('');
  const [postalcode, setPostalcode] = React.useState('');
  const [state, setState] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [countrylist, setCountrylist] = React.useState([]);
  const [statelist, setStatelist] = React.useState([]);
    React.useEffect(()=>{
      let {Amount} = route.params
      setAmount(Amount)
      let {label} = route.params
      setLabel(label)
      let {line1} = route.params
      setLine1(line1)
      let {country} = route.params
      setCountry(country)
      let {state} = route.params
      setState(state)
      let {city} = route.params
      setCity(city)
      let {postalcode} = route.params
      setPostalcode(postalcode)
    },[])
  const stripe = useStripe()
  const handleSubmit = async () => {
    setLoading(true)
    const {paymentMethod, error} = await stripe.createPaymentMethod(
      {
       type:"Card",
       card:card  
  })
  const handlePay= async (client_secret) =>
   {
    let {error,paymentIntent}  = await confirmPayment(client_secret,{
    type:"Card",
    billingDetails:{name:global.User[0]?.fullname}
  })
  if(paymentIntent){
    await axiosIns.post('payments/confirmpayment/',{
          payment_intent_id:paymentIntent.id,
          tier:label
        }).then(()=>{
          Alert.alert("Payment Sucessfull",
          "Go to the Home Page",
          [
            { text: "ok", onPress: () => navigation.replace("DrawNav") ,style: "ok"}
          ]
        );
        setLoading(false)
        })

  }
  else if (error){
    alert("Payment Declined")
    setLoading(false)
  }
else{
  alert("somthing went wrong")
  setLoading(false)
}
}
   ApiService.saveStripeInfo(
    {
   payment_method_id: paymentMethod.id,
   amount:Amount,
   address:{
     line1:line1,
     city:city,
     postalcode:postalcode,
     state:state,
     country:country
   }
  }
  )
  .then(response => {
    handlePay(response.data.payment_intent.client_secret)
  }).catch(error => {
    alert("Server Busy")
    setLoading(false)
    console.log(error)

  })
  }
  function renderheader() {
    return (
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
                backgroundColor: COLORS.Primary,
                height: 40,
                width: 40,
                justifyContent: 'center',
                borderRadius:40/2,
              }}
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                source={images.back}
                style={{
                  width: 30,
                  height: 30,
                  tintColor: COLORS.white,
                  alignSelf: 'center',
                }}
              />
            </TouchableOpacity>
          </View>
        }
        title={'Payment'}
      />
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
        <Loading show={loading}/>
      {renderheader()}
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          marginVertical: 0,
          width: '88%',
          paddingVertical: SIZES.padding,
          paddingHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
          alignSelf: 'center'
        }}>
          <Image source={images.card} style={{
            height:100,
            width:100,
            marginBottom:10,
            alignSelf:"center"
          }}/>
      <CardForm
        cardStyle={{
          backgroundColor:COLORS.white,
        }}
        style={{
          height:Platform.OS=="ios"?180:280
        }}
        onFormComplete={cardDetails=>{
          setCond(true)
          setCard(cardDetails)
        }}
        onCardChange={cardDetails => {
          // console.log('cardDetails', cardDetails);
        }}
        onFocus={focusedField => {
          // console.log('focusField', focusedField);
        }}
      />
      
      </KeyboardAwareScrollView>
      <TextButton
        onPress={() => {
          handleSubmit()
        }}
        icon={images.sack}
        // loading={loading}
        buttonContainerStyle={{
          marginTop: SIZES.padding,
            marginHorizontal: SIZES.padding,
            marginBottom: SIZES.padding,
            borderTopLeftRadius: SIZES.radius,
            borderTopRightRadius: SIZES.radius,
          backgroundColor:cond? COLORS.Primary:COLORS.transparentPrimary2,
        }}
        label={'Confirm Payment'}
        loading={loading}
        disabled={!cond}
      />
    </View>
  );
}

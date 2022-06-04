import { View, Text,TouchableOpacity,Image,ScrollView,ActivityIndicator } from 'react-native'
import React from 'react'
import Header from './Header'
import {
    SIZES,
    COLORS,
    images,
    FONTS
} from "../Components/Constants"
import Med from './Med';
import axiosIns from '../helpers/helpers';
import { useSelector } from 'react-redux';
export default function MedCard({ navigation,route }) {
  const [err, setErr] = React.useState("");
  const [animal,setAnimal] = React.useState([])
  const med = useSelector(state=>state.Reducers.med)

  React.useEffect(() => {
    let {animal} = route.params
    setAnimal(animal)
  }, []);
    function renderHeader() {
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
                backgroundColor:COLORS.Primary,
                height:40,
                width:40,
                justifyContent:"center",
                borderRadius:40/2,

                }}
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                source={images.back}
                style={{width: 25, height: 25, tintColor: COLORS.white,alignSelf:"center"}}
              />
            </TouchableOpacity>
          </View>
            }
            title={'Medication'}
            titleStyle={{
              marginLeft:110,
              alignSelf:"center"
            }}
            rightComponent={
              <View
            style={{
              justifyContent: 'center',
              // position: 'absolute',
              marginRight: 15,
              // zIndex: 1,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor:COLORS.Primary,
                height:40,
                width:85,
                flexDirection:"row",
                justifyContent:"space-evenly",
                borderRadius:15,
                }}
          onPress={()=>{
            navigation.navigate('medication',{
              tag:animal.support_tag.toString(),
              species:animal.species.toString(),
              cond:false
            })
          }}
          >
            <Image source={images.add} style={{
              height:25,
              width:25,
              tintColor:COLORS.white,
              alignSelf:"center"
            }}/>
          <Text style={{
                ...FONTS.h3,
                color:COLORS.white,
                alignSelf:"center"
              }}>
                 Med
              </Text>
            </TouchableOpacity>
          </View>
            }
            />
        )
      }
  return (
    <View style={{flex: 1,backgroundColor:COLORS.white}}>
     {renderHeader()}
     <Text style={{...FONTS.h3,color:COLORS.red,alignSelf:"center"}}>{err}</Text>
     <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1}}>
     {   
    //  loading?(<ActivityIndicator size="large" color={COLORS.Primary}/>):
     med.map(a=>{
         return(
            <Med 
            key={a.id}
            medication_date={a.medication_date}
            medication_name={a.medication_name}
            disease={a.disease}
            dosage={a.dosage}
            withdrawal={a.withdrawal}
            withdrawal_date={a.withdrawal_date}
            />
         )
         })
     }
     </ScrollView>
    </View>
  )
}
import { View, Text ,TouchableOpacity,Image,ScrollView} from 'react-native'
import React from 'react'
import Header from './Header';
import Card from './Card';

import {
  COLORS,
  FONTS,
  images,
  SIZES,
} from './Constants';
export default function Babies({navigation,route}) {
  const [label,setLabel]=React.useState("")
  const [loading,setLoading]=React.useState(false)
  const [cond,setCond]=React.useState(false)
  const [data,setData]=React.useState([])

  React.useEffect(()=>{
    
    let {label} = route.params
    let {data} =route.params
    let {cond} =route.params
    setCond(cond)
    if (!loading){
      setLabel(label)
      setData(data)
    }
  },[])
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
        title={`${label}`}
        titleStyle={{
          marginLeft:70
        }}
        rightComponent={
          <View
            style={{
              marginTop:20,
            }}>
            <View
              style={{
              marginRight: 25,
              backgroundColor:COLORS.Primary,
              height:40,
              width:40,
              borderRadius:40/2,
              justifyContent:"center",
              justifyContent:"center"
              }}>
              <Text style={{
                color:COLORS.white,
                ...FONTS.h2,
                alignSelf:"center"
              }}>{data.length}</Text>
            </View>
          </View>
        }
      />
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      {renderHeader()} 
      
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{flexGrow: 1}}>
          {data.map((listItem, index) => (
            <Card
              key={index}
              cond={cond}
              Name={listItem.name}
              Tagnumber={listItem.support_tag}
              Gender={listItem.gender}
              Species={listItem.category}
              Weight={listItem.weight}
              image={listItem.image}
            />
          ))}
        </ScrollView>
    </View>
  )
}
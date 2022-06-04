import { View, Text ,TouchableOpacity,Image,TextInput,FlatList} from 'react-native'
import React from 'react'
import Header from '../../Components/Header';
import Card from '../../Components/Card';

import {
  COLORS,
  FONTS,
  images,
  SIZES,
} from '../../Components/Constants';
export default function Add({navigation,route}) {
  const [label,setLabel]=React.useState("")
  const [loading,setLoading]=React.useState(false)
  const [cond,setCond]=React.useState(false)
  const [show,setShow]=React.useState(false)
  const [data,setData]=React.useState([])
  const [searched,setSearched] = React.useState("")
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
  function filterList(list) {
    return list.filter(
      (listItem) =>
        listItem.tag_number
          .toString()
          .toLowerCase()
          .includes(searched.toString().toLowerCase()) ||
        listItem.name.toString().toLowerCase().includes(searched.toString().toLowerCase()) ||
        listItem.weight.toString().includes(searched.toString().toLowerCase()) ||
        listItem.gender.toLowerCase().includes(searched.toLowerCase())
    );
  }
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
                style={{width: 25, 
                  height: 25, 
                  tintColor: COLORS.white,
                  alignSelf:"center",
                  
                }}
              />
            </TouchableOpacity>
          </View>
        }
        title={`${label}`}
        titleStyle={{
          marginLeft: 65,
        }}
        rightComponent={
          <View
            style={{
              marginTop:20,
              flexDirection:"row"
            }}>
              
            <View
              style={{
              marginRight: 5,
              backgroundColor:COLORS.Primary,
              height:40,
              width:40,
              justifyContent:"center",
              borderRadius:40/2,
              justifyContent:"center"
              }}>
              <Text style={{
                color:COLORS.white,
                ...FONTS.h2,
                alignSelf:"center"
              }}>{data.length}</Text>
            </View>
            <TouchableOpacity
              style={{
              marginRight: 25,
              backgroundColor:COLORS.Primary,
              height:40,
              width:40,
              justifyContent:"center",
              borderRadius:40/2,
              justifyContent:"center"
              }}
              onPress={()=>{
                setShow(!show)
              }}
              >
                <Image source={images.search} style={{
                  height:28,
                  width:28,
                  alignSelf:"center",
                  tintColor:COLORS.white
                }}/>
              </TouchableOpacity>
          </View>
        }
      />
    );
  }
  function renderSearch() {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 50,
          alignItems: 'center',
          marginHorizontal: SIZES.padding,
          marginVertical: 5,
          paddingHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
          bottom: Platform.OS === 'ios' ? null : 5,
          marginTop: Platform.OS === 'ios' ? 20 : null,
          marginBottom:Platform.OS === 'ios' ? 20 : null,
        }}>
        {/* Icon */}
        <Image
          source={images.search}
          style={{
            height: 20,
            width: 20,
            tintColor: COLORS.gray,
          }}
        />

        {/* Text Input */}
        <TextInput
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            ...FONTS.body3,
            height: 100,
            marginTop: Platform.OS === 'ios' ? null : 5,
          }}
          placeholder="search..."
          placeholderTextColor={COLORS.gray}
          onChangeText={text => {setSearched(text)}}
        />
      </View>
    );
  }
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      {renderHeader()} 
      {
        show?renderSearch():null
      }

      <FlatList
      data={filterList(data)}
      keyExtractor={item => `${item.tag_number}`}
      showsVerticalScrollIndicator={false}
      renderItem={({ item, index }) => (
            <Card
              key={index}
              Flagged={item?.flagged}
              cond={cond}
              Name={item.name}
              Tagnumber={item.support_tag}
              Gender={item.gender}
              Species={item.category}
              Weight={item.weight}
              image={item.animal_image==null ? item.image:item.animal_image}
              weight_kg={item.weight_kg}
              onPress={() => {
                navigation.navigate('Info', {
                  value: item,
                  cond:cond
                });
              }}
            />
          )}/>
    </View>
  )
}
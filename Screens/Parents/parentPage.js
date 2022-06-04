import {View, TouchableOpacity, Image, Text,FlatList} from 'react-native';
import React from 'react';
import {COLORS, SIZES, FONTS, images,formatter} from '../../Components/Constants';
import Header from '../../Components/Header';
import Card from '../../Components/Card';
import { ActivityIndicator } from 'react-native-paper';
export default function ParentPage({navigation,route}) {
  const [selected, setSelected] = React.useState('Herd');
  const [Herd,setHerd] = React.useState([])
  const [Sold,setSold] = React.useState([])
  const [active,setActive] = React.useState([])
  const [Amount,setAmount] = React.useState(0)
  const [cond,setCond] = React.useState(false)



  React.useEffect(()=>{
    let { data } = route.params;
    let { cond } = route.params;
    setCond(cond);
    Seperator(data);
  },[])
  
  function Seperator(data){
    data.map(a=>{
      a.status==="Alive"?(Herd.push(a)):(Sold.push(a));
    })
    setActive(Herd)
  }
  // console.log(Sold)
  function getAmount(Sold){
    let sum=0
    Sold.forEach(x => {
      sum += x.soldprice;
  });
  return sum;
    
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
                borderRadius: 40 / 2,
              }}
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                source={images.back}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: COLORS.white,
                  alignSelf: 'center',
                }}
              />
            </TouchableOpacity>
          </View>
        }
        title={'Childrens'}
      />
    );
  }
  function renderButtons() {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          height: 100,
        }}>
        <TouchableOpacity
          style={{
            backgroundColor:
              selected == 'Herd' ? COLORS.Primary : COLORS.transparentPrimary2,
            height: selected == 'Herd' ? 55 : 75,
            width: selected == 'Herd' ? 120 : 75,
            justifyContent: 'center',
            borderRadius: selected == 'Herd'?12:75/2,
            alignSelf: 'center',
          }}
          onPress={() => {
            setSelected('Herd');
            setActive(Herd)
          }}>
          <Text
            style={{
              ...FONTS.h3,
              color: selected == 'Herd' ? COLORS.white : COLORS.black,
              alignSelf: 'center',
            }}>
            Herd
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            backgroundColor:
              selected == 'Sold' ? COLORS.Primary : COLORS.transparentPrimary2,
              height: selected == 'Sold' ? 55 : 75,
              width: selected == 'Sold' ? 120 : 75,
              justifyContent: 'center',
              borderRadius: selected == 'Sold'?12:75/2,
            alignSelf: 'center',
          }}
          onPress={() => {
            setSelected('Sold');
            setActive(Sold)
          }}>
          <Text
            style={{
              ...FONTS.h3,
              color: selected == 'Sold' ? COLORS.white : COLORS.black,
              alignSelf: 'center',
            }}>
            Sold
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
  function renderCards(){
    return(
      <FlatList
      data={active}
      keyExtractor={item => `${item.support_tag}`}
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
      )}
      />
    )
  
  }
  function renderFooter(price){
    return(
      <View style={{
        justifyContent:"flex-end",
        height:55,
        borderRadius:SIZES.radius,
        backgroundColor:COLORS.Primary,
        flexDirection:"row",
        justifyContent:"center",
        width:"88%",
        alignSelf:"center",
        marginBottom:30,
      }}>
        <Text style={
          
         Platform.OS=="ios"?{
          ...FONTS.h3,
          color:COLORS.white,
          alignSelf:"center"
        }:{
          ...FONTS.h4,
          color:COLORS.white,
          alignSelf:"center"

        }
      }>{`Total Amount: `}</Text>
      <Text style={
         Platform.OS=="ios"?{
          ...FONTS.h3,
          color:COLORS.white,
          alignSelf:"center"
        }:{
          ...FONTS.h4,
          color:COLORS.white,
          alignSelf:"center"
        }
      }>$ {price}
        </Text>
      </View>
    )
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      {renderheader()}
      {renderButtons()}
      {renderCards()}
      {
          selected=="Sold"?renderFooter(getAmount(Sold)):null
      }
    </View>
  );
}


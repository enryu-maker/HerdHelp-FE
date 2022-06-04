import { View, Text ,TouchableOpacity,FlatList,Image,ScrollView,Platform} from 'react-native'
import React from 'react'
import Header from '../../Components/Header';
import Card from '../../Components/Card';
import {
  COLORS,
  FONTS,
  images,
  SIZES,
  formatter
} from '../../Components/Constants';
import axiosIns from '../../helpers/helpers';
import ReportFilter from './ReportFilter';
import {ActivityIndicator} from 'react-native-paper'
import TextButton from '../../Components/TextButton';
import Generate from './Generate';
export default function ReportOP({navigation,route}) {
  const [label,setLabel]=React.useState("")
  const [loading,setLoading]=React.useState(false)
  const [Data,setData]=React.useState([])
  const [con,setCon] = React.useState(false)
  const [show, setShow] = React.useState(false);
  const [sep, setSpec] = React.useState('')
  const [vacc, setVacc] = React.useState('')
  const [med, setMed] = React.useState('')
  const [footer,setFooter] =React.useState(false)
  const [amount,setAmount] = React.useState([])
  const [fields,setFileds] = React.useState([])

  function filterList(list) {
    return list.filter(
      (listItem) =>
          listItem.species
          .toString()
          .includes(sep.toString()) &&
          (listItem.vaccinated
          .toString()
          .includes(vacc.toString()) &&
          listItem.medicated
          .toString()
          .includes(med.toString()))
    );
  }
  // console.log(Data)
async function getData(api){
    setLoading(true)
    let {data} =  await axiosIns.get(api)
    setLoading(false)
    return data
 }
 
//  console.log(api)
  React.useEffect(()=>{
    
    let {label} = route.params
    let {api} =route.params
    let {cond} =route.params
    let {footer} =route.params
    setFooter(footer)
    setCon(cond)
      setLabel(label)
    getData(api).then(data=>{
        setData(data)
    })
    setFileds(global.fields?.reportdata)
  //   getcat().then(data=>{
  //     setFileds(data)
  // })
    // {Generate()}
    
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
        title={label}
        titleStyle={{
          marginLeft:100
        }}
        rightComponent={
          <View
            style={{
              marginTop: 20,
              marginRight:25
              }}
            >
            <TouchableOpacity
              style={{
                marginLeft: 25,
              backgroundColor:COLORS.Primary,
              height:40,
              width:40,
              justifyContent:"center",
              borderRadius:40/2,

              }}
              onPressIn={() => {
                setShow(true);
              }}>
              <Image
                source={images.filter}
                style={{width: 25, height: 25, tintColor: COLORS.white,alignSelf:"center"}}
              />
            </TouchableOpacity>
          </View>
        }
      />
    );
  }
  function totalmoney(){
    var price=0
    Data.map(a=>{
      if (label=='Purchased Animals'){
        price+=a.price
      }
      else{
        price+=a.soldprice
      }
    })
    return price
  }
  function renderFooter(price){
    return(
      <View style={{
        // justifyContent:"flex-end",
        height:55,
        borderRadius:SIZES.radius,
        // borderTopRightRadius:SIZES.radius,
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
      }>{`Total ${label}: `}</Text>
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
      }>{formatter.format(price)}
        </Text>
      </View>
    )
  }
  return (
    <View style={{flex: 1, backgroundColor: COLORS.white}}>
      {renderHeader()} 
      {
        show &&
      <ReportFilter show={show} setShow={setShow} setSpec={setSpec} setMed={setMed} setVacc={setVacc} vacc={vacc} med={med}/>
      }
      {
        loading?(
        <View style={{
          flex:1,
          justifyContent:"center",
        }}><ActivityIndicator size="large"
        color={COLORS.Primary}
        style={{
          alignSelf:"center"
        }}/></View>
        ):
        <FlatList
        data={filterList(Data)}
        keyExtractor={item => `${item.support_tag}`}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
            <Card
              key={index}
              cond={con}
              Name={item.name}
              Tagnumber={item.support_tag}
              Gender={item.gender}
              Species={item.category}
              Weight={item.weight}
              weight_kg={item.weight_kg}
              image={item.animal_image==null?item.image:item.animal_image}
              onPress={() => {
                navigation.navigate('Info', {
                  value: item,
                  cond:con
                });
              }}
            />
          )}/>
            }

        <TextButton label={"Generate Report"}
        icon={images.file}
        buttonContainerStyle={{
          marginBottom:footer? 10 : 30,
          margin:20
          // padding:20
        }}
        onPress={()=>{
          navigation.navigate("Generate",{
            label:label,
            fields:fields
          })
        }}
        />
        {
          footer?renderFooter(totalmoney()):null
        }
        
    </View>
  )
}
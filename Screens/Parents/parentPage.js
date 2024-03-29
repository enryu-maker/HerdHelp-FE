import { View, TouchableOpacity, Image, Text, FlatList } from 'react-native';
import React from 'react';
import { COLORS, SIZES, FONTS, images, formatter } from '../../Components/Constants';
import Header from '../../Components/Header';
import ChildCard from './ChildCard';
import { ActivityIndicator } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { getBabies } from '../../Store/actions';
import moment from 'moment';
import { VictoryLine, VictoryChart, VictoryTheme,VictoryAxis, VictoryLabel } from "victory-native";
export default function ParentPage({ navigation, route }) {
  const [selected, setSelected] = React.useState('Herd');
  const [Sold, setSold] = React.useState([])
  const [active, setActive] = React.useState([])
  const [type, setType] = React.useState(0)
  const [cond, setCond] = React.useState(false)
  const [show, setShow] = React.useState(false)

  const [Herd, setHerd] = React.useState([])
  const [Data, setData] = React.useState([])
  const data = useSelector(state=>state.Reducers.baby)
  const dispatch = useDispatch()
  React.useEffect(() => {
    let { data } = route.params;
    let { cond } = route.params;
    let { type } = route.params;
    setType(type)
    setCond(cond);
    {type=="B"?(
    dispatch(getBabies(data))
    )
    :setData(data)}
    // Seperator(data);
  }, [])
  
    // if(type=="B")
    // {setHerd(data)}
    // else{setHerd(Data)}
  
  // function Seperator(data){
  //   data.map(a=>{
  //     a.status==="Alive"?(Herd.push(a)):(Sold.push(a));
  //   })
  //   setActive(Herd)
  // }
  // // console.log(Sold)
  // function getAmount(Sold){
  //   let sum=0
  //   Sold.forEach(x => {
  //     sum += x.soldprice;
  // });
  // return sum;

  // }
  function DataGen(Data){
    let finalData=[]
    const sortedDesc = Data.sort(
      (objA, objB) => Number(new Date(objA.key)) - Number(new Date(objB.key)),
    );
    sortedDesc.map(a=>{
        var dict = {};
        var d = new Date(a.key);
        dict['x'] =  moment(d).format("yyyy-MM-DD");
        dict['y']=a.data.length
        finalData.push(dict)
      })
    return finalData;
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
        title={'Children'}
        titleStyle={{
          marginLeft:80
        }}
        rightComponent={
          <View
            style={{
              alignSelf:"center",
              justifyContent: 'center',
              // position: 'absolute',
              // marginTop: 20,
            }}>
            <TouchableOpacity
              style={{
                marginRight: 25,
                backgroundColor: COLORS.white,
                height: 40,
                width: 40,
                justifyContent: 'center',
                borderRadius: 40 / 2,
              }}
              onPress={() => {
                setShow(!show)
              }}>
              <Image
                source={images.graph}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: COLORS.Primary,
                  alignSelf: 'center',
                }}
              />
            </TouchableOpacity>
          </View>
        }
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
            borderRadius: selected == 'Herd' ? 12 : 75 / 2,
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
            borderRadius: selected == 'Sold' ? 12 : 75 / 2,
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
  
  function renderCards(Herd,data,type) {
    const arr1 = type === "B" ? data : Herd 
    const sortedDesc = arr1.sort(
      (objA, objB) => Number(new Date(objB.key)) - Number(new Date(objA.key)),
    );
    return(
      <FlatList
        data={sortedDesc}
        // keyExtractor={item => `${item.key}`}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
        <ChildCard date={item.key} data={item.data}
        type={"B"}
        />
      )}
      />
    )
    
  }
  function renderFooter(price) {
    return (
      <View style={{
        justifyContent: "flex-end",
        height: 55,
        borderRadius: SIZES.radius,
        backgroundColor: COLORS.Primary,
        flexDirection: "row",
        justifyContent: "center",
        width: "88%",
        alignSelf: "center",
        marginBottom: 30,
      }}>
        <Text style={

          Platform.OS == "ios" ? {
            ...FONTS.h3,
            color: COLORS.white,
            alignSelf: "center"
          } : {
            ...FONTS.h4,
            color: COLORS.white,
            alignSelf: "center"

          }
        }>{`Total Amount: `}</Text>
        <Text style={
          Platform.OS == "ios" ? {
            ...FONTS.h3,
            color: COLORS.white,
            alignSelf: "center"
          } : {
            ...FONTS.h4,
            color: COLORS.white,
            alignSelf: "center"
          }
        }>{formatter.format(price)}
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
      {
        show?<View style={{
          // flex: 1,
          alignSelf:"center"
          // alignItems: "center",
          // justifyContent: "center",
          // marginLeft:20
        }}>
          <VictoryChart
            height={SIZES.height-150}
            width={SIZES.width-20}
            theme={VictoryTheme.material}
            domainPadding={30}
            // animate={{
            //   duration: 2000,
            //   easing: "polyIn"
            // }}
          >
            <VictoryAxis label={"Date"}  style={{ tickLabels: { angle: -90, marginTop:10 },
          axisLabel: {...FONTS.h3, padding: 30}
          }}  />
            <VictoryAxis label={"Babies"} dependentAxis style={{ tickLabels: { angle: 0 },axisLabel: {...FONTS.h3, padding: 30}, }}  />
            

            <VictoryLine
              horizontal
              labelComponent={<VictoryLabel dx={2} dy={10} />}
              labels={({ datum }) => datum.y}
              style={{
                data: { stroke: COLORS.Primary },
                parent: { border: "1px solid #000000" },
                labels: {
                  ...FONTS.body4,
                }
              }}
              x="x"
              y="y"
              data={DataGen(type === "B" ? data : Data)}
            />
          </VictoryChart>
        </View>:
      
      renderCards(Data,data,type)
            }
      {/* {renderButtons()} */}
      

      {/* {
          selected=="Sold"?renderFooter(getAmount(Sold)):null
      } */}
    </View>
  );
}


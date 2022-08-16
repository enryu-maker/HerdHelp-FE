import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React from 'react'
import Header from '../../Components/Header'
import { images, FONTS, SIZES, COLORS } from '../../Components/Constants'
import HistoryCard from './HistoryCard'
import { useSelector } from 'react-redux'
import { VictoryLine, VictoryChart, VictoryTheme,VictoryAxis, VictoryLabel } from "victory-native";
export default function History({ navigation, route }) {
  const [whist, setWhist] = React.useState([])
  const [hist, setHist] = React.useState([])
  const [graph, setGraph] = React.useState(false)
  const unit = JSON.parse(useSelector(state => state.Reducers.unit))
  React.useEffect(() => {
    let { data } = route.params
    setWhist(data)
    setHist(DataGen(data))
  }, [])
  function DataGen(data) {
    let finalData = []
    data.map(a => {
      var dict = {};
      var d = new Date(a.date_from);
      dict['x'] = d.toLocaleString("default", { month: "short" }) + d.getFullYear()
      if (unit) {
        dict["y"] = a.weight
      }
      else {
        dict["y"] = a.weight_kg
      }
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
                justifyContent: "center",
                borderRadius: 40 / 2,
              }}
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                source={images.back}
                style={{ width: 25, height: 25, tintColor: COLORS.white, alignSelf: "center" }}
              />
            </TouchableOpacity>
          </View>
        }
        title={"History"}
        titleStyle={{
          marginLeft: 110
        }}
        rightComponent={
          <View style={{
            marginRight: 25,
            marginTop: 25,
            // flex:1,
            flexDirection: 'row'
          }}>
            <Image
              source={unit == true ? images.kg : images.scale}
              style={{ width: 28, height: 28, tintColor: COLORS.Primary, marginRight: 20 }}
            />
            <TouchableOpacity
              style={{
              }}
              onPress={() => {
                setGraph(!graph)
              }}>
              <Image
                source={images.graph}
                style={{ width: 28, height: 28, tintColor: COLORS.Primary }}

              />
            </TouchableOpacity>
          </View>
        }
      />
    );
  }
  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {renderheader()}
      {
        graph ?
          <View style={{
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
              //   easing: "linear"
              // }}
            >
              <VictoryAxis label={unit?"Weight(Lbs)":"Weight(Kg)"} dependentAxis style={{ tickLabels: { angle: 0 },axisLabel: {...FONTS.h3, padding: 30}, }}  />
              <VictoryAxis label={"Date"}  style={{ tickLabels: { angle: -90, marginTop:10 },
            axisLabel: {...FONTS.h3, padding: 30}
            }}  />

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
                data={hist}
                
              
              />
            </VictoryChart>
          </View>
          :

          <ScrollView
            showsVerticalScrollIndicator={false}
          >
            {
              whist.map((a, index) => (
                unit ?
                  (<HistoryCard key={index} date={a.date_to.slice(0, 10)} weight={a.weight} />) :
                  (<HistoryCard key={index} date={a.date_to.slice(0, 10)} weight={a.weight_kg} />)

              ))
            }
          </ScrollView>
      }
    </View>
  )
}
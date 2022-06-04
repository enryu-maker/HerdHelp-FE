import { View, Text ,TouchableOpacity,Image,ScrollView} from 'react-native'
import React from 'react'
import Header from '../../Components/Header'
import { images,FONTS,SIZES,COLORS } from '../../Components/Constants'
import HistoryCard from './HistoryCard'
import { useSelector } from 'react-redux'
export default function History({navigation,route}) {
    const [whist,setWhist] = React.useState([])
    const unit = JSON.parse(useSelector(state => state.Reducers.unit))

    React.useEffect(()=>{
        let {data} =route.params
        setWhist(data)
    },[])
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
            title={"History"}
            titleStyle={{
              marginLeft:60
            }}
            rightComponent={
              <View style={{
                marginRight:25,
                marginTop: 25,

              }}>
                <Image
                source={unit==true?images.kg:images.scale}
                style={{width: 28, height: 28, tintColor: COLORS.Primary}}
              />
              </View>
            }
          />
        );
      }
      return (
        <View style={{flex:1,backgroundColor:COLORS.white}}>
          {renderheader()}
          <ScrollView 
        showsVerticalScrollIndicator={false}
          
          >
              {
                  whist.map((a,index)=>(
                    unit?
                    (<HistoryCard key={index} date={a.date_to.slice(0,10)} weight={a.weight}/>):
                    (<HistoryCard key={index} date={a.date_to.slice(0,10)} weight={a.weight_kg}/>)

                  ))
              }
          </ScrollView>
          
        </View>
  )
}
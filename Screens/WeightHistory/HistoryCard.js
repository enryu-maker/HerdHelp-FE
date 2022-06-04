import { View, Text,Animated } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES } from '../../Components/Constants';

const HistoryCard=({
    date,
    weight,
    
})=>{
    // const opacity = Animated.interpolate("", {
    //     inputRange: [0, 1],
    //     outputRange: [0.5, 0],
    //   });
  return (
    <Animated.View 
    style={[{
        alignSelf:"center",
        flexDirection:"column"
        
    }]}>
        <View style={{
        flexDirection:"row",
        justifyContent:"center",
        alignSelf:"center"
        }}>
        
        <View
        style={{
            alignSelf:"center",
            width:55,
            backgroundColor:COLORS.Primary,
            height:55,
            borderRadius:55/2,
            justifyContent:"center"
        }}>
            <Text style={{
                alignSelf:"center",
                color:COLORS.white,
                fontWeight:"800"
            }}>
                {weight}
            </Text>
        </View>
      <View style={{
            alignSelf:"center",
            width:80,
            backgroundColor:COLORS.Primary,
            height:5,
            margin:5
        }}/>

        <View
        style={{
            alignSelf:"center",
            width:180,
            backgroundColor:COLORS.white,
            height:55,
            borderRadius:SIZES.radius,
            borderColor:COLORS.Primary,
            borderWidth:1,
            justifyContent:"center"

        }}>
        <Text style={{
            color:COLORS.Primary,
            alignSelf:"center",
            ...FONTS.h2
        }}>
            {date==""?"Current Weight" : date}
        </Text>
        </View>
        </View>
        <View
        style={{
            alignSelf:"flex-start",
            width:5,
            backgroundColor:COLORS.Primary,
            height:40,
            marginLeft:22.5,
            margin:5

        }}/>
    </Animated.View>
  )
}
export default HistoryCard;
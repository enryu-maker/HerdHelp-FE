import { View, Text ,TouchableOpacity,Image,Platform,} from 'react-native'
import React from 'react'
import { COLORS, FONTS, images, SIZES } from '../../Components/Constants'

const  ReportB=({
    img,
    reportText,
    imgstyle,
    reportTextstyle,
    btnStyle,
    onPress,
    
})=>{
  return (
    <TouchableOpacity style={{backgroundColor:COLORS.lightGray2,
        height:100,
        margin:SIZES.base2,
        borderRadius:SIZES.radius,
        flexDirection:'row',
        // justifyContent:'space-evenly',
        shadowColor: COLORS.black,
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 2,
        width:'88%',
        alignSelf:'center'}}
        onPress={onPress}>
          <View style={{justifyContent:'center',alignSelf:"center"}}>
              <Image source={{uri:img}}
              style={{height:50,width:50,margin:30}}/>
          </View>
          <View style={{
              flexDirection:'column',
              justifyContent:"space-evenly"
          }}>
              <Text style={
                 Platform.OS=="android"?[FONTS.h3,{letterSpacing:1,fontWeight:'600'}]:[FONTS.h2,{letterSpacing:1,fontWeight:'600'}]}>
                  {reportText}
              </Text>
              
          </View>
        </TouchableOpacity>
    
  )
}
export default ReportB;

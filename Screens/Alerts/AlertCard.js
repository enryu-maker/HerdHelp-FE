import { View, Text, Image, TouchableOpacity,Platform } from 'react-native';
import React from 'react';
import moment from 'moment';

import { COLORS, FONTS, images, SIZES } from '../../Components/Constants';
import axiosIns from '../../helpers/helpers';
const AlertCard=({
    title,
    content,
    tag,
    date,
    time,
    id
})=>{
   function delAlert(){
    axiosIns.delete(`alerts/${id}`).then(()=>{alert("Alert deleted sucessfully")})
   }
  return (
    <View style={{backgroundColor:COLORS.lightGray2,
    // flex:1,
    height:120,
    margin:SIZES.base2,
    borderRadius:SIZES.radius,
    width:'88%',
    alignSelf:'center',
}}
    >
        
        <View style={{flexDirection:"row",justifyContent:"space-between"}}>
            <View style={{flexDirection:"column",padding:10}}>
            <Text style={
              Platform.OS=="android"?{...FONTS.h2}:{...FONTS.h2}
                }>{title}</Text>
            <Text style={
                Platform.OS=="android"?{...FONTS.body3}:{...FONTS.body3}
            }>{content}</Text>
            <Text style={
                Platform.OS=="android"?{...FONTS.h3}:{...FONTS.h3}
            }>{`${tag}`}</Text>
            <View style={{flexDirection:"row",justifyContent:"space-between",width:"55%"}}>
            <Text style={
                Platform.OS=="android"?{...FONTS.h4,color:COLORS.Primary}:{...FONTS.h3,color:COLORS.Primary}
            }>{date}</Text>
            <Text style={
                Platform.OS=="android"?{...FONTS.h4}:{...FONTS.h3}
            }>    {time}</Text>
            </View>
            </View>
            {/* <TouchableOpacity style={{backgroundColor:'#ff5b5b',height:110,width:75,alignSelf:"flex-end",borderRadius:SIZES.radius,margin:5,flexDirection:"column",justifyContent:"space-evenly"}}
            onPress={()=>{delAlert()}}
            >
            <Image source={images.bell} 
                style={{width: 30, height: 30, tintColor: COLORS.white,alignSelf:"center"}}
            />
            <View style={{flexDirection:"column"}}>
            <Text style={{color:COLORS.white,...FONTS.h3,alignSelf:"center"}}>
                Delete
            </Text>
            <Text style={{color:COLORS.white,...FONTS.h3,alignSelf:"center"}}>
                Alert
            </Text>
            </View>
            
        </TouchableOpacity> */}
        </View>
        

    </View>
  );
}
export default AlertCard;

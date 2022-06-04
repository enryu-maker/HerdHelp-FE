import { View, Text,Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { COLORS, SIZES,images, FONTS } from './Constants';
import LineDivider from './LineDivider';
export default function Vertical({purchase,birth,onPress,style,purchased}) {
  return (
    <View>
<TouchableOpacity style={{
        flexDirection:'column',
        backgroundColor:COLORS.lightGray2,
        height:150,
        width:150,
        borderRadius:SIZES.radius,
        // alignSelf:'center',
        // justifyContent:'space-evenly',
        margin:'20%',
        ...style
    }}
    onPress={onPress}>
 <View style={{padding:5,alignSelf:'center'}}>
       
        {
          purchased == 1 ? <Text style={[FONTS.body3,{padding:8,alignSelf:'center',fontWeight:'900'}]}>Purchased</Text> : <Text style={[FONTS.body3,{padding:8,alignSelf:'center',fontWeight:'900'}]}>Birth</Text>
        }
        <LineDivider/>
        {
          purchased == 1 ? <Image source={purchase} style={{ width:80,height:80,margin:10}}/> : <Image source={birth} style={{ width:80,height:80,margin:10}}/>
        }
 </View>
      
        
    </TouchableOpacity>
    </View>
  );
}

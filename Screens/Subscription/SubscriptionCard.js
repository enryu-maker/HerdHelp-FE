import { View, Text,Image ,TouchableOpacity} from 'react-native'
import React from 'react'
import { COLORS, FONTS, formatter, images, SIZES } from '../../Components/Constants'

const SubscriptionCard=({
    label,
    price,
    count=0,
    buttonStyle,
    onPress,
    active,
    desc
})=>{
  return (
    <TouchableOpacity
    style={{
        backgroundColor:active?COLORS.Primary:COLORS.lightGray2,
        height:100,
        width:"88%",
        alignSelf:"center",
        borderRadius:SIZES.radius,
        marginTop:10,
        marginBottom:10,
        shadowColor: COLORS.black,
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 2,
        ...buttonStyle
    }}
    onPress={onPress}
    >
        <View style={{
            flexDirection:"column"
        }}>
        <View style={{
            justifyContent:"space-between",
            flexDirection:"row",
        }}>
            <Text style={{
                ...FONTS.h2,
                marginTop:10,
                marginLeft:10,
                color:active?COLORS.white:COLORS.black
            }}>{label}</Text>
        
            <Image source={images.rightone} style={{
                height:15,
                width:15,
                margin:10,
                tintColor:active?COLORS.white:COLORS.black
            }}/>
        </View>
        <View style={{
            flexDirection:"row",
        }}>
         <View>
        <Text style={{
            ...FONTS.h3,
            marginLeft:30,
            color:active?COLORS.white:COLORS.black
        }}>
           {`${formatter.format( price)} / month`}
        </Text>
        <Text style={{
            ...FONTS.h3,
            marginLeft:30,
            color:active?COLORS.white:COLORS.black

        }}>
           {`Animal Limit : ${count}`}
        </Text>
        
        </View>
        {
           active? <Image source={images.paid} style={{
            height:50,
            width:50,
            marginLeft:65,
            tintColor:"yellow"
        }}/>:null
    }
        </View>
        </View>
    </TouchableOpacity>
      
  )
}
export default SubscriptionCard;
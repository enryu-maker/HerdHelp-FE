import React from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    Image,
    ActivityIndicator
} from 'react-native';
import { FONTS, COLORS ,SIZES, images} from "./Constants";
const CustomButton = ({
    buttonContainerStyle,
    disabled,
    label,
    labelStyle,
    label2 = "",
    label2Style,
    onPress,
    icon,
    iconStyle,
    buttonContainerStyle2,
    loading,
    iconContainerStyle
}) => {
    return (
        <TouchableOpacity
            style={{
                flexDirection:"row",
                // alignContent: 'center',
                justifyContent: "space-between",
                backgroundColor: COLORS.Primary,
                borderRadius:SIZES.radius,
                height:55,
                width:'88%',
                alignSelf:'center',
                ...buttonContainerStyle,

            }}
            disabled={disabled}
            onPress={onPress}
        >
            <>
            {icon && <View style={{
                borderColor:COLORS.white,
                height:40,
                width:40,
                justifyContent:"center",
                borderRadius:SIZES.base,
                alignSelf:"center",
                marginLeft:10,
                borderWidth:1,
                ...iconContainerStyle
            }}>
            <Image source={icon} style={{
                height:30,
                width:30,
                tintColor:COLORS.white,
                alignSelf:"center",
                ...iconStyle
            }}/>
            </View>}
            <View style={{
                justifyContent:"center",
                // alignSelf:"flex-start"
            }}>
            <Text style={{
                color:COLORS.white,
                ...FONTS.h3,
                alignSelf:"flex-start",
                letterSpacing:2,
                ...labelStyle

            }}>{label}</Text>
            </View>
            </>
             <View
              style={{
              backgroundColor:COLORS.white,
              height:40,
              width:40,
              justifyContent:"center",
              borderRadius:40/2,
              alignSelf:"center",
              marginRight:10,
              ...buttonContainerStyle2
              }}>
              <Text style={{
                color:COLORS.Primary,
                ...FONTS.h2,
                alignSelf:"center",
                ...label2Style
              }}>{label2}</Text>
            </View>
        </TouchableOpacity>
    )
}

export default CustomButton;

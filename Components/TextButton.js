import React from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    Image,
} from 'react-native';
import { FONTS, COLORS ,SIZES} from "./Constants";
import LinearGradient from "react-native-linear-gradient";
import { ActivityIndicator } from 'react-native-paper';
const TextButton = ({
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
    border=true
}) => {
    return (
        <>
        {border && <LinearGradient
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                colors={[ COLORS.transparent,COLORS.lightGray1,]}
                style={{
                    // position: 'absolute',
                    top: -5,
                    left: 0,
                    right: 0,
                    height: Platform.OS === 'ios' ? 5 : 5,
                    borderTopLeftRadius: SIZES.radius,
                    borderTopRightRadius: SIZES.radius
                }}
            />}
        <TouchableOpacity
            style={{
                flexDirection:"row",
                alignItems: 'center',
                justifyContent: 'center',
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
            {
                icon != false &&
                <View
                    style={{
                        margin:10
                    }}
                >
                {
                    loading?
                    <ActivityIndicator
                        animating = {true}
                        color = {COLORS.white}
                        size = "small"
                        />
                        :
                    <Image source={icon} style={{height:25,width:25,tintColor:COLORS.white,alignSelf:"flex-start",...iconStyle}}/> } 
            </View>
            }
            <Text style={{ color: COLORS.white, ...FONTS.h3, ...labelStyle,alignSelf:"center",letterSpacing:2 }}>
                {label}
            </Text>

            {label2 != false &&
                <View
                    style={{
                        
                        backgroundColor: COLORS.red,
                        height:20,
                        width:20,
                        borderRadius:20/2,
                        alignSelf:"flex-end",
                        justifyContent:"flex-end",
                        ...buttonContainerStyle2
                        
                    }}
                >
                <Text style={{ color: COLORS.white, ...FONTS.h3, ...label2Style,letterSpacing:2,alignSelf:"center",justifyContent:"center" }}>
                  {label2}
            </Text>
            </View>
            }
        </TouchableOpacity>
        </>
    )
}

export default TextButton;
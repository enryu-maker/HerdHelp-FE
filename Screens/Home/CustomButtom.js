import React from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import {FONTS, COLORS, SIZES, images} from '../../Components/Constants';
const CustomButton = ({
  buttonContainerStyle,
  disabled,
  label,
  labelStyle,
  label2 = false,
  label2Style,
  onPress,
  icon,
  iconStyle,
  buttonContainerStyle2,
  loading,
  iconContainerStyle,
  cond
}) => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: COLORS.lightGray2,
        borderRadius: SIZES.radius,
        height: 200,
        width: 160,
        shadowColor: COLORS.black,
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 2,
        alignSelf: 'center',
        justifyContent: 'space-evenly',
        ...buttonContainerStyle,
      }}
      disabled={disabled}
      onPress={onPress}>
      <>
        {icon && (
          <View
            style={{
              borderColor: COLORS.white,
              justifyContent: 'center',
              alignSelf: 'center',
              //   margin: 10,
              ...iconContainerStyle,
            }}>
              {
                cond?<Image
                source={{uri:icon}}
                style={{
                  height: 70,
                  width: 70,
                  tintColor: COLORS.black,
                  alignSelf: 'center',
                  ...iconStyle,
                }}
              />:
              
            <Image
              source={icon}
              style={{
                height: 70,
                width: 70,
                tintColor: COLORS.black,
                alignSelf: 'center',
                ...iconStyle,
              }}
            />}
          </View>
        )}
        <View
          style={{
            justifyContent: 'center',
            // alignSelf:"flex-start"
          }}>
          <Text
            style={{
              color: COLORS.black,
              ...FONTS.h3,
              alignSelf: 'center',
              letterSpacing: 2,
              ...labelStyle,
            }}>
            {label}
          </Text>
        </View>
      </>
      {label2 && (
        <View
          style={{
            backgroundColor: COLORS.white,
            height: 40,
            width: 100,
            justifyContent: 'center',
            flexDirection: 'row',
            borderRadius: 40 / 2,
            alignSelf: 'center',
            ...buttonContainerStyle2,
          }}>
            
          <Image
             source={icon}
            style={{
              height: 30,
              width: 30,
              tintColor: COLORS.Primary,
              alignSelf: 'center',
              padding: 5,
              ...iconStyle,
            }}
          />
          <Text
            style={{
              ...FONTS.h3,
              alignSelf: 'center',
              padding: 5,
            }}>
            X
          </Text>
          <Text
            style={{
              color: COLORS.Primary,
              ...FONTS.h2,
              alignSelf: 'center',
              padding: 5,
              ...label2Style,
            }}>
            {label2}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

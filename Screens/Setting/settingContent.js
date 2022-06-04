import { View, Text,TouchableOpacity,Image } from 'react-native'
import React from 'react'
import { images,COLORS,SIZES,FONTS } from '../../Components/Constants';
import { Dropdown } from 'sharingan-rn-modal-dropdown';

export default function SettingContent({
    title,
    append,
    onPress
  }){
    return(
        <TouchableOpacity
        style={{
            flexDirection: 'row',
            height: 30,
            margin:20,
            alignItems: 'center',
            justifyContent:"space-between"
        }}
        onPress={onPress}
    >
        <Text style={{ color: COLORS.darkGray, ...FONTS.h3 }}>{title}</Text>
        {append}
        <Image
        source={images.rightone}
        style={{
          height: 15,
          width: 15,
          tintColor: COLORS.black,
        //   position:"absolute",
          alignSelf:"flex-start"
        }}
      />
        </TouchableOpacity>
    )
  }
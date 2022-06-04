import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS, FONTS, images, SIZES} from '../../Components/Constants';
import { baseURL } from '../helpers/helpers';
import { useSelector } from 'react-redux';
const Card = ({
  Tagnumber,
  Name,
  cond,
  Gender,
  Weight,
  image,
  onPress,
  weight_kg,
  navigation,
}) => {
  const unit = useSelector(state=>state.Reducers.unit)
  return (
    <TouchableOpacity
      style={{
        backgroundColor: COLORS.lightGray2,
        height: 100,
        margin: SIZES.base2,
        borderRadius: SIZES.radius,
        flexDirection: 'row',
        justifyContent: "space-between",
        shadowColor: COLORS.black,
        shadowOffset: {width: 0, height: 0},
        shadowOpacity: 0.5,
        shadowRadius: 5,
        elevation: 2,
        width: '88%',
        alignSelf: 'center',

      }}
      onPress={onPress}>
      <View style={{justifyContent: 'center', marginRight: SIZES.padding,height: 80, width: 80,alignSelf:"center",marginLeft:15}}>
          <Image source={ image} style={{height: 50, width: 50}}
          />
      </View>
      <View style={{justifyContent: 'center',alignSelf:"center",position:"absolute",marginLeft:100}}>
         <Text style={{
             ...FONTS.h2,
             alignSelf:"center"
         }}>{Name}</Text>
      </View>
      <View
        style={{
        //   flexDirection: 'column',
        }}>
            <Image
        source={images.rightone}
        style={{
          height: 15,
          width: 15,
          margin: 10,
          tintColor: COLORS.black,
        //   position:"absolute",
          alignSelf:"flex-end"
        }}
      />
        
      </View>
      
    </TouchableOpacity>
  );
};
export default Card;

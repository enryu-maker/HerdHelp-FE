import { View, Text,Modal,Image,Platform } from 'react-native'
import React from 'react'
import { COLORS, FONTS, images, SIZES } from './Constants'

const CustomAlert=({
    show,
    setShow,
    label,
    validation
})=>{
  React.useEffect(()=>{
    // setShow(setShow)
  },[show])
  return (
    <Modal
    transparent={true}
      animationType={'fade'}
      visible={show}
      onRequestClose={() => {
        setShow(false)
      }}
    >
        <View
        style={{
          height: '100%',
          width: '100%',
        backgroundColor:"#00000040",
         justifyContent:"center",
         alignSelf:"center"
        }}
        onTouchStart={()=>{setShow(false)}}
        >
        <View
        style={{
          height: 150,
          width: 150,
        backgroundColor:COLORS.white,
         justifyContent:"space-evenly",
         alignSelf:"center",
         borderRadius:SIZES.radius,
         flexDirection:"column",
        }}
        >
            {
                validation?
                <Image source={images.correct} style={{
                    width:80,height:80,alignSelf:"center",tintColor:COLORS.Primary
                }}/>:
                <Image source={images.cancel} style={{
                    width:80,height:80,alignSelf:"center",tintColor:COLORS.red
                }}/>
            }
        
        <Text 
        style={
           Platform.OS=="android"?{...FONTS.h3,alignSelf:"center"} : {...FONTS.h2,alignSelf:"center"}
            }>{label}</Text>
        </View>
        </View>


    </Modal>
  )
}

export default CustomAlert;
import { View, Text, TouchableOpacity, Image, Linking } from 'react-native'
import React from 'react'
import { COLORS, FONTS, SIZES } from '../../Components/Constants'

export default function TutorialCard({
    link,
    title,
    image
}) {
    return (
        <TouchableOpacity
        style={{
            marginTop:15
        }}
            onPress={() => {
                Linking.openURL(link)
            }}
        >
            <Image style={{
                width: "88%",
                height: 150,
                backgroundColor: COLORS.lightGray1,
                borderTopLeftRadius: SIZES.padding,
                borderTopRightRadius: SIZES.padding,
                alignSelf: "center",
            }} source={{ uri: image }}
            />
            {/* <View style={{
        width:"88%",
        height:80,
        backgroundColor:COLORS.lightGray1,
        borderRadius:SIZES.padding,
        alignSelf:"center",
        justifyContent:"center",
        marginTop:-38,
    }} > */}
            <View style={{
                alignSelf: "center",
                width: "88%",
                height:50,
                backgroundColor: COLORS.lightGray1,
                justifyContent:"center",
                borderBottomLeftRadius:SIZES.padding,
                borderBottomRightRadius:SIZES.padding
            }}>
                <Text style={{
                    justifyContent:"center",
                    alignSelf:"center",
                ...FONTS.body3,
                }}>
                {title}
                </Text>
            </View>

            {/* </View> */}


        </TouchableOpacity>
    )
}
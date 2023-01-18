import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, Alert, Modal } from 'react-native'
import { images, COLORS, SIZES, FONTS } from '../../Components/Constants';
import React from 'react'
import Header from '../../Components/Header'
export default function InfoPage({
    navigation
}) {
    const [data,setData] = React.useState("")
    const getNewData=()=>{
        console.log("getNewData")
    }
    function renderheader() {
        return (
            <Header
                leftComponent={
                    <View
                        style={{
                            justifyContent: 'center',
                            position: 'absolute',
                            marginTop: 20,
                            zIndex: 1,
                        }}>
                        <TouchableOpacity
                            style={{
                                marginLeft: 25,
                                backgroundColor: COLORS.Primary,
                                height: 40,
                                width: 40,
                                justifyContent: "center",
                                borderRadius: 40 / 2,
                            }}
                            onPress={() => {
                                navigation.Replace("DrawNav");
                            }}>
                            <Image
                                source={images.x}
                                style={{ width: 16, height: 16, tintColor: COLORS.white, alignSelf: "center" }}
                            />
                        </TouchableOpacity>
                    </View>
                }
                title={'Alert'}
            />
        );
    }
  return(
    <View style={{
        flex: 1,
        backgroundColor: COLORS.white
    }}>
        {renderheader()}
    </View>
  )
}
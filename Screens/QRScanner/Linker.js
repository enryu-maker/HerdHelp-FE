import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Header from '../../Components/Header';
import { images, FONTS, SIZES, COLORS } from '../../Components/Constants';
export default function Linker({
    navigation
}) {
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
                                navigation.goBack();
                            }}>
                            <Image
                                source={images.back}
                                style={{width: 25, height: 25, tintColor: COLORS.white, alignSelf: "center" }}
                            />
                        </TouchableOpacity>
                    </View>
                }
                title={'Scan Device'}
            />
        );
    }
  return (
    <View style={{
        flex:1,
        backgroundColor:COLORS.white
    }}>
      {renderheader()}
    </View>
  )
}
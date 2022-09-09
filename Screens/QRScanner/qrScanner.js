import {
    View, Text, Image,
    TouchableOpacity,
} from 'react-native'
import React from 'react'
import { images, COLORS, SIZES, FONTS } from '../../Components/Constants';
import Header from '../../Components/Header';
import TextButton from '../../Components/TextButton';
import { useNavigation, DrawerActions } from '@react-navigation/native';
export default function QRScanner(){
    const navigation = useNavigation()
    console.log(navigation)
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
                                navigation.openDrawer();
                              }}>
                            <Image
                                source={images.menu}
                                style={{ width: 25, height: 25, tintColor: COLORS.white, alignSelf: "center" }}
                            />
                        </TouchableOpacity>
                    </View>
                }
                title={'Link Device'}
            />
        );
    }
    return (
        <View style={{
            flex:1,
            backgroundColor:COLORS.white
        }}>
            {renderheader()}
            <Image 
            resizeMode="contain"
            source={images.qrlogo}
            style={{
                // width:350,
                height:220,
                alignSelf:"center"

            }}
            />
            <Text style={{color: COLORS.darkGray, ...FONTS.h3,alignSelf:"center"}}>
                Use HerdHelp on other Devices
            </Text>
            <TextButton
            buttonContainerStyle={{
                marginTop:20
            }}
            icon={images.link}
            border={false}
            label={"Link A Device"}
            onPress={()=>{
                navigation.navigate("Linker")
            }}
            />
        </View>
    )
}


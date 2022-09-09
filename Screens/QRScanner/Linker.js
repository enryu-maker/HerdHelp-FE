import { View, Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import Header from '../../Components/Header';
import { images, FONTS, SIZES, COLORS } from '../../Components/Constants';
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
import TextButton from '../../Components/TextButton';
export default function Linker({
    navigation
}) {
    const [flash,setFlash] = React.useState(false)
    const onSuccess = e => {
       console.log(e.data)
      };
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
                rightComponent={
                    <View
                        style={{
                            justifyContent: 'center',
                            // position: 'absolute',
                            // marginTop: 20,
                            zIndex: 1,
                        }}>
                        <TouchableOpacity
                            style={{
                                marginRight: 25,
                                backgroundColor: COLORS.Primary,
                                height: 40,
                                width: 40,
                                justifyContent: "center",
                                borderRadius: 40 / 2,
                            }}
                            onPress={() => {
                                setFlash(!flash)
                            }}>
                            <Image
                                source={flash?images.flash:images.noflash}
                                style={{width: 25, height: 25, tintColor: COLORS.white, alignSelf: "center" }}
                            />
                        </TouchableOpacity>
                    </View>
                }
                title={'Scan QR'}
                titleStyle={{
                    marginLeft:75
                }}
            />
        );
    }
  return (
    <View style={{
        flex:1,
        backgroundColor:COLORS.white
    }}>
      {renderheader()}

      <QRCodeScanner
        onRead={onSuccess}
        flashMode={flash ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
      />
    </View>
  )
}
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, Alert, Modal } from 'react-native'
import React from 'react'
import { images, COLORS, SIZES, FONTS } from '../../Components/Constants';
import Header from '../../Components/Header';
import { getAppstoreAppMetadata } from "react-native-appstore-version-checker";
import { Provider, useDispatch, useSelector } from 'react-redux';
import { name as app_name, version as app_version } from '../../package.json';
export default function About({ navigation }) {
  const version = useSelector(state => state.Reducers.appVersion)
  console.log(version)

    // const [version,setVersion]=React.useState("")
    // const storeSpecificId = Platform.OS === "ios" ? "1627766617" : "com.herdhelp";
    // getAppstoreAppMetadata(storeSpecificId) //put any apps id here
    //     .then(appVersion => {
    //         setVersion(
    //             appVersion.version,
    //         );
    //     })
    //     .catch(err => {
    //         setVersion("Someting went wrong");
    //     });
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
                                style={{ width: 25, height: 25, tintColor: COLORS.white, alignSelf: "center" }}
                            />
                        </TouchableOpacity>
                    </View>
                }
                title={'App Version'}
            />
        );
    }
    return (
        <View style={{
            flex: 1,
            backgroundColor: COLORS.white
        }}>
            {renderheader()}
            <View style={{
                marginTop: 120,
                justifyContent: "center",
                alignItems: "center"
            }}>
                <Image
                    source={images.HH}
                    style={{
                        width: 150,
                        height: 150
                    }}
                />
                <Text style={{
                    ...FONTS.h2
                }}>
                    {app_name}
                </Text>
                <Text style={{
                    ...FONTS.h2
                }}>
                    V {version}
                </Text>
            </View>
        </View>
    )
}
import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, Alert, Modal } from 'react-native'
import React from 'react'
import { images, COLORS, SIZES, FONTS } from '../../Components/Constants';
import Header from '../../Components/Header';
import SettingContent from './settingContent';
export default function AccountSetting({navigation}) {
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
            title={'Account Setting'}
          />
        );
      }
      function renderContent() {
        return (
          <View
            style={{
              marginTop: SIZES.padding,
              borderRadius: SIZES.radius,
              // paddingHorizontal: SIZES.radius,
              backgroundColor: COLORS.lightGray2,
              // paddingBottom: SIZES.padding,
            }}>
            <SettingContent title={"Delete Account"}
            titleStyle={{
                color:COLORS.red
            }}
            onPress={()=>{
              Alert.alert(
                "Delete Account",
                "Are you sure you want to Delete your Account?",
                [
                    {
                        text: "Cancel",
                        onPress: () => {
                        },
                        style: "cancel"
                    },
                    {
                        text: "Delete", onPress: () => {navigation.navigate("Delete")
                      },
                        style: "destructive"
                    }
                ]
            );
            }}
              />
          </View>
        )
      }
  return (
    <View style={{
        flex:1,
        backgroundColor:COLORS.white
    }}>
        {renderheader()}
        <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding,
        }}>
        {renderContent()}

      </ScrollView>
    </View>
  )
}
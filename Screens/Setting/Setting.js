import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator, Alert, Modal } from 'react-native'
import React from 'react'
import { images, COLORS, SIZES, FONTS } from '../../Components/Constants';
import Header from '../../Components/Header';
import SettingContent from './settingContent';
import { Dropdown } from 'sharingan-rn-modal-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../Home/CustomButtom';
import { useDispatch, useSelector } from 'react-redux';
import { WeightUnit } from '../../Store/actions';
import Toast from 'react-native-toast-message'
import { toastConfig } from '../../App';
import LineDivider from '../../Components/LineDivider';
export default function Setting({ navigation }) {
  const [unit, setUnit] = React.useState("")
  const [loading, setLoading] = React.useState(false)
  const [show, setShow] = React.useState(false)
  const [cond, setCond] = React.useState("")
  const [EmailError, setEmailError] = React.useState("")
  const [color, setCol] = React.useState(COLORS.lightGray1)
  const dispatch = useDispatch()
  const CurrentUnit = JSON.parse(useSelector(state => state.Reducers.unit))

  const onChangeUnit = (value) => {
    // console.log(value)
    setLoading(true)
    setUnit(value)
    dispatch(WeightUnit(value.toString()))
    setLoading(false)
    Toast.show({
      text1: "Setting Updated",
      type: "success"
    });
  }
  const units = [
    {
      value: true,
      label: 'lbs',
      avatarSource: images.weight
    },
    {
      value: false,
      label: 'kg',
      avatarSource: images.weight
    },
  ];
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
        title={'Setting'}
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
        <SettingContent title={"Weight"}
          onPress={() => {
            setShow(true)
          }}
          append={
            <Text style={{
              ...FONTS.h3
            }}>
              {CurrentUnit ? "Lbs" : "Kg"}
            </Text>


          }
        />
        <LineDivider/>
        <SettingContent title={"Account Setting"}
        onPress={()=>{
          navigation.navigate("Accountsetting")
        }}
          />
      </View>
    )
  }
  function popUp() {
    return (
      <Modal
        transparent={true}
        animationType={'fade'}
        visible={show}
        onRequestClose={() => {
          setShow(false);
        }}>
        <View
          style={{
            height: '100%',
            width: '100%',
            backgroundColor: '#00000040',
            justifyContent: 'center',
            alignSelf: 'center',
          }}
          onStartShouldSetResponder={() => setShow(false)}
        >
          <View
            style={{
              height: 100,
              width: "88%",
              backgroundColor: COLORS.lightGray2,
              alignSelf: 'center',
              borderRadius: SIZES.radius,
              alignContent: "center",
            }}>

            <Dropdown
              data={units}
              mainContainerStyle={{
                width: "88%",
                alignSelf: "center",
                justifyContent: "center",
                marginTop: 15
              }}
              label="Unit"
              // mode="outlined"
              dropdownIcon={images.down}
              dropdownIconSize={20}
              borderRadius={SIZES.radius}
              animationIn="bounceInRight"
              animationOut="bounceOutRight"
              textInputStyle={(FONTS.body2, { letterSpacing: 2 })}
              selectedItemTextStyle={
                (FONTS.body3,
                  { color: COLORS.white, letterSpacing: 2, alignSelf: 'center' })
              }
              selectedItemViewStyle={{
                backgroundColor: COLORS.Primary,
                margin: 5,
                borderRadius: SIZES.radius,
              }}
              disableSelectionTick
              primaryColor={COLORS.Primary}
              value={unit}
              onChange={onChangeUnit}
            />
          </View>
        </View>
      </Modal>
    )
  }

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {renderheader()}
      {
        show &&
        popUp()
      }
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding,
        }}>
        {renderContent()}

      </ScrollView>
      <Toast ref={(ref) => { Toast.setRef(ref) }} config={toastConfig} />

    </View>
  )
}
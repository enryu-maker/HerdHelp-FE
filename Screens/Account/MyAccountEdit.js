import React, {useState} from 'react';
import {View, TouchableOpacity, Image, Text} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import Header from '../../Components/Header';
import TextButton from '../../Components/TextButton';
import FormInput from '../../Components/FormInput';
import {COLORS, SIZES, images,FONTS} from '../../Components/Constants';
import axiosIns from '../../helpers/helpers';
import CustomAlert from '../../Components/CustomAlert';
import { showMessage } from 'react-native-flash-message';
import { useDispatch } from 'react-redux';
import { UserData } from '../../Store/actions';


const MyAccountEdit = ({navigation,route}) => {
  const [fullName, setFullName] = useState(route.params.user.fullname);
  const [phoneNo, setPhoneNo] = useState(route.params.user.phone);
  const [idCard, setIdCard] = useState(route.params.user.farm_name);
  const [addr, setAddr] = useState(route.params.user.address);
  const [user,setUser]=React.useState([])
  const [loading, setLoading] = React.useState(false);
  const dispatch = useDispatch()
  const updateprofile = async () => {
    setLoading(true)
      try {
        await axiosIns.patch(`updateprofile/${global.id}`,
        {
          "fullname": fullName,
          "phone": phoneNo,
          "farm_name": idCard,
          "address": addr
          }, {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        ).then(()=>{
          setLoading(false)
          showMessage({
            message: 'Details updated',
            type: 'default',
            backgroundColor: COLORS.Primary,
            color: COLORS.white,
            titleStyle: {
              alignSelf: 'center',
              ...FONTS.h3,
            },
            animationDuration: 250,
            icon: "success",
            style:{
              justifyContent:"center"
            }
          });
          dispatch(UserData())
        })
      } catch (e) {
        setLoading(false)
        showMessage({
          message: `${e.response.data.msg}`,
          type: 'default',
          backgroundColor: COLORS.red,
          color: COLORS.white,
          titleStyle: {
            alignSelf: 'center',
            ...FONTS.h3,
          },
          animationDuration: 250,
          icon:"danger",
          style:{
            justifyContent:"center"
          }
        });
      }
    };
  React.useEffect(() => {
    let { user } = route.params
    setUser(user)
  },[]);
  function renderHeader() {
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
              backgroundColor:COLORS.Primary,
              height:40,
              width:40,
              justifyContent:"center",
              borderRadius:40/2,
              }}
            onPress={() => {
              navigation.goBack()

            }}>
            <Image
              source={images.back}
              style={{width: 25, height: 25, tintColor: COLORS.white,alignSelf:"center"}}
            />
          </TouchableOpacity>
        </View>
        }
        title={'Edit Account'}
        titleStyle={{
          // alignSelf:"center",
          marginLeft: 50,
        }}
        rightComponent={
          <View
            style={{
              width: 40,
            }}
          />
        }
      />
    );
  }

  function renderForm() {
    return (
      <View
        style={{
          paddingVertical: SIZES.padding,
          paddingHorizontal: SIZES.radius,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.lightGray2,
        }}>
        
        {/* Name */}
        <FormInput
          label="Full Name"
          placeholder={user.fullname}
          value={fullName}
          onChange={value => {
            setFullName(value);
          }}
          returnKeyType={"next"}
          inputContainerStyle={{
            backgroundColor: COLORS.white,
          }}
        />

        {/* Phone Number */}
        <FormInput
          label="Phone Number"
          placeholder={user.phone}
          value={phoneNo}
          onChange={value => {
            setPhoneNo(value);
          }}
          returnKeyType={"next"}
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          inputContainerStyle={{
            backgroundColor: COLORS.white,
          }}
        />

        {/* ID Card */}
        <FormInput
          label="Farm Name"
          placeholder={user.farm_name}

          value={idCard}
          onChange={value => {
            setIdCard(value);
          }}
          returnKeyType={"next"}
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          inputContainerStyle={{
            backgroundColor: COLORS.white,
          }}
        />
        {/* Address */}
        <FormInput
          label="Address"
          placeholder={user.address}

          value={addr}
          onChange={value => {
            setAddr(value);
          }}
          returnKeyType={"next"}
          containerStyle={{
            marginTop: SIZES.radius,
          }}
          inputContainerStyle={{
            backgroundColor: COLORS.white,
          }}
        />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}>
      {renderHeader()}
      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        keyboardDismissMode="on-drag"
        contentContainerStyle={{
          marginTop: SIZES.radius,
          paddingHorizontal: SIZES.padding,
          paddingBottom: 40,
        }}>
        {renderForm()}
      </KeyboardAwareScrollView>

      <TextButton
      loading={loading}
      icon={images.update}
        buttonContainerStyle={{
          // height: 60,
          marginTop: SIZES.padding,
            marginHorizontal: SIZES.padding,
            marginBottom: SIZES.padding,
            borderTopLeftRadius: SIZES.radius,
            borderTopRightRadius: SIZES.radius,
            backgroundColor: COLORS.Primary,
        }}
        label="Save"
        onPress={() => {
          updateprofile();
        }}
      />
    </View>
  );
};

export default MyAccountEdit;

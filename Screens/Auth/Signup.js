import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import FormInput from '../../Components/FormInput';
import {images, COLORS, SIZES, FONTS} from '../../Components/Constants';
import TextButton from '../../Components/TextButton';
import axios from 'axios';
import Loader from '../../Components/Loader';
import LoaderOp from '../../Components/LoaderOp';
import { baseURL } from '../../helpers/helpers';
import utils from '../../utils/Utils';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { showMessage } from 'react-native-flash-message';
export const Signup = ({navigation}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [first, setFirst] = React.useState('');
  const [last, setLast] = React.useState('');
  const [showPass, setShowPass] = React.useState(false);
  const [EmailError, setEmailError] = React.useState('');
  const [EmailErr, setEmailErr] = React.useState('');
  const [PassErr, setPassErr] = React.useState('');
  const [UserErr, setUserErr] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [validation, setValidation] = React.useState(false);
  const [dataText, setDataText] = React.useState('');

  function isEnableSignIn() {
    return email != '' && password != '' && username != '' && first!="" && last!="";
  }
  async function signup() {
    if (isEnableSignIn) {
      setLoading(true);
      await axios
        .post(
          baseURL + '/register/',
          {
            username: username,
            password: password,
            email: email,
            first_name:first,
            last_name:last,
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then(response => {
          if (response.status === 201) {
            setLoading(false)
            showMessage({
              message: 'User created',
              type: 'default',
              backgroundColor: COLORS.Primary,
              color: COLORS.white,
              titleStyle: {
                alignSelf: 'center',
                ...FONTS.h3,
              },
              animationDuration: 250,
              icon: 'success',
              style:{
                justifyContent:"center"
              }
            });
          } else {
            setLoading(false);
            showMessage({
              message: 'User Registered',
              type: 'default',
              backgroundColor: COLORS.red,
              color: COLORS.white,
              titleStyle: {
                alignSelf: 'center',
                ...FONTS.h3,
              },
              animationDuration: 250,
              icon: "danger",
              style:{
                justifyContent:"center"
              }
            });
          }
        })
        .catch(error => {
          if (error.response) {
            setLoading(false);
            showMessage({
              message: `${error.response.data.msg}`,
              type: 'default',
              backgroundColor: COLORS.red,
              color: COLORS.white,
              titleStyle: {
                alignSelf: 'center',
                ...FONTS.h3,
              },
              animationDuration: 250,
              icon: "danger",
              style:{
                justifyContent:"center"
              }
            });
            
          }
        });
    } else {
      setLoading(false);
      showMessage({
        message: `Invalid Input`,
        type: 'default',
        backgroundColor: COLORS.red,
        color: COLORS.white,
        titleStyle: {
          alignSelf: 'center',
          ...FONTS.h3,
        },
        animationDuration: 250,
        icon: "danger",
        style:{
          justifyContent:"center"
        }
      });
    }
  }

  return (
    <View style={{
      flex:1,
      backgroundColor:COLORS.white,
    }}>
    <KeyboardAwareScrollView
        keyboardDismissMode="interactive"
        showsVerticalScrollIndicator={false}
    
        contentContainerStyle={{
          marginTop: SIZES.radius,
          // paddingHorizontal: SIZES.padding,
          paddingBottom: 40,
        }}>
      {show && (
        <LoaderOp showing={show} validation={validation} dataText={dataText} />
      )}
      <Loader loading={loading} />
      <Header
      leftComponent={
        <View
            style={{
              justifyContent: 'center',
              // position: 'absolute',
              marginLeft: -15,
              // zIndex: 1,
            }}>
            <TouchableOpacity
              style={{
                // marginLeft: 25,
                backgroundColor:COLORS.Primary,
                height:40,
                width:40,
                justifyContent:"center",
                borderRadius:40/2,
                }}
              onPress={() => {
                navigation.goBack();
              }}>
              <Image
                source={images.back}
                style={{width: 25, height: 25, tintColor: COLORS.white,alignSelf:"center"}}
              />
            </TouchableOpacity>
          </View>
      }
        img={images.herdhelp}
        imgstyle={{
          marginTop:100,
          marginLeft:-20
        }}
        containerStyle={{
          margin: '10%',
          //   marginTop:'20%'
        }}
      />
      <Text
        style={{
          ...FONTS.h2,
          alignSelf: 'center',
          marginTop: '2%',
        }}>
        Getting Started
      </Text>
      <Text
        style={{
          ...FONTS.body3,
          alignSelf: 'center',
        }}>
        Create an account to continue!
      </Text>
      <View
        style={{
          flex: 1,
          marginTop: SIZES.height > 800 ? SIZES.padding * 1.2 : SIZES.radius,
        }}>
        {/* Input */}
        <FormInput
          label={'Email'}
          value={email}
          onChange={text => {
            utils.validateEmail(text,setEmailErr)
            setEmail(text);
          }}
          returnKeyType={"next"}
          errorMsg={EmailErr}
          placeholder={'Enter Email'}
          keyboardType="email-address"
          autoCompleteType="email"
          appendComponent={
            <View
              style={{
                justifyContent: 'center',
              }}>
              <Image
                source={
                  email == ''? images.correct : email != '' && EmailErr == ''? images.correct : images.cancel
                }
                style={{
                  height: 20,
                  width: 20,
                  tintColor:
                    email == ''
                      ? COLORS.gray
                      : email != '' && EmailErr == ''
                      ? COLORS.green
                      : COLORS.red,
                }}
              />
            </View>
          }
        />
        <FormInput
          label={'Username'}
          value={username}
          onChange={text => {
            utils.validateUser(text,setUserErr)
            setUsername(text);
          }}
          returnKeyType={"next"}
          errorMsg={UserErr}
          placeholder={'Enter Username'}
          keyboardType="default"
          appendComponent={
            <View
              style={{
                justifyContent: 'center',
              }}>
              <Image
                source={
                  username == ''? images.correct : username != '' && UserErr == ''? images.correct : images.cancel

                }
                style={{
                  height: 20,
                  width: 20,
                  tintColor:
                    username == ''
                      ? COLORS.gray
                      : username != '' && UserErr == ''
                      ? COLORS.green
                      : COLORS.red,
                }}
              />
              
            </View>
          }
        />
        <FormInput
          label={'First Name'}
          value={first}
          onChange={text => {
            setFirst(text);
          }}
          returnKeyType={"next"}
          placeholder={'Enter Firstname'}
          keyboardType="default"
          appendComponent={
            <View
              style={{
                justifyContent: 'center',
              }}>
              <Image
                source={
                  first == ''? images.correct : first != ''? images.correct : images.cancel

                }
                style={{
                  height: 20,
                  width: 20,
                  tintColor:
                  first == ''
                      ? COLORS.gray
                      : first != ''
                      ? COLORS.green
                      : COLORS.red,
                }}
              />
              
            </View>
          }
        />
        <FormInput
          label={'Last Name'}
          value={last}
          onChange={text => {
            setLast(text);
          }}
          placeholder={'Enter Lastname'}
          keyboardType="default"
          returnKeyType={"next"}
          appendComponent={
            <View
              style={{
                justifyContent: 'center',
              }}>
              <Image
                source={
                  last == ''? images.correct : last != ''? images.correct : images.cancel

                }
                style={{
                  height: 20,
                  width: 20,
                  tintColor:
                    last == ''
                      ? COLORS.gray
                      : last != '' 
                      ? COLORS.green
                      : COLORS.red,
                }}
              />
              
            </View>
          }
        />
        
        <FormInput
          label={'Password'}
          value={password}
          secureTextEntry={!showPass}
          autoCompleteType="password"
          onChange={value => {
            utils.validatePassword(value,setPassErr)
            setPassword(value);
          }}
          returnKeyType={"go"}
          errorMsg={PassErr}
          placeholder={'Enter Password'}
          appendComponent={
            <TouchableOpacity
              style={{
                width: 40,
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}
              onPress={() => setShowPass(!showPass)}>
              <Image
                source={showPass ? images.eye_close : images.eye}
                style={{
                  height: 20,
                  width: 20,
                  tintColor: showPass ? COLORS.Primary : COLORS.gray,
                }}
              />
            </TouchableOpacity>
          }
        />
        <TextButton
          border={false}
          icon={images.sign}
          buttonContainerStyle={{
            height: 55,
            alignItems: 'center',
            marginTop: SIZES.padding,
            borderRadius: SIZES.radius,
            backgroundColor: isEnableSignIn()
              ? COLORS.Primary
              : COLORS.transparentPrimary2,
          }}
          loading={loading}
          onPress={() => {
            signup();
          }}
          disabled={!isEnableSignIn()}
          label={'Signup'}
        />
        <View
          style={{
            flexDirection: 'row',
            marginTop: SIZES.radius,
            justifyContent: 'center',
          }}>
          <Text style={{color: COLORS.darkGray, ...FONTS.body3}}>
            Already have an account?{' '}
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={{color: COLORS.Primary, ...FONTS.h3}}>Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAwareScrollView>
    </View>
  );
};

/* eslint-disable prettier/prettier */
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
} from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import FormInput from '../../Components/FormInput';
import CustomSwitch from '../../Components/CustomSwitch';
import { images, COLORS, SIZES, FONTS } from '../../Components/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TextButton from '../../Components/TextButton';
import axios from 'axios';
import Loader from '../../Components/Loader';
import utils from '../../utils/Utils';
import { baseURL } from '../../helpers/helpers';
import { useDispatch } from 'react-redux'
import { isSubscriptionActive, Login } from '../../Store/actions';
import { useSelector } from 'react-redux';
import { getSubscriptions } from 'react-native-iap';
const LoginScreen = ({ navigation, route }) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPass, setShowPass] = React.useState(false);
  const [saveMe, setSaveMe] = React.useState(false);
  const [EmailError, setEmailError] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const [EmailErr, setEmailErr] = React.useState('');
  const [rec, setRec] = React.useState([]);
  const subscribed = useSelector(state => state.Reducers.subscribed);

  const dispatch = useDispatch()
  function isEnableSignIn() {
    return email != '' && password != '';
  }

  async function login() {
    if (isEnableSignIn()) {
      setLoading(true);
      await axios.post(baseURL + '/login/',
        {
          email: email,
          password: password,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
        .then(response => {
          if (response.status == 200) {
            subscribed===undefined || subscribed===false? dispatch(isSubscriptionActive()) : null
            dispatch(Login(response.data.access, response.data.userid.toString()))
            setLoading(false)
          } else {
            setEmailError('User Not Registered');
            setLoading(false);
          }
        })
        .catch(error => {
          if (error.response) {
            setEmailError('Invalid Email & Password');
            setLoading(false);
          }
        });
    } else {
      setEmailError('Invalid Input');
      setLoading(false);
    }
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white
      }}>
      <Loader loading={loading} />
      <Header
        img={images.herdhelp}
        imgstyle={{
          marginTop: 105,
        }}
      />
      <ScrollView>
        <Text
          style={{
            ...FONTS.h2,
            alignSelf: 'center',
            marginTop: '15%',
          }}>
          Let's Sign You In
        </Text>
        <Text
          style={{
            ...FONTS.body3,
            alignSelf: 'center',
          }}>
          Login account to continue!
        </Text>
        <View
          style={{
            flex: 1,
            marginTop: SIZES.height > 800 ? SIZES.padding * 2 : SIZES.radius,
          }}>
          <Text
            style={{
              ...FONTS.body3,
              alignSelf: 'center',
              color: COLORS.red
            }}>
            {EmailError}
          </Text>
          <FormInput
            label={'Email'}
            value={email}
            onChange={text => {
              utils.validateEmail(text, setEmailErr)
              setEmail(text);
            }}
            errorMsg={EmailErr}
            placeholder={'Enter Email'}
            keyboardType="email-address"
            autoCompleteType="email"
            returnKeyType={"next"}
            appendComponent={
              <View
                style={{
                  justifyContent: 'center',
                }}>
                <Image
                  source={
                    email == '' ? images.correct : email != '' && EmailErr == '' ? images.correct : images.cancel
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
            label={'Password'}
            value={password}
            secureTextEntry={!showPass}
            autoCompleteType="password"
            onChange={value => {
              setPassword(value);
            }}
            placeholder={'Enter Password'}
            returnKeyType={"go"}
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
          <View
            style={{
              flexDirection: 'row',
              marginTop: SIZES.radius,
              width: '88%',
              alignSelf: 'center',
              justifyContent: "space-evenly",
              alignItems: "center",
              marginLeft: 20
            }}>
            {/* <View style={{flexDirection: 'row', alignItems: 'center'}}> */}
            <CustomSwitch
              label="Save Me"
              value={saveMe}
              onChange={value => setSaveMe(value)}
            />
            {/* </View> */}
            <TextButton
              label="Forgot Password?"
              buttonContainerStyle={{
                backgroundColor: null,
                width: 250,
              }}
              labelStyle={{
                color: COLORS.Primary,
                ...FONTS.h4,
              }}
              onPress={() => navigation.navigate('ForgetPass')}
            />
          </View>
          <TextButton
            border={false}
            icon={images.log}
            buttonContainerStyle={{
              height: 55,
              alignItems: 'center',
              marginTop: SIZES.padding,
              borderRadius: SIZES.radius,
              backgroundColor: isEnableSignIn()
                ? COLORS.Primary
                : COLORS.transparentPrimary2,
            }}
            onPress={async () => {
              login();
            }}
            label={'Login'}
          // disabled={!isEnableSignIn()}
          />
          <View
            style={{
              flexDirection: 'row',
              marginTop: SIZES.radius,
              justifyContent: 'center',
            }}>
            <Text style={{ color: COLORS.darkGray, ...FONTS.body3 }}>
              Don't have an account?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Signup');
              }}>
              <Text style={{ color: COLORS.Primary, ...FONTS.h3 }}>Signup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default LoginScreen;

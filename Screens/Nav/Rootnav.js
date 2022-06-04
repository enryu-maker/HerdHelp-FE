import React, { Component } from 'react'
import { Text, StyleSheet, View,StatusBar ,Image} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../Auth/Login';
import {Signup} from "../Auth/Signup"
import ForgetPass from '../ForgetPass/forgetPass';
const Stack = createNativeStackNavigator()
export default class Rootnav extends Component {
  render() {
    return (
      <>
        <Stack.Navigator screenOptions={({navigation})=>{
          return{
            detachPreviousScreen:!navigation.isFocused(),
            headerShown: false,
            animation:"slide_from_right"
          }
        }}
          initialRouteName={'Login'} >
          <Stack.Screen name='Login' component={Login} />
          <Stack.Screen name='Signup' component={Signup} />
          <Stack.Screen name='ForgetPass' component={ForgetPass}/>
        </Stack.Navigator>
      </>
    )
  }
}

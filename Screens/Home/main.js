import {
  View,
  Image,
  Platform,
} from 'react-native';
import React from 'react';
import Header from '../../Components/Header';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {images, COLORS, SIZES, FONTS} from '../../Components/Constants';
import axiosIns from '../../helpers/helpers';
import { useDispatch, useSelector } from 'react-redux';
import { getSpecies, getStatus, getTags, UserData,getHerds, getUnit, getFinance,getAlerts, getFcat, getGender } from '../../Store/actions';
import FinanceInfo from '../Finance/FinanceInfo';
import {Home} from "./Home"
import Alerts from '../Alerts/Alerts';
const BottomTab = createBottomTabNavigator();
import {
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import AddModel from './AddModel';
import Setting from '../Setting/Setting';
const Main = ({navigation}) => {
  const alerts = useSelector(state=>state.Reducers.alerts)
  async function loadId() {
    global.id = await AsyncStorage.getItem('id');
  }
  async function checkSubs() {
    let {data} = await axiosIns.get('subscriptions/isactive/');
    return data;
  }
  const dispatch = useDispatch()
  React.useEffect(() => {
    dispatch(getStatus())
    dispatch(UserData())
    dispatch(getSpecies())
    dispatch(getTags())
    dispatch(getHerds())
    dispatch(getUnit())
    dispatch(getAlerts())
    dispatch(getFinance())
    dispatch(getFcat())
    dispatch(getGender())
    loadId();
    checkSubs().then(data => {
      global.isActive = data.isactive;
      !data.isactive
        ? navigation.navigate('Subscription', {
            msg: 'No Active Subscription Please Purchase the Tier',
            cond: true,
          })
        : null;
    });
  }, []);
  var iconweight;
  return (
    <>
    <BottomTab.Navigator

      screenOptions={({route}) => ({
        headerShown: false,
        // tabBarShowLabel:false,
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let iconColor;
          if (route.name === 'Herds') {
            iconName = focused ? images.heart : images.heart
            iconColor=focused ? COLORS.Primary : COLORS.white
            iconweight=focused ? "700": null

          } else if (route.name === 'Settings') {
            iconName = focused ? images.setting : images.setting;
            iconColor=focused ? COLORS.Primary : COLORS.white
            iconweight=focused ? "700": null


          } else if (route.name === 'Finance') {
            iconName = focused ? images.coin :images.coin
            iconColor=focused ? COLORS.Primary : COLORS.white
            iconweight=focused ? "700": null
          }
          else if (route.name === 'Alerts') {
            iconName = focused ? images.bell :images.bell
            iconColor=focused ? COLORS.Primary :alerts?.length>0? COLORS.red : COLORS.white 
            iconweight=focused ? "700": null
          }
          else if (route.name === 'Add') {
            iconName = focused ? images.add :images.add
            iconColor=focused ? COLORS.Primary : COLORS.white
            iconweight=focused ? "700": null
          }

          return (
            <View
              style={{
                height: 45,
                width:45,
                backgroundColor: focused ? COLORS.transparentPrimary : COLORS.Primary,
                // justifyContent: 'center',
                justifyContent:"space-evenly",
                alignSelf: 'center',
                borderRadius: 12,
              }}>
                
              <Image
                source={iconName}
                resizeMode={"cover"}
                style={{
                  alignSelf: 'center',
                  height:focused ? 30 : 25,
                  width: focused ? 30 : 25,
                  tintColor:iconColor,
                }}
              />             
            </View>
          );
        },
        tabBarLabelStyle: {
          ...FONTS.body3,
          fontWeight:iconweight
        },
        tabBarStyle: {
          height:SIZES.height>700?Platform.OS=="ios"?120:90:75,
          backgroundColor: COLORS.Primary,
        },
        tabBarActiveTintColor: COLORS.transparentPrimary2,
        tabBarInactiveTintColor: COLORS.black,
      })}>
      <BottomTab.Screen name="Herds" component={Home}/>
      <BottomTab.Screen name="Finance" component={FinanceInfo} />
      <BottomTab.Screen name="Add" component={AddModel} />
      <BottomTab.Screen name="Alerts" component={Alerts}/>
      <BottomTab.Screen name="Settings" component={Setting} />
    </BottomTab.Navigator>
    </>
  );
};
export default Main;

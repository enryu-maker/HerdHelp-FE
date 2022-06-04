import React, { Component } from 'react'
import { Text, StyleSheet, View,StatusBar ,Image} from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Home } from '../Home/Home';
import Add from '../Home/Add';
import { COLORS, SIZES, FONTS, images } from '../../Components/Constants';
import {Medication} from '../Home/medication';
import {Weight} from '../Home/weight';
import { Info } from '../../Components/Info';
import Addanimals from '../Livestocks/AddBreed';
import MyAccount from '../Account/MyAccount';
import MyAccountEdit from '../Account/MyAccountEdit';
import Main from '../Home/main';
import { Finance } from '../Finance/Finance';
import Alerts from '../Alerts/Alerts';
import FinanceInfo from '../Finance/FinanceInfo';
import LoadAlert from '../Alerts/LoadAlert';
import MedCard from '../../Components/MedCard';
import Setting from '../Setting/Setting';
import Report from '../Report/Report';
import ReportOP from '../Report/ReportOP';
import WeightH from '../WeightHistory/WeightH';
import History from '../WeightHistory/History';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Parents from '../Parents/Parents';
const Drawer = createDrawerNavigator();
import Drawercontent from './Drawercontent';
import Rootnav from './Rootnav';
import Generate from '../Report/Generate';
import Babies from '../../Components/Babies';
import axiosIns from '../../helpers/helpers';
import EditAnimal from '../Edit/editAnimal';
import Subscription from '../Subscription/Subscription';
import Payment from '../Subscription/Payment';
import SubDetails from '../Subscription/SubDetails';
import Confirm from '../Subscription/Confirm';
import BillingAdd from '../Subscription/BillingAdd';
import ParentPage from '../Parents/parentPage';
const Stack = createNativeStackNavigator()

const DrawerNav = () => {
  return (
    <Drawer.Navigator initialRouteName='Home'
      screenOptions={{
        headerShown: false, 
        drawerActiveBackgroundColor: COLORS.Primary,
        drawerActiveTintColor: COLORS.white,
        drawerStyle:[{backgroundColor:COLORS.transparent},styles.drawerStyle],
        drawerLabelStyle: [FONTS.body3,{letterSpacing:2}],
        drawerType:"front",
        overlayColor:"#0d0d0d40",
        backBehavior:"history",  
        drawerStatusBarAnimation:"slide",
      }}
      drawerContent={props =><Drawercontent {...props}
      />
    }
    >
      <Drawer.Screen name='Draw' component={Main} options={{
            drawerIcon: ({ focused, size }) => (
              <Image
                source={images.home}
                style={[{ height: 25, width: 25}]}
              /> )       
          }} />
          <Drawer.Screen name='Report' component={Report} options={{
            drawerIcon: ({ focused, size }) => (
              <Image
                source={images.file}
                style={[{ height: 25, width: 25}]}
              /> )       
          }} />
          <Drawer.Screen name='WeightH' component={WeightH} options={{
            drawerIcon: ({ focused, size }) => (
              <Image
                source={images.weight}
                style={[{ height: 25, width: 25}]}
              /> )       
          }} />
          <Drawer.Screen name='Setting' component={Setting} options={{
            drawerIcon: ({ focused, size }) => (
              <Image
                source={images.setting}
                style={[{ height: 25, width: 25}]}
              /> )       
          }} />
          <Drawer.Screen name='Parents' component={Parents} options={{
            drawerIcon: ({ focused, size }) => (
              <Image
                source={images.setting}
                style={[{ height: 25, width: 25}]}
              /> )       
          }} />
          <Drawer.Screen name='Subscription' component={Subscription} options={{
            drawerIcon: ({ focused, size }) => (
              <Image
                source={images.setting}
                style={[{ height: 25, width: 25}]}
              /> )       
          }} />
      </Drawer.Navigator>)}
export const Username = React.createContext()
export const Profile_pic = React.createContext()

export default class Homenav extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username:'',
      profile_pic:''
    };
}
fetchprofile = async () => {
  const {data} = await axiosIns.get('profile/');
  return data;
};
  checkSubs= async()=>{
    let {data} = await axiosIns.get('subscriptions/isactive/');
    return data;
  }
  componentDidMount(){
      this.fetchprofile().then((data)=>{
        global.User = data;
        this.setState({
          username:data[0].username,
          profile_pic:data[0].profile_picture
        })
      })
      this.checkSubs().then(data=>{
          global.isActive=data.isactive
        })
  }

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
          initialRouteName={'DrawNav'}>
          <Stack.Screen name='DrawNav' component={DrawerNav} />
          <Stack.Screen name='Home' component={Home}/>
          <Stack.Screen name='Auth' component={Rootnav} />
          <Stack.Screen name='Info' component={Info}/>
          <Stack.Screen name='Animals' component={Addanimals}  />
          <Stack.Screen name='MyAccount' component={MyAccount} />
          <Stack.Screen name='MyAccountEdit' component={MyAccountEdit} />
          <Stack.Screen name='medication' component={Medication} />
          <Stack.Screen name='weight' component={Weight} />
          <Stack.Screen name='Finance' component={Finance} />
          <Stack.Screen name='Alerts' component={Alerts} />
          <Stack.Screen name='FinanceInfo' component={FinanceInfo} />
          <Stack.Screen name='LoadAlert' component={LoadAlert}/>
          <Stack.Screen name='add' component={Add}/>
          <Stack.Screen name='MedCard' component={MedCard}/>
          <Stack.Screen name='Setting' component={Setting}/>
          <Stack.Screen name='Report' component={Report}/>
          <Stack.Screen name='ReportOP' component={ReportOP}/>
          <Stack.Screen name='WeightH' component={WeightH}/>
          <Stack.Screen name='History' component={History}/>
          <Stack.Screen name='Generate' component={Generate}/>
          <Stack.Screen name='Babies' component={Babies}/>
          <Stack.Screen name='editAnimal' component={EditAnimal}/>
          <Stack.Screen name='Subscription' component={Subscription}/>
          <Stack.Screen name='Payment' component={Payment}/>
          <Stack.Screen name='Details' component={SubDetails}/>
          <Stack.Screen name='Confirm' component={Confirm}/>
          <Stack.Screen name='Address' component={BillingAdd}/>
          <Stack.Screen name='ParentPage' component={ParentPage}/>
        </Stack.Navigator>
      </>
    )
  }
}
const styles = StyleSheet.create({
  drawerStyle: {
    backgroundColor:         COLORS.Primary,
    width:                   '90%',
},
})

import {View, Text, TouchableOpacity, Image, FlatList,SafeAreaView} from 'react-native';
import React from 'react';
import axiosIns from '../../helpers/helpers';
import Header from '../../Components/Header';
import TextButton from '../../Components/TextButton';
import FinanceCard from './FinanceCard';
import {COLORS, SIZES, images,FONTS} from '../../Components/Constants';
import ActivityIndicatorExample from '../../Components/Loading';
import { useDispatch, useSelector } from 'react-redux';
import { SwipeListView } from 'react-native-swipe-list-view';
import {getFinance } from '../../Store/actions';
import { ActivityIndicator } from 'react-native-paper';
import { toastConfig } from '../../App';
import Toast from 'react-native-toast-message'
export default function FinanceInfo({navigation}) {
  const dispatch = useDispatch()
  const finance = useSelector(state=>state.Reducers.finance)
  const [loading, setLoading] = React.useState(false)
  function delFin(id) {
    setLoading(true)
    axiosIns.delete(`finance/${id}`).
      then((res) => {
        if (res.status == 204) {
          dispatch(getFinance())
          setLoading(false)
          Toast.show({
            text1: "Finance Deleted Succesfully",
            type: "success",
          })
        }
        else {
          // console.log(res)
          setLoading(false)
          Toast.show({
            text1: "Something Went Wrong",
            type: "error",
          })
        }
      })
      .catch((err) => {
        // console.log(err)
        setLoading(false)
        Toast.show({
          text1: "Something Went Wrong",
          type: "error",
        })
      })
  }
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
                alignSelf:"center",
                borderRadius:40/2,
                }}
              onPress={() => {
                navigation.openDrawer();
              }}>
              <Image
                source={images.menu}
                style={{width: 25, height: 25, tintColor: COLORS.white,alignSelf:"center"}}
              />
            </TouchableOpacity>
          </View>
        }
        title={'Finance'}
        titleStyle={{
          marginLeft:120
        }}
        rightComponent={
          <View
            style={{
              justifyContent: 'center',
              // position: 'absolute',
              marginRight: 15,
              // zIndex: 1,
            }}>
            <TouchableOpacity
              style={{
                backgroundColor:COLORS.Primary,
                height:40,
                width:110,
                flexDirection:"row",
                justifyContent:"space-evenly",
                borderRadius:15,
                }}
                onPress={() => {
                  navigation.push('Finance');
                  }}>
                    <Image source={images.add} style={{
              height:25,
              width:25,
              tintColor:COLORS.white,
              alignSelf:"center"
            }}/>
              <Text style={{
                ...FONTS.h3,
                color:COLORS.white,
                alignSelf:"center"
              }}>
              Finance
              </Text>
            </TouchableOpacity>
          </View>
        }
      />
    );
  }
  return (
    <View style={{flex: 1, backgroundColor:COLORS.white}}>
      {renderHeader()}
      <SafeAreaView>
      {
        loading ? <ActivityIndicator style={{
          padding:10,
         
        }} 
        size={"small"}
        color={COLORS.Primary}
        /> :
          <>
            <Text style={{ ...FONTS.h4, color: COLORS.Primary, alignSelf: "center" }}>
              Swipe Left To{" "}
              <Text style={{ ...FONTS.h4, color: COLORS.red, marginLeft: 10 }}>
                Delete
              </Text>
            </Text>
          </>
      }
      {
        finance?.length<0?<ActivityIndicatorExample />:
        <SwipeListView
        style={{
          marginBottom:SIZES.height>700?Platform.OS=="ios"?120:90:75,
        }}
        data={finance}
        keyExtractor={item => `${item.id}`}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <FinanceCard
            key={index}
            category={item.category}
            price={item.price}
            quantity={item.quantity}
            date={item.added_date}
          />
          )}
          renderHiddenItem={(data, rowMap) => (
            <View style={{
              flexDirection:"row",
              alignSelf:"center",
              marginTop:5,

            }}>
            <TextButton
            buttonContainerStyle={{
                    // flex: 1,
                    justifyContent:"flex-start",
                    height:120,
                    width:"44%",
                    marginTop:5,
                    backgroundColor: COLORS.yellow,
                }}
                border={false}
                icon={images.update}
                iconStyle={{
                  height:30,
                  width:30,
                  marginLeft:15
                }}
                onPress={() =>  {
                  navigation.navigate('EditF',{
                    data:data['item'],
                    cond:true
                  });
                }}
            />
            <TextButton
            buttonContainerStyle={{
                    // flex: 1,
                    justifyContent:"flex-end",
                    height:120,
                    width:"44%",
                    marginTop:5,
                    backgroundColor: COLORS.red,
                }}
                border={false}
                icon={images.delet}
                iconStyle={{
                  height:30,
                  width:30,
                  marginRight:15
                }}
                onPress={() =>  {
                  delFin(data.item.id)
                }}
            />
            </View>
        )}
        leftOpenValue={75}
        rightOpenValue={-75}
          />
        }
        </SafeAreaView>
      <Toast ref={(ref) => { Toast.setRef(ref) }} config={toastConfig} />
    </View>
  );
}
